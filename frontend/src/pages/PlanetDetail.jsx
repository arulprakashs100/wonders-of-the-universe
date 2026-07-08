import React, { useState, useRef, useEffect } from "react";
import { ArrowLeft, ZoomIn, ZoomOut, Compass, Sparkles, Award } from "lucide-react";
import { planets } from "../data/planets";

export default function PlanetDetail({ planetId, onBack }) {
  const planet = planets.find(p => p.id === planetId) || planets[2];
  
  const [planetZoom, setPlanetZoom] = useState(1);
  const [rotationX, setRotationX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const prevRotationX = useRef(0);

  // Drag-to-rotate events
  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    prevRotationX.current = rotationX;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const delta = e.clientX - dragStartX.current;
    // Map mouse movement to horizontal position translation
    setRotationX(prevRotationX.current + delta * 0.8);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mouseup", handleMouseUp);
      return () => window.removeEventListener("mouseup", handleMouseUp);
    }
  }, [isDragging]);

  // Planet-specific mock texture gradients to simulate continents/bands
  const getPlanetTexture = (id) => {
    switch (id) {
      case "mercury":
        return "repeating-linear-gradient(90deg, #94A3B8 0px, #64748B 40px, #475569 80px, #94A3B8 120px)";
      case "venus":
        return "repeating-linear-gradient(90deg, #EAB308 0px, #CA8A04 30px, #A16207 60px, #EAB308 120px)";
      case "earth":
        return "repeating-linear-gradient(90deg, #3B82F6 0px, #2563EB 50px, #15803D 80px, #166534 110px, #3B82F6 150px)";
      case "mars":
        return "repeating-linear-gradient(90deg, #EF4444 0px, #DC2626 40px, #991B1B 80px, #EF4444 120px)";
      case "jupiter":
        return "repeating-linear-gradient(90deg, #F97316 0px, #EA580C 20px, #FDE047 50px, #D97706 85px, #F97316 120px)";
      case "saturn":
        return "repeating-linear-gradient(90deg, #F59E0B 0px, #D97706 30px, #CA8A04 60px, #F59E0B 120px)";
      case "uranus":
        return "repeating-linear-gradient(90deg, #22D3EE 0px, #06B6D4 40px, #0891B2 80px, #22D3EE 120px)";
      case "neptune":
        return "repeating-linear-gradient(90deg, #3B82F6 0px, #1D4ED8 40px, #1E3A8A 80px, #3B82F6 120px)";
      default:
        return "linear-gradient(90deg, #3b82f6, #8b5cf6)";
    }
  };

  const getPlanetAtmosphere = (id) => {
    switch (id) {
      case "earth": return "rgba(34, 211, 238, 0.4)";
      case "mars": return "rgba(239, 68, 68, 0.25)";
      case "jupiter": return "rgba(249, 115, 22, 0.3)";
      case "saturn": return "rgba(251, 191, 36, 0.25)";
      case "uranus": return "rgba(34, 211, 238, 0.45)";
      case "neptune": return "rgba(99, 102, 241, 0.4)";
      default: return "rgba(255, 255, 255, 0.15)";
    }
  };

  // Detailed specifications data compiled
  const specData = {
    mercury: { density: "5.43 g/cm³", escVelocity: "4.3 km/s", speed: "47.4 km/s", field: "Weak (1% of Earth)", age: "4.5 Billion Yrs", rings: 0, discoverer: "Known since antiquity", rotatePeriod: "58.6 Earth days" },
    venus: { density: "5.24 g/cm³", escVelocity: "10.4 km/s", speed: "35.0 km/s", field: "None detected", age: "4.5 Billion Yrs", rings: 0, discoverer: "Known since antiquity", rotatePeriod: "243 Earth days (retrograde)" },
    earth: { density: "5.51 g/cm³", escVelocity: "11.2 km/s", speed: "29.8 km/s", field: "Strong magnetic shield", age: "4.54 Billion Yrs", rings: 0, discoverer: "Prehistoric", rotatePeriod: "23.9 Hours" },
    mars: { density: "3.93 g/cm³", escVelocity: "5.0 km/s", speed: "24.1 km/s", field: "Extremely weak / local patches", age: "4.5 Billion Yrs", rings: 0, discoverer: "Known since antiquity", rotatePeriod: "24.6 Hours" },
    jupiter: { density: "1.33 g/cm³", escVelocity: "59.5 km/s", speed: "13.1 km/s", field: "Extremely strong (14x Earth)", age: "4.5 Billion Yrs", rings: 4, discoverer: "Known since antiquity", rotatePeriod: "9.9 Hours" },
    saturn: { density: "0.69 g/cm³", escVelocity: "35.5 km/s", speed: "9.7 km/s", field: "Strong (similar to Earth's)", age: "4.5 Billion Yrs", rings: 7, discoverer: "Known since antiquity", rotatePeriod: "10.7 Hours" },
    uranus: { density: "1.27 g/cm³", escVelocity: "21.3 km/s", speed: "6.8 km/s", field: "Moderate (tilted 59°)", age: "4.5 Billion Yrs", rings: 13, discoverer: "William Herschel (1781)", rotatePeriod: "17.2 Hours (retrograde)" },
    neptune: { density: "1.64 g/cm³", escVelocity: "23.5 km/s", speed: "5.4 km/s", field: "Moderate (tilted 47°)", age: "4.5 Billion Yrs", rings: 5, discoverer: "Urbain Le Verrier (1846)", rotatePeriod: "16.1 Hours" }
  };

  const currentSpecs = specData[planet.id] || specData.earth;

  // Moons Registry mapping
  const moonLists = {
    mercury: { list: [], count: 0 },
    venus: { list: [], count: 0 },
    earth: { list: ["The Moon"], count: 1 },
    mars: { list: ["Phobos", "Deimos"], count: 2 },
    jupiter: { list: ["Io", "Europa", "Ganymede", "Callisto"], count: 95 },
    saturn: { list: ["Titan", "Enceladus", "Mimas"], count: 146 },
    uranus: { list: ["Titania", "Oberon", "Umbriel"], count: 28 },
    neptune: { list: ["Triton", "Nereid"], count: 16 }
  };

  const currentMoons = moonLists[planet.id] || { list: [], count: 0 };

  return (
    <div className="planet-detail-page container">
      {/* Back navigation button */}
      <button className="btn-outline back-btn font-display uppercase tracking-wider mb-6" onClick={onBack}>
        <ArrowLeft className="w-4 h-4" /> Back to Orbit
      </button>

      <div className="planet-detail-layout">
        
        {/* Left Side: 3D Rendered Interactive Planet */}
        <div className="planet-render-column flex-center flex-col">
          <div 
            className="planet-interactive-canvas float-element"
            style={{ transform: `scale(${planetZoom})` }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseUp}
          >
            {/* Saturn's back rings (rendered behind the sphere) */}
            {planet.id === "saturn" && <div className="saturn-ring back-half" />}

            {/* Rotating Sphere Core */}
            <div className="sphere-element-wrapper">
              <div 
                className="texture-scrolling-layer"
                style={{
                  background: getPlanetTexture(planet.id),
                  backgroundPositionX: `${rotationX}px`
                }}
              />
              {/* Day/Night terminator lighting overlay */}
              <div className="day-night-terminator" />
              {/* Rim Atmospheric glow */}
              <div 
                className="atmospheric-rim-glow"
                style={{
                  boxShadow: `inset 0 0 20px rgba(255,255,255,0.15), 0 0 35px ${getPlanetAtmosphere(planet.id)}`
                }}
              />
            </div>

            {/* Saturn's front rings (rendered in front of the sphere) */}
            {planet.id === "saturn" && <div className="saturn-ring front-half" />}
          </div>

          {/* Interactive controls */}
          <div className="interaction-badge mt-6 flex-center gap-1.5 text-xs text-cyan-400 font-mono">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Drag sphere to rotate planet manually
          </div>

          <div className="zoom-controls-tray mt-3 flex gap-2">
            <button className="zoom-btn" onClick={() => setPlanetZoom(prev => Math.min(prev + 0.1, 1.5))}><ZoomIn className="w-4 h-4" /></button>
            <button className="zoom-btn" onClick={() => setPlanetZoom(prev => Math.max(prev - 0.1, 0.7))}><ZoomOut className="w-4 h-4" /></button>
          </div>
        </div>

        {/* Right Side: Educational details */}
        <div className="planet-info-column flex flex-col gap-6">
          <div className="info-header-block">
            <span className="type-badge font-display">{planet.type}</span>
            <h1 className="planet-title-name font-display text-white mt-2">{planet.name}</h1>
            <p className="planet-overview-para leading-relaxed text-secondary mt-3">{planet.detailText}</p>
          </div>

          {/* Statistics telemetry table */}
          <div className="telemetry-table-panel glass-panel p-6 rounded-[20px]">
            <h3 className="section-title-telemetry font-display flex items-center gap-2 mb-4">
              <Compass className="w-5 h-5 text-blue-400" /> Scientific Telemetry
            </h3>

            <div className="telemetry-grid">
              <div className="telemetry-cell">
                <span className="label">Diameter</span>
                <span className="value font-mono">{planet.diameter}</span>
              </div>
              <div className="telemetry-cell">
                <span className="label">Mass</span>
                <span className="value font-mono">{planet.mass}</span>
              </div>
              <div className="telemetry-cell">
                <span className="label">Surface Gravity</span>
                <span className="value font-mono">{planet.gravity}</span>
              </div>
              <div className="telemetry-cell">
                <span className="label">Mean Density</span>
                <span className="value font-mono">{currentSpecs.density}</span>
              </div>
              <div className="telemetry-cell">
                <span className="label">Avg Temp</span>
                <span className="value font-mono">{planet.temperature}</span>
              </div>
              <div className="telemetry-cell">
                <span className="label">Atmosphere</span>
                <span className="value text-xs">{planet.atmosphere}</span>
              </div>
              <div className="telemetry-cell">
                <span className="label">Distance from Sun</span>
                <span className="value font-mono">{planet.distance}</span>
              </div>
              <div className="telemetry-cell">
                <span className="label">Orbital Period</span>
                <span className="value font-mono">{planet.orbit}</span>
              </div>
              <div className="telemetry-cell">
                <span className="label">Rotation Period</span>
                <span className="value font-mono">{currentSpecs.rotatePeriod}</span>
              </div>
              <div className="telemetry-cell">
                <span className="label">Escape Velocity</span>
                <span className="value font-mono">{currentSpecs.escVelocity}</span>
              </div>
              <div className="telemetry-cell">
                <span className="label">Average Speed</span>
                <span className="value font-mono">{currentSpecs.speed}</span>
              </div>
              <div className="telemetry-cell">
                <span className="label">Magnetic Field</span>
                <span className="value text-xs">{currentSpecs.field}</span>
              </div>
              <div className="telemetry-cell">
                <span className="label">Age of Body</span>
                <span className="value font-mono">{currentSpecs.age}</span>
              </div>
              <div className="telemetry-cell">
                <span className="label">Rings System</span>
                <span className="value font-mono">{currentSpecs.rings > 0 ? `${currentSpecs.rings} Ring systems` : "None"}</span>
              </div>
              <div className="telemetry-cell">
                <span className="label">Discoverer</span>
                <span className="value text-xs">{currentSpecs.discoverer}</span>
              </div>
            </div>
          </div>

          {/* Moons information */}
          <div className="moons-table-panel glass-panel p-6 rounded-[20px]">
            <h3 className="section-title-telemetry font-display flex items-center justify-between mb-4">
              <span>Natural Satellites (Moons)</span>
              <span className="badge-count font-mono">{currentMoons.count} Moons</span>
            </h3>

            {currentMoons.count > 0 ? (
              <div className="moons-content flex flex-col gap-3">
                <p className="text-xs text-gray-400">Famous satellites orbiting {planet.name}:</p>
                <div className="famous-moons-row flex flex-wrap gap-2">
                  {currentMoons.list.map((moon, idx) => (
                    <div key={idx} className="moon-tag-element glass-panel flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white">
                      <Award className="w-3.5 h-3.5 text-yellow-400" /> {moon}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 italic mt-1">Total confirmed satellites in orbit: {currentMoons.count}.</p>
              </div>
            ) : (
              <div className="no-moons-notice text-xs text-gray-400 italic">
                {planet.name} possesses no natural satellites orbiting its gravitational body.
              </div>
            )}
          </div>

          {/* Facts list */}
          <div className="facts-cards-panel">
            <h3 className="section-title-telemetry font-display text-white mb-4">Planetary Trivia</h3>
            <div className="trivia-list flex flex-col gap-3">
              {planet.funFacts.map((fact, idx) => (
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
        .planet-detail-page {
          padding-top: 100px;
          padding-bottom: 5rem;
        }

        .back-btn {
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 1px;
        }

        /* Layout columns split */
        .planet-detail-layout {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 3.5rem;
          align-items: start;
        }

        /* 3D Sphere render styling */
        .planet-interactive-canvas {
          position: relative;
          width: 320px;
          height: 320px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: grab;
          user-select: none;
        }

        .planet-interactive-canvas:active {
          cursor: grabbing;
        }

        .sphere-element-wrapper {
          position: relative;
          width: 260px;
          height: 260px;
          border-radius: 50%;
          overflow: hidden;
          background-color: #030712;
          z-index: 5;
          box-shadow: 0 0 15px rgba(0,0,0,0.5);
        }

        .texture-scrolling-layer {
          position: absolute;
          top: 0;
          left: 0;
          width: 300%;
          height: 100%;
          background-repeat: repeat-x;
        }

        @keyframes spinPlanet {
          from { background-position-x: 0px; }
          to { background-position-x: -1200px; } /* repeats smoothly */
        }

        /* Day and night terminator (3D spheres look) */
        .day-night-terminator {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          box-shadow: inset -45px -45px 50px rgba(0, 0, 0, 0.95), 
                      inset 20px 20px 30px rgba(255, 255, 255, 0.15);
          pointer-events: none;
          z-index: 10;
        }

        .atmospheric-rim-glow {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          pointer-events: none;
          z-index: 15;
        }

        /* Saturn's Custom 3D Rings */
        .saturn-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 440px;
          height: 90px;
          border-radius: 50%;
          border: 14px double rgba(251, 191, 36, 0.35);
          outline: 4px solid rgba(251, 191, 36, 0.15);
          transform: translate(-50%, -50%) rotateX(72deg) rotateY(12deg);
          pointer-events: none;
        }

        .saturn-ring.back-half {
          z-index: 1; /* behind sphere */
          clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%); /* top half */
        }

        .saturn-ring.front-half {
          z-index: 6; /* in front of sphere */
          clip-path: polygon(0 50%, 100% 50%, 100% 100%, 0 100%); /* bottom half */
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

        /* Telemetry Table Grid */
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

        .badge-count {
          background: var(--tag-bg);
          color: var(--primary-color);
          padding: 0.2rem 0.6rem;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 800;
        }

        /* Trivia styles */
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
          .planet-detail-layout {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .planet-render-column {
            padding-bottom: 2rem;
            border-bottom: 1px solid var(--card-border);
          }
        }
      `}</style>
    </div>
  );
}
