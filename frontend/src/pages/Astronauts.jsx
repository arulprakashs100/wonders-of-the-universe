import React, { useState } from "react";
import { Search, Heart, Star, Globe, Award } from "lucide-react";
import { astronauts } from "../data/astronauts";

export default function Astronauts({ onLearnMore, favorites, onToggleFavorite }) {
  const [search, setSearch] = useState("");
  const [countryFilter, setCountryFilter] = useState("all");
  const [showFavsOnly, setShowFavsOnly] = useState(false);

  // If showFavsOnly is enabled, we display favorites, otherwise we display astronauts
  const displayItems = showFavsOnly
    ? favorites
    : astronauts.filter(ast => {
        const matchesSearch = ast.name.toLowerCase().includes(search.toLowerCase()) ||
          ast.achievements.toLowerCase().includes(search.toLowerCase());

        const matchesCountry = countryFilter === "all" ||
          (countryFilter === "us" && ast.country.includes("United States")) ||
          (countryFilter === "india" && ast.country.includes("India")) ||
          (countryFilter === "ussr" && ast.country.includes("Soviet"));

        return matchesSearch && matchesCountry;
      });

  const getInitials = (name) => {
    const parts = name.split(" ");
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`;
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="astronauts-page-container container">
      <div className="page-header text-center">
        <h1 className="page-title font-display gradient-text">
          {showFavsOnly ? "Curated Space Pioneers" : "Indian Space Pioneers"}
        </h1>
        <p className="page-subtitle font-display">
          {showFavsOnly 
            ? "Your curated collection of bookmarked space pioneers saved locally."
            : "Explore the profiles of the courageous Indian cosmonauts, astronauts, and upcoming Gaganyaan crew."}
        </p>
      </div>

      {/* Toolbar */}
      <div className="toolbar-section glass-panel">
        {!showFavsOnly && (
          <>
            <div className="search-box-wrapper">
              <Search className="search-bar-icon" />
              <input
                type="text"
                className="search-bar-input"
                placeholder="Search explorers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="filters-group">
              <select 
                value={countryFilter} 
                onChange={(e) => setCountryFilter(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Nations</option>
                <option value="us">United States (Indian Origin)</option>
                <option value="india">India</option>
                <option value="ussr">Soviet Union (Training)</option>
              </select>
            </div>
          </>
        )}

        {/* Favorites Toggle */}
        <button
          className={`btn-fav-toggle ${showFavsOnly ? "active" : ""}`}
          onClick={() => setShowFavsOnly(!showFavsOnly)}
        >
          <Heart className={`w-4 h-4 ${showFavsOnly ? "fill-current" : ""}`} /> 
          {showFavsOnly ? "Show All Astronauts" : `Show Bookmarks (${favorites.length})`}
        </button>
      </div>

      {/* Grid */}
      <div className="astronauts-grid">
        {displayItems.map(item => {
          const cat = item.category || "Astronaut";
          const isFav = favorites.some(f => f.id === item.id && f.category === cat);

          return (
            <div key={`${cat}-${item.id}`} className="astronaut-card glass-card">
              {/* Circular Initials Badge Container instead of photos */}
              <div className="avatar-media-wrapper">
                <div className="circular-avatar-mask flex-center initials-avatar-bg">
                  <span className="avatar-initials font-display">{getInitials(item.name)}</span>
                </div>
                
                {/* Favorites Heart Button */}
                <button
                  className={`card-heart-btn ${isFav ? "active" : ""}`}
                  onClick={() => onToggleFavorite({ ...item, category: cat })}
                  title={isFav ? "Remove from Favorites" : "Add to Favorites"}
                >
                  <Heart className={`w-4 h-4 ${isFav ? "fill-current text-red-500" : "text-white"}`} />
                </button>
              </div>

              {/* Card Details */}
              <div className="astronaut-body-content text-center">
                <div className="country-label flex-center gap-1 text-[11px] text-cyan-400 font-semibold uppercase mb-1">
                  <Globe className="w-3.5 h-3.5" />
                  <span>{item.country || "Space Explorer"}</span>
                </div>
                
                <h3 className="astronaut-name-title font-display">{item.name}</h3>
                
                {/* Metadata details */}
                <div className="ast-telemetry-rows">
                  {item.missions && (
                    <div className="telemetry-row">
                      <span className="label font-display flex items-center gap-1 justify-center"><Star className="w-3 h-3 text-yellow-400" /> Mission</span>
                      <span className="val">{item.missions.split(", ")[0]}</span>
                    </div>
                  )}
                  {item.achievements && (
                    <div className="telemetry-row">
                      <span className="label font-display flex items-center gap-1 justify-center"><Award className="w-3 h-3 text-purple-400" /> Achievement</span>
                      <p className="val truncate-two">{item.achievements}</p>
                    </div>
                  )}
                </div>

                <button
                  className="btn-outline learn-btn mt-5 w-full font-display"
                  onClick={() => onLearnMore({ ...item, category: cat })}
                >
                  Explore Profile
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {displayItems.length === 0 && (
        <div className="empty-state text-center py-12 text-gray-400">
          {showFavsOnly 
            ? "Your bookmarks vault is empty. Favorite items to display them here!"
            : "No space pioneers match your search criteria."}
        </div>
      )}

      <style jsx="true">{`
        .astronauts-page-container {
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

        .toolbar-section {
          display: flex;
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

        .btn-fav-toggle {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--card-border);
          color: var(--text-color);
          padding: 0.7rem 1.5rem;
          border-radius: 30px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s;
          margin-left: auto;
        }

        .btn-fav-toggle:hover {
          background: rgba(239, 68, 68, 0.1);
          border-color: #ef4444;
          color: #ef4444;
        }

        .btn-fav-toggle.active {
          background: #ef4444;
          border-color: #ef4444;
          color: white;
        }

        /* Circular Portrait Card Grid */
        .astronauts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 2rem;
        }

        .astronaut-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem 1.5rem;
          border-radius: 20px;
        }

        .avatar-media-wrapper {
          position: relative;
          margin-bottom: 1.5rem;
        }

        .circular-avatar-mask {
          width: 130px;
          height: 130px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .initials-avatar-bg {
          background: linear-gradient(135deg, rgba(37, 99, 235, 0.2) 0%, rgba(124, 58, 237, 0.15) 100%);
          border-color: rgba(34, 211, 238, 0.3);
        }

        .avatar-initials {
          font-size: 2.2rem;
          font-weight: 800;
          color: var(--highlight-color);
          text-shadow: 0 0 10px rgba(34, 211, 238, 0.5);
          letter-spacing: 1px;
        }

        /* HOVER INTERACTIONS: SCALE & GLOW */
        .astronaut-card:hover .circular-avatar-mask {
          border-color: var(--highlight-color);
          box-shadow: 0 0 25px rgba(34, 211, 238, 0.6);
          transform: scale(1.06);
        }

        .card-heart-btn {
          position: absolute;
          bottom: 0px;
          right: 0px;
          background: rgba(3, 7, 18, 0.85);
          border: 1.5px solid rgba(255, 255, 255, 0.2);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.3s;
        }

        .card-heart-btn:hover {
          transform: scale(1.15);
          border-color: #ef4444;
        }

        .astronaut-body-content {
          width: 100%;
        }

        .astronaut-name-title {
          font-size: 1.35rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.75rem;
          letter-spacing: 0.5px;
        }

        .ast-telemetry-rows {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          background: rgba(15, 23, 42, 0.4);
          border: 1px solid var(--card-border);
          padding: 0.75rem;
          border-radius: 12px;
        }

        .telemetry-row {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          border-bottom: 1px dashed rgba(255, 255, 255, 0.05);
          padding-bottom: 0.35rem;
        }

        .telemetry-row:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .telemetry-row .label {
          font-size: 0.65rem;
          text-transform: uppercase;
          color: var(--text-secondary);
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .telemetry-row .val {
          font-size: 0.8rem;
          color: white;
          font-weight: 550;
        }

        .truncate-two {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-height: 1.3;
        }

        .learn-btn {
          padding: 0.55rem 1.2rem;
          font-size: 0.8rem;
          border-radius: 20px;
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        @media (max-width: 768px) {
          .toolbar-section {
            flex-direction: column;
            align-items: stretch;
          }
          .btn-fav-toggle {
            margin-left: 0;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
