import React, { useState } from "react";
import { Search, Flame, Compass } from "lucide-react";
import { stars } from "../data/stars";

export default function Stars({ onLearnMore }) {
  const [search, setSearch] = useState("");

  const filteredStars = stars.filter(star =>
    star.name.toLowerCase().includes(search.toLowerCase()) ||
    star.constellation.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="stars-page-container container">
      <div className="page-header text-center">
        <h1 className="page-title font-display gradient-text">Stellar Catalog</h1>
        <p className="page-subtitle">From yellow dwarfs to colossal red supergiants, explore the fusion reactors lighting up space.</p>
      </div>

      {/* Toolbar */}
      <div className="toolbar-section glass-panel">
        <div className="search-box-wrapper">
          <Search className="search-bar-icon" />
          <input
            type="text"
            className="search-bar-input"
            placeholder="Search stars or constellations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Stars Grid */}
      <div className="stars-grid">
        {filteredStars.map(star => (
          <div key={star.id} className="star-card glass-card">
            <div className="card-media">
              <img src={star.image} alt={star.name} className="card-img" />
              <div className="card-badges-row">
                <span className="type-badge font-display">{star.constellation}</span>
              </div>
            </div>

            <div className="card-body-content">
              <h3 className="star-card-name font-display">{star.name}</h3>
              <p className="star-card-desc">{star.description}</p>

              <div className="star-specs">
                <div className="star-spec-cell glass-panel">
                  <Flame className="w-4 h-4 text-orange-400" />
                  <div className="meta">
                    <span className="label">Temp</span>
                    <span className="value">{star.temperature.split(" (")[0]}</span>
                  </div>
                </div>

                <div className="star-spec-cell glass-panel">
                  <Compass className="w-4 h-4 text-blue-400" />
                  <div className="meta">
                    <span className="label">Distance</span>
                    <span className="value">{star.distance.split(" (")[0]}</span>
                  </div>
                </div>
              </div>

              <button
                className="btn-outline learn-btn mt-4"
                onClick={() => onLearnMore({ ...star, category: "Star" })}
              >
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredStars.length === 0 && (
        <div className="empty-state text-center py-10 text-gray-400">
          No stellar bodies found matching your search.
        </div>
      )}

      <style jsx="true">{`
        .stars-page-container {
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

        /* Stars Grid */
        .stars-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 2rem;
        }

        .star-card {
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

        .star-card-name {
          font-size: 1.4rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.35rem;
        }

        .star-card-desc {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.4;
          margin-bottom: 1.25rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .star-specs {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.5rem;
          margin-top: auto;
        }

        .star-spec-cell {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.6rem 1rem;
          border-radius: 8px;
        }

        .star-spec-cell .meta {
          display: flex;
          flex-direction: column;
        }

        .star-spec-cell .label {
          font-size: 0.65rem;
          text-transform: uppercase;
          color: var(--text-secondary);
          font-weight: 600;
        }

        .star-spec-cell .value {
          font-size: 0.85rem;
          color: white;
          font-weight: 700;
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
