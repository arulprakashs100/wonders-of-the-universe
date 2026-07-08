import React, { useState } from "react";
import { Search, Heart, Star, Compass } from "lucide-react";
import { missions } from "../data/missions";

export default function Missions({ onLearnMore, favorites, onToggleFavorite }) {
  const [search, setSearch] = useState("");
  const [agencyFilter, setAgencyFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredMissions = missions.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) || 
      m.goals.toLowerCase().includes(search.toLowerCase());
      
    const matchesAgency = agencyFilter === "all" || 
      (agencyFilter === "nasa" && m.agency.includes("NASA") && !m.agency.includes("/")) ||
      (agencyFilter === "isro" && m.agency.includes("ISRO")) ||
      (agencyFilter === "joint" && m.agency.includes("/"));

    const matchesStatus = statusFilter === "all" || 
      (statusFilter === "active" && m.status.includes("Active")) ||
      (statusFilter === "completed" && m.status.includes("Completed"));

    return matchesSearch && matchesAgency && matchesStatus;
  });

  return (
    <div className="missions-page-container container">
      <div className="page-header text-center">
        <h1 className="page-title font-display gradient-text">Human Space Missions</h1>
        <p className="page-subtitle">Trace humanity's greatest steps to explore the moon, land on Mars, and peer into the early universe.</p>
      </div>

      {/* Toolbar */}
      <div className="toolbar-section glass-panel">
        <div className="search-box-wrapper">
          <Search className="search-bar-icon" />
          <input
            type="text"
            className="search-bar-input"
            placeholder="Search missions or objectives..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filters-group">
          <select 
            value={agencyFilter} 
            onChange={(e) => setAgencyFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Agencies</option>
            <option value="nasa">NASA (US)</option>
            <option value="isro">ISRO (India)</option>
            <option value="joint">Joint (NASA/ESA/CSA)</option>
          </select>

          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Missions Grid */}
      <div className="missions-grid">
        {filteredMissions.map(m => {
          const isFav = favorites.some(f => f.id === m.id && f.category === "Mission");

          return (
            <div key={m.id} className="mission-card glass-card">
              <div className="card-media">
                <img src={m.image} alt={m.name} className="card-img" />
                <div className="card-badges-row">
                  <span className={`status-badge font-display ${m.status.toLowerCase().includes("active") ? "active-badge" : "completed-badge"}`}>
                    {m.status}
                  </span>
                </div>
                
                <button
                  className={`card-heart-btn ${isFav ? "active" : ""}`}
                  onClick={() => onToggleFavorite({ ...m, category: "Mission" })}
                  title={isFav ? "Remove from Favorites" : "Add to Favorites"}
                >
                  <Heart className={`w-5 h-5 ${isFav ? "fill-current text-red-500" : "text-white"}`} />
                </button>
              </div>

              <div className="card-body-content">
                <div className="agency-label text-cyan-400 font-semibold text-xs uppercase mb-1">{m.agency}</div>
                <h3 className="mission-card-name font-display">{m.name}</h3>
                <p className="mission-card-desc">{m.description}</p>

                <div className="mission-specs">
                  <div className="spec-row">
                    <span className="spec-label flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-yellow-400" /> Launch Date
                    </span>
                    <span className="spec-value text-xs font-semibold">{m.launchDate.split(" (")[0]}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-label flex items-center gap-1">
                      <Compass className="w-3.5 h-3.5 text-blue-400" /> Objectives
                    </span>
                    <span className="spec-value text-xs text-right limit-lines">{m.goals}</span>
                  </div>
                </div>

                <button
                  className="btn-outline learn-btn mt-4"
                  onClick={() => onLearnMore({ ...m, category: "Mission" })}
                >
                  Learn More
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredMissions.length === 0 && (
        <div className="empty-state text-center py-10 text-gray-400">
          No space missions match your selected filters.
        </div>
      )}

      <style jsx="true">{`
        .missions-page-container {
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
        }

        .search-bar-input:focus {
          border-color: var(--primary-color);
        }

        .filters-group {
          display: flex;
          gap: 1rem;
        }

        .filter-select {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--card-border);
          color: var(--text-color);
          padding: 0.7rem 2.2rem 0.7rem 1.5rem;
          border-radius: 30px;
          outline: none;
          font-size: 0.9rem;
          cursor: pointer;
        }

        /* Grid */
        .missions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2rem;
        }

        .mission-card {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .card-media {
          position: relative;
          height: 190px;
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

        .status-badge {
          padding: 0.25rem 0.6rem;
          border-radius: 8px;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          border: 1px solid rgba(255,255,255,0.1);
        }

        .active-badge {
          background: rgba(16, 185, 129, 0.9); /* Green */
          color: white;
        }

        .completed-badge {
          background: rgba(59, 130, 246, 0.9); /* Blue */
          color: white;
        }

        .card-heart-btn {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          background: rgba(0, 0, 0, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.15);
          width: 34px;
          height: 34px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.3s;
        }

        .card-heart-btn:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: scale(1.1);
        }

        .card-body-content {
          padding: 1.25rem 0 0 0;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .mission-card-name {
          font-size: 1.4rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.35rem;
        }

        .mission-card-desc {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.4;
          margin-bottom: 1.25rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .mission-specs {
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
          align-items: flex-start;
          gap: 1rem;
        }

        .spec-label {
          color: var(--text-secondary);
          flex-shrink: 0;
        }

        .spec-value {
          color: var(--text-color);
          font-weight: 600;
        }

        .limit-lines {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-height: 1.3;
        }

        .learn-btn {
          width: 100%;
          padding: 0.6rem 1.2rem;
          font-size: 0.85rem;
          border-radius: 20px;
        }

        @media (max-width: 768px) {
          .toolbar-section {
            flex-direction: column;
            align-items: stretch;
          }
        }
      `}</style>
    </div>
  );
}
