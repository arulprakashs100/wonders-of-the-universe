import React, { useState } from "react";
import { Search, Compass, Star } from "lucide-react";
import { galaxies } from "../data/galaxies";

export default function Galaxies({ onLearnMore }) {
  const [search, setSearch] = useState("");

  const filteredGalaxies = galaxies.filter(gal => 
    gal.name.toLowerCase().includes(search.toLowerCase()) ||
    gal.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="galaxies-page-container container">
      <div className="page-header text-center">
        <h1 className="page-title font-display gradient-text">Deep Space Galaxies</h1>
        <p className="page-subtitle">Venture light-years away to explore rotating celestial structures holding billions of stars.</p>
      </div>

      {/* Toolbar */}
      <div className="toolbar-section glass-panel">
        <div className="search-box-wrapper">
          <Search className="search-bar-icon" />
          <input
            type="text"
            className="search-bar-input"
            placeholder="Search galaxies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Galaxies Grid */}
      <div className="galaxies-grid">
        {filteredGalaxies.map(gal => (
          <div key={gal.id} className="galaxy-card glass-card">
            <div className="card-media">
              <img src={gal.image} alt={gal.name} className="card-img" />
              <div className="card-badges-row">
                <span className="type-badge font-display">{gal.type}</span>
              </div>
            </div>

            <div className="card-body-content">
              <h3 className="galaxy-card-name font-display">{gal.name}</h3>
              <p className="galaxy-card-desc">{gal.description}</p>

              <div className="galaxy-specs">
                <div className="spec-item glass-panel">
                  <Compass className="spec-icon w-4 h-4 text-cyan-400" />
                  <div className="spec-meta">
                    <span className="spec-label">Distance</span>
                    <span className="spec-text">{gal.distance.split(" (")[0]}</span>
                  </div>
                </div>

                <div className="spec-item glass-panel">
                  <Star className="spec-icon w-4 h-4 text-yellow-400" />
                  <div className="spec-meta">
                    <span className="spec-label">Stars</span>
                    <span className="spec-text">{gal.stars}</span>
                  </div>
                </div>
              </div>

              <button
                className="btn-outline learn-btn mt-4"
                onClick={() => onLearnMore({ ...gal, category: "Galaxy" })}
              >
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredGalaxies.length === 0 && (
        <div className="empty-state text-center py-10 text-gray-400">
          No galaxies found matching your query.
        </div>
      )}

      <style jsx="true">{`
        .galaxies-page-container {
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

        /* Galaxies Grid */
        .galaxies-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2rem;
        }

        .galaxy-card {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .card-media {
          position: relative;
          height: 200px;
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

        .galaxy-card-name {
          font-size: 1.4rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.35rem;
        }

        .galaxy-card-desc {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.4;
          margin-bottom: 1.25rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .galaxy-specs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          margin-top: auto;
        }

        .spec-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0.75rem;
          border-radius: 8px;
        }

        .spec-meta {
          display: flex;
          flex-direction: column;
        }

        .spec-label {
          font-size: 0.65rem;
          text-transform: uppercase;
          color: var(--text-secondary);
          font-weight: 600;
        }

        .spec-text {
          font-size: 0.8rem;
          color: white;
          font-weight: 700;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 110px;
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
