import React, { useState, useEffect } from "react";
import { Compass, Sparkles, Orbit, Send } from "lucide-react";

export default function Footer({ setCurrentPage }) {
  const [currentFact, setCurrentFact] = useState("");

  const spaceFacts = [
    "One day on Venus is longer than one Earth year (Venus takes 243 days to rotate, 225 days to orbit).",
    "Neutron stars are so dense that a single teaspoon of their material would weigh about 6 billion tons on Earth.",
    "The footprints left by Apollo astronauts on the Moon will remain there for millions of years because there is no wind or water.",
    "Voyager 1 is the farthest human-made object, traveling at over 61,000 km/h in interstellar space.",
    "The Milky Way galaxy and the Andromeda galaxy are on a collision course, set to merge in about 4.5 billion years.",
    "Olympus Mons on Mars is the largest volcano in the solar system, three times taller than Mount Everest.",
    "Sunlight takes exactly 8 minutes and 20 seconds to travel 150 million kilometers to Earth.",
    "There are more stars in the observable universe than there are grains of sand on all the beaches on Earth.",
    "Because of the gravitational lensing of black holes, light is bent so strongly that it can orbit the black hole.",
  ];

  useEffect(() => {
    // Set initial random fact
    const randomIdx = Math.floor(Math.random() * spaceFacts.length);
    setCurrentFact(spaceFacts[randomIdx]);

    // Update fact every 10 seconds
    const interval = setInterval(() => {
      const newIdx = Math.floor(Math.random() * spaceFacts.length);
      setCurrentFact(spaceFacts[newIdx]);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleLinkClick = (pageId) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer-container glass-panel">
      <div className="container footer-grid">
        {/* Brand & Fact Ticker */}
        <div className="footer-brand-section">
          <div className="footer-logo" onClick={() => handleLinkClick("home")}>
            <Orbit className="w-6 h-6 text-blue-400" />
            <span className="logo-text font-display">WONDERS OF THE UNIVERSE</span>
          </div>
          <p className="footer-tagline">Explore the Infinite Universe Beyond Our World.</p>
          
          {/* Fact Ticker Box */}
          <div className="fact-ticker-box glass-panel">
            <div className="fact-header">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="fact-title font-display">Cosmic Fact</span>
            </div>
            <p className="fact-text-ticker animate-fade-in">{currentFact}</p>
          </div>
        </div>

        {/* Navigation Quick Links */}
        <div className="footer-links-group">
          <h4 className="footer-header font-display">Celestial Bodies</h4>
          <ul className="footer-links-list">
            <li><button onClick={() => handleLinkClick("solarsystem")}>Solar System</button></li>
            <li><button onClick={() => handleLinkClick("planets")}>Planets Catalog</button></li>
            <li><button onClick={() => handleLinkClick("galaxies")}>Galaxies</button></li>
            <li><button onClick={() => handleLinkClick("stars")}>Stars</button></li>
            <li><button onClick={() => handleLinkClick("moons")}>Moons</button></li>
            <li><button onClick={() => handleLinkClick("blackholes")}>Black Holes</button></li>
            <li><button onClick={() => handleLinkClick("nebulae")}>Nebulae</button></li>
          </ul>
        </div>

        <div className="footer-links-group">
          <h4 className="footer-header font-display">Exploration</h4>
          <ul className="footer-links-list">
            <li><button onClick={() => handleLinkClick("missions")}>Space Missions</button></li>
            <li><button onClick={() => handleLinkClick("astronauts")}>Astronauts</button></li>
            <li><button onClick={() => handleLinkClick("timeline")}>Space Timeline</button></li>
            <li><button onClick={() => handleLinkClick("about")}>About Project</button></li>
            <li><button onClick={() => handleLinkClick("contact")}>Contact & FAQ</button></li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div className="footer-newsletter-section">
          <h4 className="footer-header font-display">Mission Control</h4>
          <p className="newsletter-desc">Subscribe to receive notifications about space discoveries and rocket launches.</p>
          <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); alert("Subscribed to astronomical updates!"); e.target.reset(); }}>
            <input type="email" placeholder="astronaut@nasa.gov" required className="newsletter-input" />
            <button type="submit" className="newsletter-submit-btn" aria-label="Subscribe">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      <div className="footer-bottom flex-center">
        <p className="footer-copy">&copy; {new Date().getFullYear()} Wonders of the Universe. Built for Space Enthusiasts. Data sourced from NASA.</p>
      </div>

      <style jsx="true">{`
        .footer-container {
          margin-top: 5rem;
          border-left: none;
          border-right: none;
          border-bottom: none;
          border-top: 1px solid var(--card-border);
          padding: 4rem 0 2rem 0;
          background: rgba(5, 8, 22, 0.65);
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 3rem;
          margin-bottom: 3rem;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          margin-bottom: 0.5rem;
        }

        .footer-logo .logo-text {
          font-size: 0.95rem;
          font-weight: 800;
          letter-spacing: 1px;
          color: white;
        }

        .footer-tagline {
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }

        .fact-ticker-box {
          padding: 1rem;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--card-border);
          max-width: 350px;
        }

        .fact-header {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          margin-bottom: 0.35rem;
        }

        .fact-title {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--highlight-color);
        }

        .fact-text-ticker {
          font-size: 0.8rem;
          line-height: 1.4;
          color: var(--text-color);
          opacity: 0.85;
          min-height: 48px;
        }

        .footer-header {
          font-size: 1rem;
          font-weight: 700;
          color: white;
          margin-bottom: 1.25rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .footer-links-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .footer-links-list button {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          font-size: 0.85rem;
          text-align: left;
          transition: color 0.3s;
        }

        .footer-links-list button:hover {
          color: var(--highlight-color);
        }

        .newsletter-desc {
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-bottom: 1rem;
        }

        .newsletter-form {
          display: flex;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--card-border);
          border-radius: 20px;
          overflow: hidden;
          padding: 2px;
        }

        .newsletter-input {
          flex: 1;
          background: transparent;
          border: none;
          color: white;
          padding: 0.5rem 1rem;
          font-size: 0.85rem;
          outline: none;
        }

        .newsletter-input::placeholder {
          color: rgba(255, 255, 255, 0.3);
        }

        .newsletter-submit-btn {
          background: var(--primary-color);
          border: none;
          color: white;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: background 0.3s;
        }

        .newsletter-submit-btn:hover {
          background: var(--highlight-color);
          color: var(--bg-color);
        }

        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 1.5rem;
        }

        .footer-copy {
          font-size: 0.75rem;
          color: var(--text-secondary);
          text-align: center;
        }

        @media (max-width: 992px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
          }
          .fact-ticker-box {
            max-width: 100%;
          }
        }

        @media (max-width: 576px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
          .footer-container {
            padding: 2rem 0 1rem 0;
          }
        }
      `}</style>
    </footer>
  );
}
