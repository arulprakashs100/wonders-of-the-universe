import React, { useState } from "react";
import { Search, Compass, Info } from "lucide-react";
import { nebulae } from "../data/nebulae";

export default function Nebulae({ onLearnMore }) {
  const [search, setSearch] = useState("");

  const filteredNebulae = nebulae.filter(neb =>
    neb.name.toLowerCase().includes(search.toLowerCase()) ||
    neb.type.toLowerCase().includes(search.toLowerCase()) ||
    neb.constellation.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="nebulae-page-container container">
      <div className="page-header text-center">
        <h1 className="page-title font-display gradient-text">Cosmic Nebulae</h1>
        <p className="page-subtitle">Gaze upon interstellar clouds of dust, hydrogen, helium and other ionized gases.</p>
      </div>

      {/* Toolbar */}
      <div className="toolbar-section glass-panel">
        <div className="search-box-wrapper">
          <Search className="search-bar-icon" />
          <input
            type="text"
            className="search-bar-input"
            placeholder="Search nebulae, types or constellations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Nebulae Grid */}
      <div className="nebulae-grid">
        {filteredNebulae.map(neb => (
          <div key={neb.id} className="nebula-card glass-card">
            <div className="card-media">
              <img src={neb.image} alt={neb.name} className="card-img" />
              <div className="card-badges-row">
                <span className="type-badge font-display">{neb.constellation}</span>
              </div>
            </div>

            <div className="card-body-content">
              <h3 className="nebula-card-name font-display">{neb.name}</h3>
              <p className="nebula-card-desc">{neb.description}</p>

              <div className="neb-specs">
                <div className="spec-row">
                  <span className="spec-label flex items-center gap-1">
                    <Info className="w-3.5 h-3.5 text-cyan-400" /> Type
                  </span>
                  <span className="spec-value text-xs font-semibold">{neb.type.split(" / ")[0]}</span>
                </div>
                <div className="spec-row">
                  <span className="spec-label flex items-center gap-1">
                    <Compass className="w-3.5 h-3.5 text-blue-400" /> Distance
                  </span>
                  <span className="spec-value">{neb.distance}</span>
                </div>
              </div>

              <button
                className="btn-outline learn-btn mt-4"
                onClick={() => onLearnMore({ ...neb, category: "Nebula" })}
              >
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredNebulae.length === 0 && (
        <div className="empty-state text-center py-10 text-gray-400">
          No nebulae found matching your search.
        </div>
      )}

      <style jsx="true">{`
        .nebulae-page-container {
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

        /* Nebulae Grid */
        .nebulae-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 2rem;
        }

        .nebula-card {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .card-media {
          position: relative;
          height: 180px;
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

        .nebula-card-name {
          font-size: 1.4rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.35rem;
        }

        .nebula-card-desc {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.4;
          margin-bottom: 1.25rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .neb-specs {
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
          align-items: center;
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
