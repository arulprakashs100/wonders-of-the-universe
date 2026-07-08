import React from "react";
import { Orbit, Cpu, BookOpen, Layers, Flame } from "lucide-react";

export default function About() {
  const techStack = [
    { name: "Vite", desc: "For lightning-fast local bundling and instant hot-reloads.", icon: <Cpu className="w-5 h-5 text-cyan-400" /> },
    { name: "React", desc: "Drives our modular components, page transitions, and reactive UI states.", icon: <Layers className="w-5 h-5 text-blue-400" /> },
    { name: "CSS3 Variables & Grids", desc: "Powers our fluid glassmorphism sheets, glows, and responsive layout grids.", icon: <Flame className="w-5 h-5 text-orange-400" /> },
    { name: "Local Storage API", desc: "Saves theme selections, global search queries, and bookmarked favorites locally.", icon: <BookOpen className="w-5 h-5 text-purple-400" /> }
  ];

  const features = [
    "Twinkling Canvas Starfields & Interactive Black Hole Accretion Disk Physics Simulator",
    "Global Universe-wide autocomplete Search overlay modal",
    "Side-by-side Planet Parameters Comparison sheet drawer (Radius, gravity, temp, mass, moons)",
    "Favorites Vault bookmarking system with persistence",
    "Vibrant glassmorphic Light/Dark space theme toggler",
    "Rocket-countdown launch loading screen with interactive progressions",
    "Fluid media query responsive architecture for phones, tablets, laptops, and desktops"
  ];

  return (
    <div className="about-page-container container">
      <div className="page-header text-center">
        <h1 className="page-title font-display gradient-text">About The Mission</h1>
        <p className="page-subtitle">Wonders of the Universe is a modern educational portal built to inspire cosmic literacy.</p>
      </div>

      <div className="about-grid">
        {/* Left column: Overview & Mission */}
        <div className="about-left-col flex flex-col gap-6">
          <div className="about-section-card glass-panel">
            <h3 className="section-title font-display flex items-center gap-2">
              <Orbit className="w-5 h-5 text-blue-400" /> Project Objective
            </h3>
            <p className="text-secondary leading-relaxed">
              Space remains the ultimate frontier of human curiosity. This application was built to provide an educational space directory, bringing together scientific parameters of planets, stars, galaxies, and black holes with detailed histories of space missions and legendary astronauts who paved the path.
            </p>
            <p className="text-secondary leading-relaxed mt-3">
              Designed as a combination of NASA scientific databases, SpaceX technical aesthetics, and Apple's visual elegance, the interface relies on soft neon glows, backdrop blur glass blocks, and high-performance animations to keep users engaged as they learn.
            </p>
          </div>

          <div className="about-section-card glass-panel">
            <h3 className="section-title font-display">Core Features Included</h3>
            <ul className="features-checklist">
              {features.map((feat, idx) => (
                <li key={idx} className="feat-check-item">
                  <div className="check-bullet" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right column: Tech Stack & Dev Profile */}
        <div className="about-right-col flex flex-col gap-6">
          <div className="about-section-card glass-panel">
            <h3 className="section-title font-display">Technologies Engaged</h3>
            <div className="tech-stack-list">
              {techStack.map((tech, idx) => (
                <div key={idx} className="tech-item glass-panel">
                  <div className="tech-hdr flex items-center gap-2">
                    {tech.icon}
                    <h4 className="tech-name font-display">{tech.name}</h4>
                  </div>
                  <p className="tech-desc">{tech.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="about-section-card glass-panel developer-profile-card">
            <h3 className="section-title font-display">Mission Command</h3>
            <div className="dev-profile flex items-center gap-4">
              <div className="dev-avatar flex-center font-display">AP</div>
              <div className="dev-meta">
                <h4 className="dev-name font-display text-white">Arul Prakash S</h4>
                <p className="dev-title text-cyan-400 text-xs uppercase font-semibold">Lead Developer</p>
                <p className="dev-bio text-secondary text-xs mt-1">Full stack engineer and space enthusiast creating immersive digital experiences.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx="true">{`
        .about-page-container {
          padding-top: 110px;
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
          padding-bottom: 4rem;
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
          max-width: 700px;
          margin: 0 auto;
        }

        /* About Layout Grid */
        .about-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 2rem;
        }

        .about-left-col, .about-right-col {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .about-section-card {
          padding: 2rem;
          border-radius: 16px;
        }

        .section-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--highlight-color);
          margin-bottom: 1.25rem;
          border-bottom: 1px solid var(--card-border);
          padding-bottom: 0.5rem;
        }

        .text-secondary {
          color: var(--text-secondary);
          font-size: 0.95rem;
        }

        /* Features checklist */
        .features-checklist {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .feat-check-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          font-size: 0.9rem;
          color: var(--text-color);
          opacity: 0.9;
        }

        .check-bullet {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--highlight-color);
          box-shadow: 0 0 8px var(--highlight-color);
          margin-top: 0.55rem;
          flex-shrink: 0;
        }

        /* Tech stack */
        .tech-stack-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .tech-item {
          padding: 1rem;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.01);
        }

        .tech-hdr {
          margin-bottom: 0.25rem;
        }

        .tech-name {
          color: white;
          font-size: 0.95rem;
          font-weight: 700;
        }

        .tech-desc {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        /* Developer profile */
        .developer-profile-card {
          background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.1) 0%, rgba(var(--accent-rgb), 0.05) 100%);
          border-color: rgba(var(--primary-rgb), 0.25);
        }

        .dev-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%);
          color: white;
          font-size: 1.3rem;
          font-weight: 800;
          box-shadow: 0 4px 15px rgba(var(--primary-rgb), 0.3);
          flex-shrink: 0;
        }

        .dev-profile {
          display: flex;
          align-items: center;
        }

        .dev-meta {
          flex: 1;
        }

        .dev-name {
          font-size: 1.15rem;
          font-weight: 700;
        }

        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
