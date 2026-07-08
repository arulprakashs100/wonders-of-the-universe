import React, { useEffect, useState } from "react";
import { ArrowRight, Compass, Sparkles, Orbit, Award, Telescope } from "lucide-react";
import { planets } from "../data/planets";
import { galaxies } from "../data/galaxies";
import { missions } from "../data/missions";
import { astronauts } from "../data/astronauts";

export default function Home({ setCurrentPage, onLearnMore }) {
  const [stats, setStats] = useState({
    planets: 0,
    moons: 0,
    galaxies: 0,
    age: 0
  });

  useEffect(() => {
    // Count up stats
    const duration = 1500;
    const steps = 50;
    const stepTime = duration / steps;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      setStats({
        planets: Math.min(Math.round((8 / steps) * step), 8),
        moons: Math.min(Math.round((200 / steps) * step), 200),
        galaxies: Math.min(Math.round((100 / steps) * step), 100),
        age: Math.min(parseFloat(((13.8 / steps) * step).toFixed(1)), 13.8)
      });

      if (step >= steps) {
        clearInterval(interval);
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, []);

  const featuredPlanet = planets.find(p => p.id === "mars") || planets[3];
  const featuredGalaxy = galaxies.find(g => g.id === "sombrero") || galaxies[3];
  const featuredMission = missions.find(m => m.id === "james-webb") || missions[4];

  return (
    <div className="home-page-container">
      {/* Spacecraft / Satellite drifting effect */}
      <div className="drifting-spacecraft float-element">
        <svg viewBox="0 0 100 50" className="spacecraft-svg">
          {/* Detailed SVG capsule / ISS outline */}
          <rect x="35" y="20" width="30" height="10" rx="3" fill="#94A3B8" stroke="#1E293B" strokeWidth="1" />
          <circle cx="50" cy="25" r="4" fill="#22D3EE" />
          {/* Solar Panels */}
          <rect x="20" y="5" width="8" height="40" fill="url(#panelGrad)" rx="1" />
          <line x1="28" y1="25" x2="35" y2="25" stroke="#94A3B8" strokeWidth="2" />
          <rect x="72" y="5" width="8" height="40" fill="url(#panelGrad)" rx="1" />
          <line x1="65" y1="25" x2="72" y2="25" stroke="#94A3B8" strokeWidth="2" />
          
          <defs>
            <linearGradient id="panelGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1E3A8A" />
              <stop offset="50%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#0891B2" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Hero Section (Centered Platform Landing) */}
      <section className="hero-section centered-hero-layout">
        {/* Distant Galaxy Glow behind Earth */}
        <div className="galaxy-glow-background" />

        <div className="hero-cosmic-system">
          <div className="system-wrapper">
            {/* Rotating Earth */}
            <div className="earth-sphere pulse-element">
              <svg viewBox="0 0 100 100" className="earth-globe-svg rotate-slow-element">
                <circle cx="50" cy="50" r="48" fill="#0d253f" />
                <g className="continents">
                  <path d="M15,40 Q25,25 35,30 T52,20 T70,35 T50,60 Z" fill="#1e3a8a" opacity="0.8" />
                  <path d="M50,55 Q65,45 80,60 T60,75 T42,70 Z" fill="#1e3a8a" opacity="0.8" />
                  <path d="M22,65 Q30,55 40,75 Z" fill="#0284c7" opacity="0.5" />
                  <path d="M68,20 Q80,10 88,25 Z" fill="#0284c7" opacity="0.5" />
                </g>
                {/* Atmospheric edge glow */}
                <circle cx="50" cy="50" r="48" fill="url(#atmosphere)" opacity="0.4" />
                <defs>
                  <radialGradient id="atmosphere" cx="50%" cy="50%" r="50%">
                    <stop offset="85%" stopColor="#22d3ee" stopOpacity="0" />
                    <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.85" />
                  </radialGradient>
                </defs>
              </svg>
            </div>

            {/* Orbiting Moon */}
            <div className="moon-orbit-ring" />
            <div className="floating-moon-sphere">
              <div className="moon-circle" />
            </div>
          </div>
        </div>

        {/* Hero Copy Content */}
        <div className="hero-centered-content container">
          <div className="hero-badge-pill flex-center gap-1 font-display">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            EXPLORE THE UNIVERSE
          </div>
          
          <h1 className="hero-title-main font-display">
            Journey Beyond the Stars
          </h1>
          
          <p className="hero-subtitle-desc">
            Discover planets, galaxies, black holes and space missions. Dive into scientific parameters and trace humanity's footprints across the cosmos.
          </p>

          <button className="btn-gradient hero-cta-btn" onClick={() => setCurrentPage("planets")}>
            Explore Space <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Statistics Section (Impressive counters) */}
      <section className="stats-section">
        <div className="container stats-grid">
          <div className="stat-card glass-panel">
            <h3 className="stat-num">{stats.planets}</h3>
            <span className="stat-label">Planets</span>
          </div>
          <div className="stat-card glass-panel">
            <h3 className="stat-num">{stats.moons}+</h3>
            <span className="stat-label">Moons</span>
          </div>
          <div className="stat-card glass-panel">
            <h3 className="stat-num">{stats.galaxies} Billion+</h3>
            <span className="stat-label">Galaxies</span>
          </div>
          <div className="stat-card glass-panel">
            <h3 className="stat-num">{stats.age} Billion Yrs</h3>
            <span className="stat-label">Universe Age</span>
          </div>
        </div>
      </section>

      {/* Featured Grids with alternating section layouts */}
      <section className="featured-section container">
        <h2 className="section-title-home font-display">System Spotlights</h2>
        <p className="section-subtitle-home">Curated planetary specs and deep space observations.</p>

        <div className="alternate-layout-stack flex flex-col gap-12">
          {/* Spotlight 1: Mars (Rocky) */}
          <div className="alternate-grid-section glass-panel p-8 rounded-[20px]">
            <div className="spotlight-image-box">
              <img src={featuredPlanet.image} alt={featuredPlanet.name} className="spotlight-img rounded-[15px]" />
            </div>
            <div className="spotlight-content flex flex-col gap-4">
              <span className="tag-badge">Planetary Profile</span>
              <h3 className="spotlight-title font-display text-2xl text-white">{featuredPlanet.name}</h3>
              <p className="spotlight-desc text-secondary leading-relaxed">{featuredPlanet.detailText}</p>
              <button 
                className="btn-outline w-fit mt-2" 
                onClick={() => onLearnMore({ ...featuredPlanet, category: "Planet" })}
              >
                Inspect Telemetry
              </button>
            </div>
          </div>

          {/* Spotlight 2: Sombrero Galaxy (Deep space) - Reversed Layout */}
          <div className="alternate-grid-section reversed glass-panel p-8 rounded-[20px]">
            <div className="spotlight-content flex flex-col gap-4">
              <span className="tag-badge">Deep Space Structure</span>
              <h3 className="spotlight-title font-display text-2xl text-white">{featuredGalaxy.name}</h3>
              <p className="spotlight-desc text-secondary leading-relaxed">{featuredGalaxy.detailText}</p>
              <button 
                className="btn-outline w-fit mt-2" 
                onClick={() => onLearnMore({ ...featuredGalaxy, category: "Galaxy" })}
              >
                Inspect Telemetry
              </button>
            </div>
            <div className="spotlight-image-box">
              <img src={featuredGalaxy.image} alt={featuredGalaxy.name} className="spotlight-img rounded-[15px]" />
            </div>
          </div>

          {/* Spotlight 3: Space Telescope */}
          <div className="alternate-grid-section glass-panel p-8 rounded-[20px]">
            <div className="spotlight-image-box">
              <img src={featuredMission.image} alt={featuredMission.name} className="spotlight-img rounded-[15px]" />
            </div>
            <div className="spotlight-content flex flex-col gap-4">
              <span className="tag-badge">Orbital Instrument</span>
              <h3 className="spotlight-title font-display text-2xl text-white">{featuredMission.name}</h3>
              <p className="spotlight-desc text-secondary leading-relaxed">{featuredMission.detailText}</p>
              <button 
                className="btn-outline w-fit mt-2" 
                onClick={() => onLearnMore({ ...featuredMission, category: "Mission" })}
              >
                Track Objectives
              </button>
            </div>
          </div>
        </div>
      </section>

      {styleTags}
    </div>
  );
}

// Embedded styles to keep layout isolated and highly visual
const styleTags = (
  <style jsx="true">{`
    .home-page-container {
      padding-top: 80px;
      display: flex;
      flex-direction: column;
      gap: 5rem;
      position: relative;
    }

    /* Drifting Spacecraft */
    .drifting-spacecraft {
      position: absolute;
      top: 15vh;
      right: 10%;
      width: 140px;
      height: 70px;
      pointer-events: none;
      z-index: 2;
      opacity: 0.7;
    }

    .spacecraft-svg {
      width: 100%;
      height: 100%;
      filter: drop-shadow(0 0 12px rgba(34, 211, 238, 0.4));
    }

    /* Centered Hero Layout */
    .centered-hero-layout {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      min-height: 85vh;
      overflow: hidden;
      padding: 4rem 1rem;
    }

    .galaxy-glow-background {
      position: absolute;
      width: 600px;
      height: 600px;
      background: radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, rgba(124, 58, 237, 0.08) 50%, transparent 70%);
      pointer-events: none;
      z-index: 1;
      top: 5%;
    }

    .hero-cosmic-system {
      margin-bottom: 2rem;
      z-index: 2;
      position: relative;
    }

    .system-wrapper {
      position: relative;
      width: 260px;
      height: 260px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .earth-sphere {
      width: 170px;
      height: 170px;
      border-radius: 50%;
      background: #000;
      box-shadow: 0 0 35px rgba(34, 211, 238, 0.4), inset 0 0 15px rgba(0,0,0,0.95);
      border: 1px solid rgba(255, 255, 255, 0.05);
      overflow: hidden;
      z-index: 5;
    }

    .earth-globe-svg {
      width: 100%;
      height: 100%;
    }

    .rotate-slow-element {
      animation: rotate-slow 40s linear infinite;
    }

    /* Moon orbit path lines and sphere */
    .moon-orbit-ring {
      position: absolute;
      width: 250px;
      height: 90px;
      border: 1.5px solid rgba(255, 255, 255, 0.06);
      border-radius: 50%;
      transform: rotate(-18deg);
      pointer-events: none;
      z-index: 3;
    }

    .floating-moon-sphere {
      position: absolute;
      width: 250px;
      height: 250px;
      animation: rotate-slow 15s linear infinite;
      z-index: 6;
      pointer-events: none;
    }

    .moon-circle {
      position: absolute;
      width: 22px;
      height: 22px;
      background: #94A3B8;
      border-radius: 50%;
      top: 114px;
      right: -11px;
      box-shadow: 0 0 12px rgba(255, 255, 255, 0.3), inset -4px -4px 6px rgba(0, 0, 0, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    /* Centered hero content text typography */
    .hero-centered-content {
      z-index: 10;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
      max-width: 750px;
    }

    .hero-badge-pill {
      background: rgba(34, 211, 238, 0.12);
      border: 1px solid rgba(34, 211, 238, 0.35);
      color: var(--highlight-color);
      padding: 0.4rem 1.1rem;
      border-radius: 30px;
      font-size: 0.75rem;
      font-weight: 800;
      letter-spacing: 2.5px;
      text-shadow: 0 0 8px rgba(34, 211, 238, 0.3);
    }

    .hero-title-main {
      font-size: 3.8rem;
      line-height: 1.1;
      font-weight: 900;
      color: white;
      text-shadow: 0 4px 20px rgba(0,0,0,0.6);
      text-transform: uppercase;
      letter-spacing: -1px;
      background: linear-gradient(to bottom, #FFFFFF 50%, #94A3B8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .hero-subtitle-desc {
      font-size: 1.15rem;
      color: var(--text-secondary);
      max-width: 600px;
      line-height: 1.6;
    }

    .hero-cta-btn {
      margin-top: 1rem;
      padding: 0.95rem 2.5rem;
      font-size: 1.05rem;
    }

    /* Stats Dashboard counter panel */
    .stats-section {
      background: rgba(15, 23, 42, 0.45);
      border-top: 1px solid var(--card-border);
      border-bottom: 1px solid var(--card-border);
      padding: 3rem 0;
      backdrop-filter: blur(10px);
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 2rem;
    }

    .stat-card {
      text-align: center;
      padding: 1.5rem;
      border-radius: 16px;
    }

    .stat-num {
      font-size: 2.6rem;
      font-weight: 900;
      color: var(--highlight-color);
      margin-bottom: 0.25rem;
      text-shadow: 0 0 15px rgba(34, 211, 238, 0.3);
    }

    .stat-label {
      font-size: 0.95rem;
      color: var(--text-secondary);
      font-weight: 600;
      letter-spacing: 1px;
      text-transform: uppercase;
    }

    /* Alternating spotlight rows */
    .section-title-home {
      font-size: 2.4rem;
      font-weight: 800;
      text-align: center;
      color: white;
      margin-bottom: 0.5rem;
    }

    .section-subtitle-home {
      text-align: center;
      color: var(--text-secondary);
      margin-bottom: 4rem;
      font-size: 1.05rem;
    }

    .alternate-layout-stack {
      display: flex;
      flex-direction: column;
      gap: 3rem;
    }

    .spotlight-image-box {
      width: 100%;
      height: 260px;
      overflow: hidden;
      border-radius: 15px;
      border: 1px solid var(--card-border);
    }

    .spotlight-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s ease;
    }

    .alternate-grid-section:hover .spotlight-img {
      transform: scale(1.08);
    }

    .spotlight-content {
      padding: 1rem 0;
    }

    @media (max-width: 768px) {
      .hero-title-main {
        font-size: 2.5rem;
      }
      .drifting-spacecraft {
        display: none;
      }
      .hero-subtitle-desc {
        font-size: 1rem;
      }
      .spotlight-image-box {
        height: 200px;
      }
    }
  `}</style>
);
