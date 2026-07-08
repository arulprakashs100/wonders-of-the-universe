import React, { useState } from "react";
import { ZoomIn, ZoomOut, RotateCcw, Compass, ArrowRight, Sun as SunIcon } from "lucide-react";
import { planets } from "../data/planets";

export default function SolarSystem({ onSelectPlanet, setCurrentPage }) {
  const [zoomScale, setZoomScale] = useState(0.85);
  const [focusedPlanet, setFocusedPlanet] = useState(null);

  const handleZoomIn = () => setZoomScale(prev => Math.min(prev + 0.15, 2.0));
  const handleZoomOut = () => setZoomScale(prev => Math.max(prev - 0.15, 0.4));
  const handleReset = () => {
    setZoomScale(0.85);
    setFocusedPlanet(null);
  };

  const handlePlanetClick = (planet) => {
    setFocusedPlanet(planet);
  };

  // Orbital parameters for scale and speed
  const orbitParams = {
    mercury: { size: 10, dist: 55, speed: 4, color: "#94A3B8" },
    venus: { size: 14, dist: 80, speed: 8, color: "#FACC15" },
    earth: { size: 15, dist: 110, speed: 12, color: "#3B82F6" },
    mars: { size: 12, dist: 140, speed: 18, color: "#EF4444" },
    jupiter: { size: 30, dist: 195, speed: 32, color: "#F97316" },
    saturn: { size: 26, dist: 250, speed: 48, color: "#FBBF24" },
    uranus: { size: 20, dist: 310, speed: 72, color: "#22D3EE" },
    neptune: { size: 19, dist: 365, speed: 96, color: "#6366F1" }
  };

  return (
    <div className="solar-system-page">
      {/* Control overlay */}
      <div className="hud-controls glass-panel">
        <h2 className="hud-title font-display text-white">Orbital Mission Deck</h2>
        <p className="hud-subtitle">Interactive Real-time Keplerian Simulation</p>
        
        <div className="hud-actions flex gap-2 mt-4">
          <button className="hud-btn" onClick={handleZoomIn} title="Zoom In"><ZoomIn className="w-4 h-4" /></button>
          <button className="hud-btn" onClick={handleZoomOut} title="Zoom Out"><ZoomOut className="w-4 h-4" /></button>
          <button className="hud-btn" onClick={handleReset} title="Reset Camera"><RotateCcw className="w-4 h-4" /></button>
        </div>

        {/* Global Facts panel */}
        <div className="hud-facts-box mt-4">
          <div className="hud-fact-row">
            <span className="label text-gray-400">Total Planets:</span>
            <span className="value text-white font-bold">8</span>
          </div>
          <div className="hud-fact-row">
            <span className="label text-gray-400">Dwarf Planets:</span>
            <span className="value text-cyan-400 font-bold">5+</span>
          </div>
          <div className="hud-fact-row">
            <span className="label text-gray-400">Moons Count:</span>
            <span className="value text-cyan-400 font-bold">290+</span>
          </div>
          <div className="hud-fact-row">
            <span className="label text-gray-400">System Age:</span>
            <span className="value text-yellow-400 font-bold">4.6B Yrs</span>
          </div>
        </div>
      </div>

      {/* Orbit Simulator Container */}
      <div className="orbit-viewport">
        <div 
          className="orbit-zoom-container"
          style={{ 
            transform: `scale(${zoomScale}) translate(${focusedPlanet ? `${-orbitParams[focusedPlanet.id].dist * 0.5}px, 0` : "0px, 0px"})`,
            transition: "transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)"
          }}
        >
          {/* Central Sun */}
          <div className="sun-center" onClick={() => setCurrentPage("sun")} title="Explore the Sun">
            <div className="sun-corona" />
            <div className="sun-core" />
          </div>

          {/* Orbits & Planets loops */}
          {planets.map(planet => {
            const p = orbitParams[planet.id];
            if (!p) return null;

            return (
              <div 
                key={planet.id} 
                className="planet-orbit-track"
                style={{
                  width: `${p.dist * 2}px`,
                  height: `${p.dist * 2}px`,
                }}
              >
                {/* Orbit path line */}
                <div className="orbit-ring-line" />

                {/* Rotating Keplerian anchor */}
                <div 
                  className="planet-revolving-node"
                  style={{
                    animation: `orbitRotation ${p.speed}s linear infinite`,
                    width: `${p.dist * 2}px`,
                    height: `${p.dist * 2}px`,
                  }}
                >
                  {/* Planet sphere */}
                  <div 
                    className={`revolving-planet-sphere ${focusedPlanet?.id === planet.id ? "focused" : ""}`}
                    onClick={() => handlePlanetClick(planet)}
                    style={{
                      width: `${p.size}px`,
                      height: `${p.size}px`,
                      backgroundColor: p.color,
                      boxShadow: `0 0 15px ${p.color}`,
                      left: `calc(50% - ${p.size / 2}px)`,
                      top: `-${p.size / 2}px`
                    }}
                  >
                    {/* Planet name tooltip */}
                    <span className="planet-rev-name font-display">{planet.name}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Focused Planet telemetry HUD */}
      {focusedPlanet && (
        <div className="focused-planet-hud glass-panel">
          <div className="hud-header">
            <h3 className="font-display text-white text-lg">{focusedPlanet.name}</h3>
            <span className="tag-badge text-[10px]">{focusedPlanet.type}</span>
          </div>
          <p className="hud-desc text-xs text-gray-400 mt-2">{focusedPlanet.description}</p>
          
          <div className="hud-specs-mini mt-3">
            <div className="spec-row">
              <span className="label">Diameter</span>
              <span className="value">{focusedPlanet.diameter}</span>
            </div>
            <div className="spec-row">
              <span className="label">Distance</span>
              <span className="value">{focusedPlanet.distance.split(" (")[0]}</span>
            </div>
            <div className="spec-row">
              <span className="label">Gravity</span>
              <span className="value">{focusedPlanet.gravity}</span>
            </div>
          </div>

          <button 
            className="btn-gradient w-full justify-center mt-4 text-xs font-bold py-2 font-display uppercase tracking-wider"
            onClick={() => onSelectPlanet(focusedPlanet)}
          >
            Launch Telemetry <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      <style jsx="true">{`
        .solar-system-page {
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          position: relative;
          background: #030712;
        }

        /* HUD controls left overlay */
        .hud-controls {
          position: absolute;
          top: 90px;
          left: 2rem;
          width: 250px;
          padding: 1.5rem;
          border-radius: 16px;
          z-index: 100;
        }

        .hud-title {
          font-size: 1.15rem;
          font-weight: 800;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .hud-subtitle {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .hud-btn {
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--card-border);
          color: white;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.3s;
        }

        .hud-btn:hover {
          background: rgba(255,255,255,0.15);
          border-color: var(--primary-color);
        }

        .hud-facts-box {
          border-top: 1px dashed var(--card-border);
          padding-top: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .hud-fact-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
        }

        /* Focused Planet HUD right overlay */
        .focused-planet-hud {
          position: absolute;
          top: 90px;
          right: 2rem;
          width: 280px;
          padding: 1.5rem;
          border-radius: 16px;
          z-index: 100;
          animation: slideLeftHUD 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes slideLeftHUD {
          from { transform: translateX(50px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }

        .hud-specs-mini {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          background: rgba(15,23,42,0.4);
          border: 1px solid var(--card-border);
          padding: 0.6rem;
          border-radius: 10px;
        }

        .hud-specs-mini .spec-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
        }

        .hud-specs-mini .label {
          color: var(--text-secondary);
        }

        .hud-specs-mini .value {
          color: white;
          font-weight: 600;
        }

        /* Viewport Orbit Grid */
        .orbit-viewport {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          z-index: 10;
        }

        .orbit-zoom-container {
          position: relative;
          width: 0;
          height: 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        /* Sun Core and Corona glows */
        .sun-center {
          position: absolute;
          width: 70px;
          height: 70px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          z-index: 50;
        }

        .sun-core {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: radial-gradient(circle, #FFF5E6 0%, #FFAA00 60%, #FF3300 100%);
          box-shadow: 0 0 25px #FFAA00, 0 0 50px #FF3300;
          transition: transform 0.3s;
        }

        .sun-corona {
          position: absolute;
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 170, 0, 0.4) 0%, transparent 75%);
          animation: rotate-slow 10s linear infinite;
        }

        .sun-center:hover .sun-core {
          transform: scale(1.1);
          box-shadow: 0 0 35px #FFAA00, 0 0 70px #FF3300, 0 0 100px #FF2200;
        }

        /* Concentric tracks */
        .planet-orbit-track {
          position: absolute;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          pointer-events: none;
        }

        .orbit-ring-line {
          position: absolute;
          width: 100%;
          height: 100%;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 50%;
        }

        /* Keplerian Orbit Revolving Node */
        .planet-revolving-node {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }

        @keyframes orbitRotation {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Planet sphere inside orbital anchor */
        .revolving-planet-sphere {
          position: absolute;
          border-radius: 50%;
          cursor: pointer;
          pointer-events: auto;
          transition: transform 0.2s, filter 0.2s;
        }

        .revolving-planet-sphere:hover {
          transform: scale(1.35);
          filter: brightness(1.2) drop-shadow(0 0 10px currentColor);
        }

        .revolving-planet-sphere.focused {
          transform: scale(1.4);
          outline: 1.5px solid var(--highlight-color);
          outline-offset: 4px;
        }

        /* Tooltip text */
        .planet-rev-name {
          position: absolute;
          bottom: -22px;
          left: 50%;
          transform: translateX(-50%) scale(0.85);
          font-size: 0.65rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.7);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          opacity: 0;
          transition: opacity 0.2s, transform 0.2s;
          white-space: nowrap;
          pointer-events: none;
        }

        .revolving-planet-sphere:hover .planet-rev-name {
          opacity: 1;
          transform: translateX(-50%) scale(1);
          color: white;
        }

        @media (max-width: 768px) {
          .hud-controls {
            top: 80px;
            left: 1rem;
            width: calc(100% - 2rem);
          }
          .focused-planet-hud {
            bottom: 2rem;
            top: auto;
            left: 1rem;
            width: calc(100% - 2rem);
          }
        }
      `}</style>
    </div>
  );
}
