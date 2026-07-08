import React, { useState, useEffect, useRef } from "react";
import { Search, X, Rocket, Star, Heart, Compass, History } from "lucide-react";
import { planets } from "../data/planets";
import { stars } from "../data/stars";
import { galaxies } from "../data/galaxies";
import { moons } from "../data/moons";
import { blackholes } from "../data/blackholes";
import { nebulae } from "../data/nebulae";
import { missions } from "../data/missions";
import { astronauts } from "../data/astronauts";

export default function SearchModal({ isOpen, onClose, onSelectResult }) {
  const [query, setQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const [history, setHistory] = useState([]);
  const inputRef = useRef(null);

  // Compile all search items
  const allItems = [
    ...planets.map(item => ({ ...item, category: "Planet", icon: "planet" })),
    ...stars.map(item => ({ ...item, category: "Star", icon: "star" })),
    ...galaxies.map(item => ({ ...item, category: "Galaxy", icon: "galaxy" })),
    ...moons.map(item => ({ ...item, category: "Moon", icon: "moon" })),
    ...blackholes.map(item => ({ ...item, category: "Black Hole", icon: "blackhole" })),
    ...nebulae.map(item => ({ ...item, category: "Nebula", icon: "nebula" })),
    ...missions.map(item => ({ ...item, category: "Mission", icon: "mission" })),
    ...astronauts.map(item => ({ ...item, category: "Astronaut", icon: "astronaut" })),
  ];

  useEffect(() => {
    // Load search history from local storage
    const storedHistory = localStorage.getItem("universe_search_history");
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
      // Close on escape
      const handleKeyDown = (e) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const saveHistory = (term) => {
    if (!term.trim()) return;
    const cleanTerm = term.trim().toLowerCase();
    const updated = [cleanTerm, ...history.filter(h => h !== cleanTerm)].slice(0, 5);
    setHistory(updated);
    localStorage.setItem("universe_search_history", JSON.stringify(updated));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("universe_search_history");
  };

  const handleResultClick = (item) => {
    saveHistory(query || item.name);
    onSelectResult(item);
    onClose();
  };

  // Filter items based on query and tab
  const filteredItems = allItems.filter(item => {
    const matchesQuery = 
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(query.toLowerCase())) ||
      (item.type && item.type.toLowerCase().includes(query.toLowerCase()));
      
    if (!matchesQuery) return false;
    if (selectedTab === "all") return true;
    return item.category.toLowerCase().replace(" ", "") === selectedTab;
  });

  const getIcon = (type) => {
    switch (type) {
      case "planet":
        return <Compass className="w-5 h-5 text-blue-400" />;
      case "mission":
        return <Rocket className="w-5 h-5 text-cyan-400" />;
      case "star":
        return <Star className="w-5 h-5 text-yellow-400" />;
      case "astronaut":
        return <Heart className="w-5 h-5 text-purple-400" />;
      default:
        return <Compass className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="search-modal-overlay">
      <div className="search-modal-container glass-panel">
        {/* Header Search Input */}
        <div className="search-header">
          <Search className="search-icon-inside w-6 h-6 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            className="search-input-field"
            placeholder="Search planets, galaxies, space missions, astronauts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && saveHistory(query)}
          />
          <button className="search-close-btn" onClick={onClose} aria-label="Close search">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Categories Tab Navigation */}
        <div className="search-tabs">
          {[
            { id: "all", label: "All" },
            { id: "planet", label: "Planets" },
            { id: "galaxy", label: "Galaxies" },
            { id: "star", label: "Stars" },
            { id: "moon", label: "Moons" },
            { id: "mission", label: "Missions" },
            { id: "astronaut", label: "Astronauts" },
          ].map(tab => (
            <button
              key={tab.id}
              className={`search-tab-btn ${selectedTab === tab.id ? "active" : ""}`}
              onClick={() => setSelectedTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Results / History Container */}
        <div className="search-body">
          {query === "" && history.length > 0 && (
            <div className="search-history-section">
              <div className="history-header">
                <span className="flex items-center gap-2 font-semibold text-gray-400">
                  <History className="w-4 h-4" /> Recent Searches
                </span>
                <button className="clear-history-btn" onClick={clearHistory}>
                  Clear
                </button>
              </div>
              <div className="history-list">
                {history.map((term, i) => (
                  <button
                    key={i}
                    className="history-item-tag"
                    onClick={() => setQuery(term)}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="search-results-list">
            {filteredItems.length > 0 ? (
              filteredItems.map(item => (
                <div
                  key={`${item.category}-${item.id}`}
                  className="search-result-card glass-panel"
                  onClick={() => handleResultClick(item)}
                >
                  <div className="result-img-wrapper">
                    <img src={item.image} alt={item.name} className="result-img" />
                  </div>
                  <div className="result-details">
                    <div className="result-title-row">
                      <h4 className="result-title">{item.name}</h4>
                      <span className="result-badge">{item.category}</span>
                    </div>
                    <p className="result-desc">{item.description}</p>
                  </div>
                  <div className="result-action">
                    {getIcon(item.icon)}
                  </div>
                </div>
              ))
            ) : (
              <div className="search-empty flex-center flex-col">
                <Search className="w-12 h-12 text-gray-600 mb-2" />
                <p className="text-gray-400">No celestial bodies found for "{query}"</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx="true">{`
        .search-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(5, 8, 22, 0.85);
          backdrop-filter: blur(8px);
          z-index: 1000;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding-top: 5vh;
        }

        .search-modal-container {
          width: 90%;
          max-width: 800px;
          height: 80vh;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: slideDown 0.3s ease-out;
        }

        @keyframes slideDown {
          from { transform: translateY(-50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .search-header {
          display: flex;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid var(--card-border);
          position: relative;
        }

        .search-icon-inside {
          position: absolute;
          left: 2.5rem;
        }

        .search-input-field {
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--card-border);
          padding: 1rem 1rem 1rem 3.5rem;
          border-radius: 30px;
          font-size: 1.1rem;
          color: var(--text-color);
          outline: none;
        }

        .search-input-field:focus {
          border-color: var(--primary-color);
          box-shadow: 0 0 10px rgba(var(--primary-rgb), 0.3);
        }

        .search-close-btn {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          margin-left: 1rem;
          cursor: pointer;
          transition: color 0.3s;
        }

        .search-close-btn:hover {
          color: var(--text-color);
        }

        .search-tabs {
          display: flex;
          gap: 0.5rem;
          padding: 0.5rem 1.5rem;
          overflow-x: auto;
          scrollbar-width: none;
          border-bottom: 1px solid var(--card-border);
        }

        .search-tabs::-webkit-scrollbar {
          display: none;
        }

        .search-tab-btn {
          background: transparent;
          border: 1px solid transparent;
          padding: 0.4rem 1rem;
          border-radius: 20px;
          color: var(--text-secondary);
          cursor: pointer;
          white-space: nowrap;
          font-weight: 500;
          font-size: 0.9rem;
          transition: all 0.3s;
        }

        .search-tab-btn:hover {
          color: var(--text-color);
          background: rgba(255, 255, 255, 0.05);
        }

        .search-tab-btn.active {
          background: var(--primary-color);
          color: white;
          border-color: var(--primary-color);
        }

        .search-body {
          flex: 1;
          overflow-y: auto;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .search-history-section {
          background: rgba(255, 255, 255, 0.02);
          padding: 1rem;
          border-radius: 12px;
          border: 1px solid var(--card-border);
        }

        .history-header {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          margin-bottom: 0.5rem;
        }

        .clear-history-btn {
          background: transparent;
          border: none;
          color: var(--highlight-color);
          cursor: pointer;
        }

        .history-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .history-item-tag {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-secondary);
          border: 1px solid var(--card-border);
          padding: 0.25rem 0.75rem;
          border-radius: 15px;
          cursor: pointer;
          font-size: 0.85rem;
          transition: all 0.3s;
        }

        .history-item-tag:hover {
          background: rgba(255, 255, 255, 0.1);
          color: var(--text-color);
        }

        .search-results-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .search-result-card {
          display: flex;
          align-items: center;
          padding: 0.75rem 1rem;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .search-result-card:hover {
          background: rgba(var(--primary-rgb), 0.1);
          border-color: rgba(var(--primary-rgb), 0.4);
          transform: translateX(5px);
        }

        .result-img-wrapper {
          width: 50px;
          height: 50px;
          border-radius: 8px;
          overflow: hidden;
          margin-right: 1rem;
          flex-shrink: 0;
        }

        .result-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .result-details {
          flex: 1;
        }

        .result-title-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.2rem;
        }

        .result-title {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-color);
        }

        .result-badge {
          font-size: 0.7rem;
          background: rgba(var(--primary-rgb), 0.15);
          color: var(--primary-color);
          padding: 0.1rem 0.5rem;
          border-radius: 10px;
          font-weight: 600;
        }

        .result-desc {
          font-size: 0.85rem;
          color: var(--text-secondary);
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .result-action {
          margin-left: 1rem;
        }

        .search-empty {
          padding: 3rem 0;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
