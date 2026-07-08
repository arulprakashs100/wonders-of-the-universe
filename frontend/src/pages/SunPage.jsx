import React, { useState } from "react";
import { ArrowLeft, Flame, Sparkles, Compass } from "lucide-react";

export default function SunPage({ onBack }) {
  const [sunZoom, setSunZoom] = useState(1.0);

  const sunFacts = [
    "One million Earths could fit inside the Sun.",
    "The Sun is about 4.6 billion years old and has consumed about half of its core hydrogen.",
    "Every second, the Sun fuses 600 million tons of hydrogen into helium, converting 4 million tons of matter into pure energy.",
    "The core temperature is 15 Million Kelvins, hot enough for nuclear fusion, while the surface is a cooler 5,778 K.",
    "Light from the Sun takes approximately 8 minutes and 20 seconds to reach Earth."
  ];

  return (
    <div className="sun-page-container container">
      {/* Back navigation button */}
      <button className="btn-outline back-btn font-display uppercase tracking-wider mb-6" onClick={onBack}>
        <ArrowLeft className="w-4 h-4" /> Back to Orbit
      </button>

      <div className="sun-page-layout">
        
        {/* Left column: Animated fire Sun */}
        <div className="sun-render-column flex-center flex-col">
          <div 
            className="sun-visual-system float-element"
            style={{ transform: `scale(${sunZoom})` }}
          >
            {/* Outer Corona glow waves */}
            <div className="sun-corona-ring ring-1" />
            <div className="sun-corona-ring ring-2" />
            
            {/* Pulsing solar flares overlays */}
            <div className="sun-flares-container">
              <svg viewBox="0 0 100 100" className="solar-flares-svg">
                <circle cx="50" cy="50" r="38" fill="none" stroke="#FF5500" strokeWidth="6" strokeDasharray="5,15" className="flare-path" />
                <circle cx="50" cy="50" r="39" fill="none" stroke="#FFaa00" strokeWidth="4" strokeDasharray="10,25" className="flare-path reversed" />
              </svg>
            </div>

            {/* Glowing Fire Sphere */}
            <div className="sun-fire-sphere">
              <div className="sun-fire-texture" />
              <div className="sun-core-shading" />
              <div className="sun-corona-edge" />
            </div>

            {/* Floating solar heat particles */}
            <div className="solar-particle p1" />
            <div className="solar-particle p2" />
            <div className="solar-particle p3" />
            <div className="solar-particle p4" />
          </div>

          <div className="interaction-badge mt-8 flex-center gap-1.5 text-xs text-yellow-400 font-mono">
            <Flame className="w-4 h-4 animate-pulse text-orange-500" /> Glowing corona energy sweep active
          </div>

          <div className="zoom-controls-tray mt-3 flex gap-2">
            <button className="zoom-btn" onClick={() => setSunZoom(prev => Math.min(prev + 0.1, 1.4))} title="Zoom In">+</button>
            <button className="zoom-btn" onClick={() => setSunZoom(prev => Math.max(prev - 0.1, 0.7))} title="Zoom Out">-</button>
          </div>
        </div>

        {/* Right column: Specs and facts */}
        <div className="sun-info-column flex flex-col gap-6">
          <div className="info-header-block">
            <span className="type-badge font-display font-bold">G-Type Main Sequence Star</span>
            <h1 className="sun-title-name font-display text-white mt-2">The Sun</h1>
            <p className="sun-overview-para leading-relaxed text-secondary mt-3">
              The Sun is the yellow dwarf star at the center of our Solar System. Its gravity holds all planets, asteroids, and comets in orbit. Comprising 99.8% of the system's entire mass, the Sun generates life-sustaining heat and light on Earth through thermonuclear fusion in its core.
            </p>
          </div>

          {/* Specs panel */}
          <div className="telemetry-table-panel glass-panel p-6 rounded-[20px]">
            <h3 className="section-title-telemetry font-display flex items-center gap-2 mb-4">
              <Compass className="w-5 h-5 text-yellow-400" /> Stellar Specs
            </h3>

            <div className="telemetry-grid">
              <div className="telemetry-cell">
                <span className="label">Diameter</span>
                <span className="value font-mono">1,392,700 km (109x Earth)</span>
              </div>
              <div className="telemetry-cell">
                <span className="label">Mass</span>
                <span className="value font-mono">1.989 × 10³⁰ kg (333,000 Earths)</span>
              </div>
              <div className="telemetry-cell">
                <span className="label">Core Temp</span>
                <span className="value font-mono">15 Million K</span>
              </div>
              <div className="telemetry-cell">
                <span className="label">Surface Temp</span>
                <span className="value font-mono">5,778 K (5,505°C)</span>
              </div>
              <div className="telemetry-cell">
                <span className="label">Age</span>
                <span className="value font-mono">4.6 Billion Years</span>
              </div>
              <div className="telemetry-cell">
                <span className="label">Composition</span>
                <span className="value text-xs">Hydrogen (73%), Helium (25%), Oxygen, Carbon</span>
              </div>
              <div className="telemetry-cell">
                <span className="label">Distance to Earth</span>
                <span className="value font-mono">149.6 Million km (8.3 Light-Mins)</span>
              </div>
              <div className="telemetry-cell">
                <span className="label">Energy Production</span>
                <span className="value text-xs">Nuclear fusion (Proton-Proton chain)</span>
              </div>
              <div className="telemetry-cell">
                <span className="label">Spectral Type</span>
                <span className="value font-mono">G2V (Yellow Dwarf)</span>
              </div>
              <div className="telemetry-cell">
                <span className="label">Luminosity</span>
                <span className="value font-mono">3.8 × 10²⁶ Watts</span>
              </div>
              <div className="telemetry-cell">
                <span className="label">Escape Velocity</span>
                <span className="value font-mono">617.7 km/s</span>
              </div>
              <div className="telemetry-cell">
                <span className="label">Rotation Period</span>
                <span className="value font-mono">25 Earth days (Equator) / 35 days (Poles)</span>
              </div>
            </div>
          </div>

          {/* Facts list */}
          <div className="facts-cards-panel">
            <h3 className="section-title-telemetry font-display text-white mb-4">Stellar Facts</h3>
            <div className="trivia-list flex flex-col gap-3">
              {sunFacts.map((fact, idx) => (
                <div key={idx} className="fact-strip-card glass-panel flex items-center gap-3 p-3 rounded-xl">
                  <div className="fact-num font-display">{idx + 1}</div>
                  <p className="text-xs text-gray-200 leading-normal">{fact}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      <style jsx="true">{`
        .sun-page-container {
          padding-top: 100px;
          padding-bottom: 5rem;
        }

        .back-btn {
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 1px;
        }

        .sun-page-layout {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 3.5rem;
          align-items: start;
        }

        /* Animated Solar Sphere */
        .sun-visual-system {
          position: relative;
          width: 320px;
          height: 320px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .sun-fire-sphere {
          position: relative;
          width: 240px;
          height: 240px;
          border-radius: 50%;
          overflow: hidden;
          background: #ff5500;
          z-index: 5;
          box-shadow: 0 0 40px #ff3300, 0 0 80px rgba(255, 85, 0, 0.4), inset 0 0 30px rgba(0,0,0,0.8);
          border: 1px solid rgba(255, 170, 0, 0.3);
        }

        .sun-fire-texture {
          position: absolute;
          width: 300%;
          height: 100%;
          background: repeating-linear-gradient(45deg, #ffaa00 0px, #ff5500 20px, #ff2200 40px, #ffaa00 80px);
          opacity: 0.85;
          filter: blur(1px);
        }

        .sun-core-shading {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          box-shadow: inset -25px -25px 50px rgba(0,0,0,0.7), inset 25px 25px 40px rgba(255,255,255,0.1);
          z-index: 10;
        }

        .sun-corona-edge {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          box-shadow: 0 0 30px #ffea00;
          z-index: 15;
          opacity: 0.7;
        }

        /* Pulsing Corona Rings */
        .sun-corona-ring {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 85, 0, 0.25) 0%, transparent 70%);
          pointer-events: none;
          z-index: 1;
        }

        .sun-corona-ring.ring-1 {
          width: 310px;
          height: 310px;
          animation: pulseCorona 3s infinite ease-in-out;
        }

        .sun-corona-ring.ring-2 {
          width: 280px;
          height: 280px;
          animation: pulseCorona 2s infinite ease-in-out alternate;
        }

        @keyframes pulseCorona {
          0%, 100% { transform: scale(1.0); opacity: 0.4; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }

        /* Flares rotating path */
        .sun-flares-container {
          position: absolute;
          width: 320px;
          height: 320px;
          pointer-events: none;
          z-index: 3;
        }

        .solar-flares-svg {
          width: 100%;
          height: 100%;
        }

        .flare-path {
          transform-origin: 50px 50px;
          opacity: 0.6;
        }

        .flare-path.reversed {
          opacity: 0.45;
        }

        /* Floating solar heat particles */
        .solar-particle {
          position: absolute;
          width: 6px;
          height: 6px;
          background: #ffea00;
          border-radius: 50%;
          box-shadow: 0 0 8px #ffaa00;
          z-index: 8;
        }

        .solar-particle.p1 { top: 40px; left: 80px; animation: floatHeat 4s infinite ease-in-out; }
        .solar-particle.p2 { top: 220px; left: 60px; animation: floatHeat 5s infinite ease-in-out 1s; }
        .solar-particle.p3 { top: 80px; right: 60px; animation: floatHeat 4.5s infinite ease-in-out 1.5s; }
        .solar-particle.p4 { bottom: 60px; right: 80px; animation: floatHeat 3.8s infinite ease-in-out 0.5s; }

        @keyframes floatHeat {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.2; }
          50% { transform: translate(15px, -20px) scale(1.4); opacity: 0.9; }
        }

        /* Controls */
        .zoom-controls-tray {
          background: rgba(15,23,42,0.4);
          border: 1px solid var(--card-border);
          border-radius: 20px;
          padding: 3px;
        }

        .zoom-btn {
          background: transparent;
          border: none;
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.3s;
        }

        .zoom-btn:hover {
          background: rgba(255,255,255,0.1);
          color: var(--highlight-color);
        }

        /* Telemetry grid */
        .telemetry-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
          gap: 1.25rem;
        }

        .telemetry-cell {
          display: flex;
          flex-direction: column;
          border-bottom: 1.5px solid rgba(255,255,255,0.03);
          padding-bottom: 0.4rem;
        }

        .telemetry-cell .label {
          font-size: 0.65rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .telemetry-cell .value {
          font-size: 0.9rem;
          color: white;
          font-weight: 600;
          margin-top: 0.15rem;
        }

        .fact-strip-card {
          background: rgba(15,23,42,0.4);
        }

        .fact-num {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
          color: white;
          font-size: 0.75rem;
          font-weight: 800;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-shrink: 0;
        }

        @media (max-width: 900px) {
          .sun-page-layout {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .sun-render-column {
            padding-bottom: 2rem;
            border-bottom: 1px solid var(--card-border);
          }
        }
      `}</style>
    </div>
  );
}
