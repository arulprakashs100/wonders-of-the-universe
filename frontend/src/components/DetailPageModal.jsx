import React, { useEffect } from "react";
import { X, Heart, Star, Award, Compass, Globe, Info, Compass as OrbitIcon } from "lucide-react";
import { planets } from "../data/planets";
import { galaxies } from "../data/galaxies";

export default function DetailPageModal({ item, isOpen, onClose, isFavorite, onToggleFavorite }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleEsc = (e) => e.key === "Escape" && onClose();
      window.addEventListener("keydown", handleEsc);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleEsc);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  // Compile specifications grid cells
  const properties = [];
  if (item.diameter) properties.push({ label: "Diameter", value: item.diameter, icon: <Globe className="w-4 h-4 text-cyan-400" /> });
  if (item.gravity) properties.push({ label: "Gravity", value: item.gravity, icon: <Compass className="w-4 h-4 text-blue-400" /> });
  if (item.temperature) properties.push({ label: "Temperature", value: item.temperature, icon: <Info className="w-4 h-4 text-yellow-400" /> });
  if (item.distance) properties.push({ label: "Distance", value: item.distance, icon: <Star className="w-4 h-4 text-purple-400" /> });
  if (item.moons !== undefined && item.category === "Planet") properties.push({ label: "Moons", value: item.moons, icon: <Award className="w-4 h-4 text-emerald-400" /> });
  if (item.orbit) properties.push({ label: "Orbit Period", value: item.orbit, icon: <OrbitIcon className="w-4 h-4 text-pink-400" /> });
  if (item.mass) properties.push({ label: "Mass", value: item.mass, icon: <Globe className="w-4 h-4 text-red-400" /> });
  if (item.type) properties.push({ label: "Classification", value: item.type, icon: <Info className="w-4 h-4 text-indigo-400" /> });
  if (item.launchDate) properties.push({ label: "Launch Date", value: item.launchDate, icon: <Star className="w-4 h-4 text-yellow-400" /> });
  if (item.agency) properties.push({ label: "Agency", value: item.agency, icon: <Globe className="w-4 h-4 text-cyan-400" /> });
  if (item.status) properties.push({ label: "Status", value: item.status, icon: <Info className="w-4 h-4 text-emerald-400" /> });
  if (item.country) properties.push({ label: "Country", value: item.country, icon: <Globe className="w-4 h-4 text-emerald-400" /> });
  if (item.missions && item.category === "Astronaut") properties.push({ label: "Missions", value: item.missions, icon: <Award className="w-4 h-4 text-purple-400" /> });

  // Get related suggestions
  const getRelatedWonders = () => {
    if (item.category === "Planet") {
      return planets.filter(p => p.id !== item.id).slice(0, 2).map(p => ({ ...p, category: "Planet" }));
    }
    if (item.category === "Galaxy") {
      return galaxies.filter(g => g.id !== item.id).slice(0, 2).map(g => ({ ...g, category: "Galaxy" }));
    }
    return [];
  };

  const related = getRelatedWonders();

  const getInitials = (name) => {
    const parts = name.split(" ");
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`;
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container-split glass-panel" onClick={(e) => e.stopPropagation()}>
        
        {/* Left Side Pane: Immersive Image (or initials badge for Astronauts) */}
        <div className="modal-left-pane">
          {item.category === "Astronaut" ? (
            <div className="modal-avatar-initials-bg flex-center">
              <div className="initials-glow-circle font-display flex-center">
                {getInitials(item.name)}
              </div>
            </div>
          ) : (
            <img src={item.image} alt={item.name} className="modal-side-img" />
          )}
          <div className="left-pane-gradient-overlay" />
          
          <div className="left-pane-header">
            <span className="modal-category-tag font-display">{item.category}</span>
            <h2 className="modal-main-title font-display">{item.name}</h2>
          </div>

          {/* Action buttons */}
          <div className="left-pane-actions">
            {onToggleFavorite && (
              <button 
                className={`left-fav-action-btn ${isFavorite ? "active" : ""}`}
                onClick={() => onToggleFavorite(item)}
                title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? "fill-current text-red-500" : "text-white"}`} />
              </button>
            )}
            
            <button className="left-close-action-btn" onClick={onClose} title="Close Panel">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right Side Pane: Specs, overview articles, related lists */}
        <div className="modal-right-pane">
          <div className="right-pane-scrollable-body">
            
            {/* Specs Grid */}
            {properties.length > 0 && (
              <div className="specs-dashboard-grid">
                {properties.map((prop, idx) => (
                  <div key={idx} className="dashboard-spec-card glass-panel">
                    <div className="spec-card-header">
                      {prop.icon}
                      <span className="label-text">{prop.label}</span>
                    </div>
                    <div className="spec-card-value font-mono">{prop.value}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Overview */}
            <div className="details-text-block">
              <h4 className="details-section-hdr font-display">Orbital Overview</h4>
              <p className="description-p-text leading-relaxed">{item.detailText || item.description}</p>
            </div>

            {/* Goals details */}
            {item.goals && (
              <div className="details-text-block">
                <h4 className="details-section-hdr font-display">Mission Objectives</h4>
                <p className="description-p-text">{item.goals}</p>
              </div>
            )}

            {/* Achievements details */}
            {item.achievements && item.category === "Astronaut" && (
              <div className="details-text-block">
                <h4 className="details-section-hdr font-display">Key Achievements</h4>
                <p className="description-p-text">{item.achievements}</p>
              </div>
            )}

            {/* Interactive Facts */}
            {item.funFacts && item.funFacts.length > 0 && (
              <div className="details-text-block">
                <h4 className="details-section-hdr font-display">Cosmic Facts</h4>
                <div className="detail-facts-stack">
                  {item.funFacts.map((fact, idx) => (
                    <div key={idx} className="fact-strip-card glass-panel flex items-center gap-3 p-3 rounded-xl">
                      <div className="fact-dot font-display">{idx + 1}</div>
                      <p className="fact-content-desc">{fact}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related recommendations */}
            {related.length > 0 && (
              <div className="details-text-block mt-4">
                <h4 className="details-section-hdr font-display">Related Discoveries</h4>
                <div className="related-tray flex gap-4">
                  {related.map(rel => (
                    <div key={rel.id} className="related-mini-card glass-panel flex items-center gap-3 p-2.5 rounded-lg w-1/2">
                      <img src={rel.image} alt={rel.name} className="w-12 h-12 object-cover rounded" />
                      <div className="meta overflow-hidden">
                        <span className="block text-xs font-bold text-white truncate">{rel.name}</span>
                        <span className="block text-[10px] text-cyan-400 uppercase font-semibold">{rel.category}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      <style jsx="true">{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(3, 7, 18, 0.9);
          backdrop-filter: blur(10px);
          z-index: 1000;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2.5rem;
        }

        .modal-container-split {
          width: 100%;
          max-width: 1050px;
          height: 85vh;
          border-radius: 20px;
          overflow: hidden;
          display: grid;
          grid-template-columns: 1.1fr 1.3fr;
          animation: modalSlideZoom 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes modalSlideZoom {
          from { transform: scale(0.96) translateY(20px); opacity: 0; }
          to { transform: scale(1) translateY(0); opacity: 1; }
        }

        /* Left Side visual styling */
        .modal-left-pane {
          position: relative;
          height: 100%;
          overflow: hidden;
          background: #000;
          border-right: 1px solid var(--card-border);
        }

        .modal-avatar-initials-bg {
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, rgba(3, 7, 18, 0.95) 100%);
        }

        .initials-glow-circle {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          background: rgba(15, 23, 42, 0.6);
          border: 3px solid var(--highlight-color);
          color: var(--highlight-color);
          font-size: 3.5rem;
          font-weight: 900;
          text-shadow: 0 0 15px rgba(34, 211, 238, 0.6);
          box-shadow: 0 0 35px rgba(34, 211, 238, 0.3);
          letter-spacing: 1.5px;
        }

        .modal-side-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .left-pane-gradient-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to top, rgba(3, 7, 18, 0.95) 0%, rgba(3, 7, 18, 0.3) 60%, rgba(3, 7, 18, 0.6) 100%);
        }

        .left-pane-header {
          position: absolute;
          bottom: 2rem;
          left: 2rem;
          right: 2rem;
          z-index: 5;
        }

        .modal-category-tag {
          background: rgba(37, 99, 235, 0.8);
          border: 1px solid rgba(255,255,255,0.15);
          color: white;
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
        }

        .modal-main-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: white;
          margin-top: 0.75rem;
          text-shadow: 0 4px 15px rgba(0, 0, 0, 0.8);
          letter-spacing: -0.5px;
        }

        .left-pane-actions {
          position: absolute;
          top: 1.5rem;
          left: 1.5rem;
          display: flex;
          gap: 0.75rem;
          z-index: 10;
        }

        .left-fav-action-btn, .left-close-action-btn {
          background: rgba(3, 7, 18, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: white;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.3s;
        }

        .left-fav-action-btn:hover, .left-close-action-btn:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: var(--highlight-color);
          transform: scale(1.08);
        }

        .left-close-action-btn:hover {
          transform: scale(1.08) rotate(90deg);
        }

        /* Right side details pane styling */
        .modal-right-pane {
          display: flex;
          flex-direction: column;
          height: 100%;
          background: var(--bg-secondary);
        }

        .right-pane-scrollable-body {
          flex: 1;
          overflow-y: auto;
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          scrollbar-width: thin;
        }

        .specs-dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 1rem;
        }

        .dashboard-spec-card {
          padding: 1rem;
          border-radius: 14px;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          background: rgba(15, 23, 42, 0.5);
        }

        .spec-card-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .label-text {
          font-size: 0.75rem;
          text-transform: uppercase;
          color: var(--text-secondary);
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .spec-card-value {
          font-size: 0.95rem;
          font-weight: 700;
          color: white;
        }

        .details-section-hdr {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--highlight-color);
          margin-bottom: 0.75rem;
          border-bottom: 1.5px solid var(--card-border);
          padding-bottom: 0.4rem;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .description-p-text {
          font-size: 0.95rem;
          color: var(--text-color);
          opacity: 0.9;
        }

        .detail-facts-stack {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .fact-strip-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.85rem 1rem;
          border-radius: 12px;
          background: rgba(15, 23, 42, 0.4);
        }

        .fact-dot {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
          color: white;
          font-weight: 700;
          font-size: 0.8rem;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-shrink: 0;
        }

        .fact-content-desc {
          font-size: 0.85rem;
          color: var(--text-color);
          opacity: 0.95;
        }

        @media (max-width: 900px) {
          .modal-overlay {
            padding: 1rem;
          }

          .modal-container-split {
            grid-template-columns: 1fr;
            height: 90vh;
          }

          .modal-left-pane {
            height: 250px;
            border-right: none;
            border-bottom: 1px solid var(--card-border);
          }

          .modal-main-title {
            font-size: 2rem;
          }

          .right-pane-scrollable-body {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
