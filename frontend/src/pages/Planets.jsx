import React, { useState } from "react";
import { Search, SlidersHorizontal, Heart, GitCompare, ArrowUpDown } from "lucide-react";
import { planets } from "../data/planets";

export default function Planets({ onLearnMore, favorites, onToggleFavorite, compareList, onToggleCompare }) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  // Filter & Sort logic
  const filteredPlanets = planets
    .filter(planet => {
      const matchesSearch = planet.name.toLowerCase().includes(search.toLowerCase());
      const matchesType = typeFilter === "all" || 
        (typeFilter === "terrestrial" && planet.type === "Terrestrial") ||
        (typeFilter === "giant" && (planet.type.includes("Giant")));
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      if (sortBy === "distance") {
        const getVal = (str) => parseFloat(str.replace(/[^0-9.]/g, ""));
        return getVal(a.distance) - getVal(b.distance);
      }
      if (sortBy === "diameter") {
        const getVal = (str) => parseInt(str.replace(/[^0-9]/g, ""));
        return getVal(b.diameter) - getVal(a.diameter); // descending
      }
      if (sortBy === "gravity") {
        const getVal = (str) => parseFloat(str.replace(/[^0-9.]/g, ""));
        return getVal(b.gravity) - getVal(a.gravity); // descending
      }
      if (sortBy === "moons") {
        return b.moons - a.moons; // descending
      }
      return 0; // default (order in JSON)
    });

  return (
    <div className="planets-page-container container">
      {/* Page Header */}
      <div className="page-header text-center">
        <h1 className="page-title font-display gradient-text">Solar System Planets</h1>
        <p className="page-subtitle font-display">Curated telemetry of celestial bodies orbiting our parent star, the Sun.</p>
      </div>

      {/* Filter / Search Toolbar */}
      <div className="toolbar-section glass-panel">
        <div className="search-box-wrapper">
          <Search className="search-bar-icon" />
          <input
            type="text"
            className="search-bar-input"
            placeholder="Search planets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filters-group">
          {/* Classification Filter */}
          <div className="filter-wrapper">
            <SlidersHorizontal className="filter-icon" />
            <select 
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Types</option>
              <option value="terrestrial">Terrestrial (Rocky)</option>
              <option value="giant">Gas/Ice Giants</option>
            </select>
          </div>

          {/* Sort selection */}
          <div className="filter-wrapper">
            <ArrowUpDown className="filter-icon" />
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="default">Default Order</option>
              <option value="distance">Distance from Sun</option>
              <option value="diameter">Size (Diameter)</option>
              <option value="gravity">Surface Gravity</option>
              <option value="moons">Moons Count</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid of Planets */}
      <div className="planets-grid">
        {filteredPlanets.map(planet => {
          const isFav = favorites.some(f => f.id === planet.id && f.category === "Planet");
          const isComparing = compareList.some(c => c.id === planet.id);
          
          return (
            <div key={planet.id} className="planet-card glass-card">
              {/* Image & Badges */}
              <div className="card-media">
                {/* Wrapped in a rotation container for CSS animation */}
                <div className="planet-image-mask">
                  <img src={planet.image} alt={planet.name} className="card-img" />
                </div>
                <div className="card-badges-row">
                  <span className="type-badge font-display">{planet.type}</span>
                </div>
                
                {/* Favorites Heart Button */}
                <button
                  className={`card-heart-btn ${isFav ? "active" : ""}`}
                  onClick={() => onToggleFavorite({ ...planet, category: "Planet" })}
                  title={isFav ? "Remove from Favorites" : "Add to Favorites"}
                >
                  <Heart className={`w-5 h-5 ${isFav ? "fill-current text-red-500" : "text-white"}`} />
                </button>
              </div>

              {/* Card Body */}
              <div className="card-body-content">
                <h3 className="planet-card-name font-display">{planet.name}</h3>
                <p className="planet-card-desc">{planet.description}</p>

                {/* Specs List */}
                <div className="planet-card-specs">
                  <div className="spec-row">
                    <span className="spec-name">Distance</span>
                    <span className="spec-val text-right font-mono">{planet.distance.split(" (")[0]}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-name">Diameter</span>
                    <span className="spec-val font-mono">{planet.diameter}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-name">Gravity</span>
                    <span className="spec-val font-mono">{planet.gravity}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-name">Moons</span>
                    <span className="spec-val font-mono">{planet.moons}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="card-actions-row">
                  <button 
                    className="btn-outline learn-btn font-display"
                    onClick={() => onLearnMore({ ...planet, category: "Planet" })}
                  >
                    Explore
                  </button>
                  
                  {/* Compare toggle */}
                  <button
                    className={`btn-compare-icon ${isComparing ? "active" : ""}`}
                    onClick={() => onToggleCompare(planet)}
                    title={isComparing ? "Remove from Comparison" : "Compare Planet"}
                  >
                    <GitCompare className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredPlanets.length === 0 && (
        <div className="empty-state text-center py-10 text-gray-400">
          No planets match your search filters.
        </div>
      )}

      <style jsx="true">{`
        .planets-page-container {
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
        }

        /* Toolbar Filter styling */
        .toolbar-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          border-radius: 16px;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .search-box-wrapper {
          position: relative;
          flex: 1;
          min-width: 250px;
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
          font-size: 0.95rem;
        }

        .search-bar-input:focus {
          border-color: var(--primary-color);
        }

        .filters-group {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .filter-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .filter-icon {
          position: absolute;
          left: 1rem;
          color: var(--text-secondary);
          width: 16px;
          height: 16px;
          pointer-events: none;
        }

        .filter-select {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--card-border);
          color: var(--text-color);
          padding: 0.7rem 2.2rem 0.7rem 2.5rem;
          border-radius: 30px;
          outline: none;
          font-size: 0.9rem;
          cursor: pointer;
          appearance: none;
          -webkit-appearance: none;
        }

        .filter-select:focus {
          border-color: var(--primary-color);
        }

        /* Planets Grid & Cards */
        .planets-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 2rem;
        }

        .planet-card {
          display: flex;
          flex-direction: column;
          height: 100%;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.4s ease;
        }

        .planet-card:hover {
          transform: translateY(-10px) scale(1.03);
          border-color: rgba(var(--highlight-rgb), 0.5);
          box-shadow: 0 15px 35px rgba(37, 99, 235, 0.3);
        }

        .card-media {
          position: relative;
          height: 190px;
          border-radius: 14px;
          overflow: hidden;
          background: radial-gradient(circle, rgba(15, 23, 42, 0.6) 0%, rgba(3, 7, 18, 0.9) 100%);
          border: 1px solid rgba(255,255,255,0.05);
        }

        .planet-image-mask {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }

        .card-img {
          width: 85%;
          height: 85%;
          object-fit: contain;
          border-radius: 50%;
          filter: drop-shadow(0 0 15px rgba(37, 99, 235, 0.4));
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .planet-card:hover .card-img {
          transform: scale(1.05);
          filter: drop-shadow(0 0 25px rgba(34, 211, 238, 0.65));
        }

        .card-badges-row {
          position: absolute;
          top: 0.75rem;
          left: 0.75rem;
        }

        .type-badge {
          background: rgba(3, 7, 18, 0.8);
          color: var(--highlight-color);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 0.25rem 0.65rem;
          border-radius: 8px;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .card-heart-btn {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          background: rgba(3, 7, 18, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.12);
          width: 34px;
          height: 34px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.3s;
          z-index: 5;
        }

        .card-heart-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.1);
        }

        .card-body-content {
          padding: 1.25rem 0 0 0;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .planet-card-name {
          font-size: 1.45rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.35rem;
          letter-spacing: 0.5px;
        }

        .planet-card-desc {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.45;
          margin-bottom: 1.25rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .planet-card-specs {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          margin-bottom: 1.25rem;
          padding: 0.85rem;
          background: rgba(15, 23, 42, 0.4);
          border: 1px solid var(--card-border);
          border-radius: 14px;
        }

        .spec-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
          padding-bottom: 0.25rem;
        }

        .spec-row:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .spec-name {
          color: var(--text-secondary);
        }

        .spec-val {
          color: var(--text-color);
          font-weight: 600;
        }

        .card-actions-row {
          display: flex;
          gap: 0.75rem;
          margin-top: auto;
        }

        .learn-btn {
          flex: 1;
          padding: 0.6rem 1.2rem;
          font-size: 0.85rem;
          border-radius: 20px;
          text-align: center;
          justify-content: center;
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .btn-compare-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid var(--card-border);
          background: rgba(255, 255, 255, 0.03);
          color: var(--text-secondary);
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.3s;
        }

        .btn-compare-icon:hover {
          color: var(--highlight-color);
          border-color: var(--highlight-color);
          background: rgba(var(--highlight-rgb), 0.1);
        }

        .btn-compare-icon.active {
          color: var(--bg-color);
          background: var(--highlight-color);
          border-color: var(--highlight-color);
          box-shadow: 0 0 12px rgba(34, 211, 238, 0.4);
        }

        @media (max-width: 768px) {
          .toolbar-section {
            flex-direction: column;
            align-items: stretch;
          }
          .filters-group {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
