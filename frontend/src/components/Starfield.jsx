import React, { useEffect, useRef } from "react";

export default function Starfield({ theme }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let stars = [];
    let meteors = [];
    let nebulae = [];
    
    const starCount = 180;
    const maxMeteors = 2;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initElements();
    };

    const initElements = () => {
      // Init stars across 3 parallax layers (far, mid, close)
      stars = [];
      for (let i = 0; i < starCount; i++) {
        const layer = Math.random() < 0.6 ? 0 : Math.random() < 0.85 ? 1 : 2;
        let speedMult = 0.03;
        let radius = 0.6;
        if (layer === 1) { speedMult = 0.06; radius = 1.0; }
        else if (layer === 2) { speedMult = 0.12; radius = 1.6; }

        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius,
          vx: (Math.random() - 0.5) * speedMult,
          vy: (Math.random() - 0.5) * speedMult,
          alpha: Math.random() * 0.8 + 0.2,
          alphaSpeed: 0.003 + Math.random() * 0.008,
          layer
        });
      }

      // Initialize floating nebula gas clouds
      nebulae = [
        {
          x: canvas.width * 0.25,
          y: canvas.height * 0.3,
          radius: Math.min(canvas.width, canvas.height) * 0.4,
          color: "rgba(124, 58, 237, 0.07)", // Purple glow
          vx: 0.02,
          vy: 0.01
        },
        {
          x: canvas.width * 0.75,
          y: canvas.height * 0.7,
          radius: Math.min(canvas.width, canvas.height) * 0.5,
          color: "rgba(34, 211, 238, 0.06)", // Cyan glow
          vx: -0.015,
          vy: -0.01
        }
      ];

      meteors = [];
    };

    const spawnMeteor = () => {
      if (meteors.length >= maxMeteors) return;
      if (Math.random() > 0.008) return; // Rare check per frame

      const startX = Math.random() * canvas.width * 0.8;
      const startY = Math.random() * canvas.height * 0.3;
      const length = 80 + Math.random() * 100;
      const speed = 8 + Math.random() * 8;

      meteors.push({
        x: startX,
        y: startY,
        length,
        speed,
        dx: speed,
        dy: speed * 0.8, // down & right diagonal
        opacity: 1
      });
    };

    const drawScene = () => {
      ctx.fillStyle = theme === "dark" ? "#030712" : "#F1F5F9";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 1. Draw Nebula Clouds
      for (let i = 0; i < nebulae.length; i++) {
        const n = nebulae[i];
        
        // Render large radial gradients for gas clouds
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius);
        grad.addColorStop(0, n.color);
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");
        
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Drift nebulae slowly
        n.x += n.vx;
        n.y += n.vy;

        // Wrap nebulae boundaries
        if (n.x - n.radius > canvas.width) n.x = -n.radius;
        if (n.x + n.radius < 0) n.x = canvas.width + n.radius;
        if (n.y - n.radius > canvas.height) n.y = -n.radius;
        if (n.y + n.radius < 0) n.y = canvas.height + n.radius;
      }

      // 2. Draw Stars
      const starBaseColor = theme === "dark" ? 255 : 40;
      
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${starBaseColor}, ${starBaseColor}, ${starBaseColor}, ${s.alpha})`;
        ctx.fill();

        // Drift stars
        s.x += s.vx;
        s.y += s.vy;

        // Wrap stars
        if (s.x < 0) s.x = canvas.width;
        if (s.x > canvas.width) s.x = 0;
        if (s.y < 0) s.y = canvas.height;
        if (s.y > canvas.height) s.y = 0;

        // Twinkle (alpha osc)
        s.alpha += s.alphaSpeed;
        if (s.alpha > 0.95 || s.alpha < 0.15) {
          s.alphaSpeed = -s.alphaSpeed;
        }
      }

      // 3. Draw Meteors
      spawnMeteor();
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        
        // Draw meteor streak
        const gradient = ctx.createLinearGradient(m.x, m.y, m.x - m.dx, m.y - m.dy);
        if (theme === "dark") {
          gradient.addColorStop(0, `rgba(34, 211, 238, ${m.opacity})`); // Cyan head
          gradient.addColorStop(0.3, `rgba(124, 58, 237, ${m.opacity * 0.5})`); // Purple body
          gradient.addColorStop(1, `rgba(0, 0, 0, 0)`);
        } else {
          gradient.addColorStop(0, `rgba(30, 64, 175, ${m.opacity})`);
          gradient.addColorStop(1, `rgba(0, 0, 0, 0)`);
        }

        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - m.dx * 1.5, m.y - m.dy * 1.5);
        ctx.stroke();

        // Update position
        m.x += m.dx;
        m.y += m.dy;
        m.opacity -= 0.015;

        // Remove faded meteors
        if (m.opacity <= 0 || m.x > canvas.width || m.y > canvas.height) {
          meteors.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(drawScene);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    drawScene();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
