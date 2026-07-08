import React, { useState, useEffect, useRef } from "react";
import { Search, Compass, Info } from "lucide-react";
import { blackholes } from "../data/blackholes";

export default function BlackHoles({ onLearnMore }) {
  const [search, setSearch] = useState("");
  const canvasRef = useRef(null);

  const filteredBH = blackholes.filter(bh =>
    bh.name.toLowerCase().includes(search.toLowerCase()) ||
    bh.type.toLowerCase().includes(search.toLowerCase())
  );

  // Black hole visual effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frameId;
    let angle = 0;
    let mouse = { x: canvas.width / 2, y: canvas.height / 2, targetX: canvas.width / 2, targetY: canvas.height / 2 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      mouse.x = canvas.width / 2;
      mouse.y = canvas.height / 2;
      mouse.targetX = canvas.width / 2;
      mouse.targetY = canvas.height / 2;
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    const draw = () => {
      ctx.fillStyle = "rgba(5, 8, 22, 0.1)"; // Trails
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Dampen mouse movements
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      const centerX = mouse.x;
      const centerY = mouse.y;
      const holeRadius = Math.min(canvas.width, canvas.height) * 0.12;

      // Draw Accretion Disk (multiple layers of glowing rings)
      angle += 0.02;
      
      // Outer disk gas particles
      ctx.shadowBlur = 0;
      for (let i = 0; i < 40; i++) {
        const dist = holeRadius * (1.5 + Math.sin(i * 10 + angle) * 0.3);
        const pAngle = i * (Math.PI / 20) + angle * (1 - (i % 3) * 0.2);
        
        const px = centerX + Math.cos(pAngle) * dist * 1.8;
        const py = centerY + Math.sin(pAngle) * dist * 0.6; // Elliptical distortion
        
        ctx.beginPath();
        ctx.arc(px, py, 1.5 + (i % 3), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, ${100 + (i * 3) % 155}, 0, ${0.4 + (i % 5) * 0.1})`;
        ctx.fill();
      }

      // Gravitational lensing glow
      const gradient = ctx.createRadialGradient(centerX, centerY, holeRadius, centerX, centerY, holeRadius * 2.2);
      gradient.addColorStop(0, "rgba(255, 120, 0, 0.9)");
      gradient.addColorStop(0.2, "rgba(255, 60, 0, 0.5)");
      gradient.addColorStop(0.6, "rgba(123, 97, 255, 0.25)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, holeRadius * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // The Singularity (black core)
      ctx.beginPath();
      ctx.arc(centerX, centerY, holeRadius, 0, Math.PI * 2);
      ctx.fillStyle = "#000000";
      ctx.shadowColor = "#ff7700";
      ctx.shadowBlur = 15;
      ctx.fill();

      frameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", handleMouseMove);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="blackholes-page-container container">
      <div className="page-header text-center">
        <h1 className="page-title font-display gradient-text">Black Holes</h1>
        <p className="page-subtitle">Places in space where gravity pulls so much that even light cannot escape.</p>
      </div>

      {/* Interactive Visual Canvas Panel */}
      <div className="interactive-bh-panel glass-panel">
        <canvas ref={canvasRef} className="bh-canvas" />
        <div className="bh-canvas-overlay">
          <h3 className="font-display text-lg text-white mb-1">Interactive Event Horizon</h3>
          <p className="text-xs text-gray-400">Move your mouse across the panel to drag and lens light around the singularity core.</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="toolbar-section glass-panel">
        <div className="search-box-wrapper">
          <Search className="search-bar-icon" />
          <input
            type="text"
            className="search-bar-input"
            placeholder="Search black holes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Black Hole Cards */}
      <div className="bh-grid">
        {filteredBH.map(bh => (
          <div key={bh.id} className="bh-card glass-card">
            <div className="card-media">
              <img src={bh.image} alt={bh.name} className="card-img" />
              <div className="card-badges-row">
                <span className="type-badge font-display">{bh.type}</span>
              </div>
            </div>

            <div className="card-body-content">
              <h3 className="bh-card-name font-display">{bh.name}</h3>
              <p className="bh-card-desc">{bh.description}</p>

              <div className="bh-specs">
                <div className="spec-row">
                  <span className="spec-label flex items-center gap-1">
                    <Info className="w-3.5 h-3.5 text-cyan-400" /> Mass
                  </span>
                  <span className="spec-value">{bh.mass.split(" (")[0]}</span>
                </div>
                <div className="spec-row">
                  <span className="spec-label flex items-center gap-1">
                    <Compass className="w-3.5 h-3.5 text-blue-400" /> Distance
                  </span>
                  <span className="spec-value">{bh.distance.split(" (")[0]}</span>
                </div>
              </div>

              <button
                className="btn-outline learn-btn mt-4"
                onClick={() => onLearnMore({ ...bh, category: "Black Hole" })}
              >
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>

      <style jsx="true">{`
        .blackholes-page-container {
          padding-top: 110px;
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }

        .page-header {
          margin-bottom: 1rem;
        }

        .page-title {
          font-size: 2.8rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
        }

        .page-subtitle {
          color: var(--text-secondary);
          font-size: 1.1rem;
        }

        /* Interactive Canvas */
        .interactive-bh-panel {
          position: relative;
          height: 250px;
          border-radius: 16px;
          overflow: hidden;
          background: #050816;
          border: 1px solid var(--card-border);
        }

        .bh-canvas {
          width: 100%;
          height: 100%;
          display: block;
        }

        .bh-canvas-overlay {
          position: absolute;
          bottom: 1.25rem;
          left: 1.5rem;
          pointer-events: none;
          z-index: 10;
          text-shadow: 0 2px 5px rgba(0,0,0,0.8);
        }

        .toolbar-section {
          display: flex;
          padding: 1rem 1.5rem;
          border-radius: 16px;
        }

        .search-box-wrapper {
          position: relative;
          width: 100%;
          max-width: 400px;
        }

        .search-bar-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-secondary);
          width: 18px;
          height: 18px;
        }

        .search-bar-input {
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--card-border);
          padding: 0.75rem 1rem 0.75rem 2.7rem;
          border-radius: 30px;
          color: var(--text-color);
          outline: none;
        }

        .search-bar-input:focus {
          border-color: var(--primary-color);
        }

        /* Grid */
        .bh-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }

        .bh-card {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .card-media {
          position: relative;
          height: 185px;
          border-radius: 12px;
          overflow: hidden;
        }

        .card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .card-badges-row {
          position: absolute;
          top: 0.75rem;
          left: 0.75rem;
        }

        .type-badge {
          background: rgba(0, 0, 0, 0.75);
          color: var(--highlight-color);
          border: 1px solid var(--card-border);
          padding: 0.25rem 0.6rem;
          border-radius: 8px;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
        }

        .card-body-content {
          padding: 1.25rem 0 0 0;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .bh-card-name {
          font-size: 1.4rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.35rem;
        }

        .bh-card-desc {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.4;
          margin-bottom: 1.25rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .bh-specs {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--card-border);
          border-radius: 12px;
          margin-top: auto;
        }

        .spec-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
        }

        .spec-label {
          color: var(--text-secondary);
        }

        .spec-value {
          color: var(--text-color);
          font-weight: 600;
        }

        .learn-btn {
          width: 100%;
          padding: 0.6rem 1.2rem;
          font-size: 0.85rem;
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
}
