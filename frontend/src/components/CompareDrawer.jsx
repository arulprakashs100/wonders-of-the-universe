import React from "react";
import { X, Trash2, GitCompare } from "lucide-react";

export default function CompareDrawer({ isOpen, onClose, compareList, onRemove }) {
  if (!isOpen || compareList.length === 0) return null;

  return (
    <div className="compare-drawer-container glass-panel">
      <div className="compare-drawer-header">
        <h3 className="flex items-center gap-2 font-display text-lg font-bold text-white">
          <GitCompare className="w-5 h-5 text-blue-400" /> Compare Planets ({compareList.length}/3)
        </h3>
        <button className="compare-close-btn" onClick={onClose}>
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="compare-drawer-body">
        {compareList.length < 2 && (
          <div className="compare-warning text-center text-sm py-4 text-cyan-400">
            Select at least 2 planets to compare side-by-side.
          </div>
        )}
        
        <div className="comparison-table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Parameters</th>
                {compareList.map(planet => (
                  <th key={planet.id} className="planet-header-cell">
                    <div className="planet-hdr-container">
                      <span className="planet-name-text">{planet.name}</span>
                      <button
                        className="remove-planet-btn"
                        onClick={() => onRemove(planet.id)}
                        title={`Remove ${planet.name}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="param-name">Type</td>
                {compareList.map(p => <td key={p.id}>{p.type}</td>)}
              </tr>
              <tr>
                <td className="param-name">Diameter</td>
                {compareList.map(p => <td key={p.id} className="highlighted-val">{p.diameter}</td>)}
              </tr>
              <tr>
                <td className="param-name">Gravity</td>
                {compareList.map(p => <td key={p.id}>{p.gravity}</td>)}
              </tr>
              <tr>
                <td className="param-name">Avg Temp</td>
                {compareList.map(p => <td key={p.id}>{p.temperature}</td>)}
              </tr>
              <tr>
                <td className="param-name">Distance</td>
                {compareList.map(p => <td key={p.id} className="text-xs">{p.distance}</td>)}
              </tr>
              <tr>
                <td className="param-name">Moons</td>
                {compareList.map(p => <td key={p.id}>{p.moons}</td>)}
              </tr>
              <tr>
                <td className="param-name">Orbit</td>
                {compareList.map(p => <td key={p.id}>{p.orbit}</td>)}
              </tr>
              <tr>
                <td className="param-name">Mass</td>
                {compareList.map(p => <td key={p.id} className="text-xs">{p.mass}</td>)}
              </tr>
              <tr>
                <td className="param-name">Atmosphere</td>
                {compareList.map(p => <td key={p.id} className="text-xs opacity-80">{p.atmosphere}</td>)}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <style jsx="true">{`
        .compare-drawer-container {
          position: fixed;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 95%;
          max-width: 900px;
          max-height: 50vh;
          border-radius: 20px 20px 0 0;
          border-bottom: none;
          z-index: 900;
          display: flex;
          flex-direction: column;
          box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.6);
          animation: slideUpDrawer 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes slideUpDrawer {
          from { transform: translate(-50%, 100%); }
          to { transform: translate(-50%, 0); }
        }

        .compare-drawer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          border-bottom: 1px solid var(--card-border);
        }

        .compare-close-btn {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          transition: color 0.3s;
        }

        .compare-close-btn:hover {
          color: white;
        }

        .compare-drawer-body {
          flex: 1;
          overflow-y: auto;
          padding: 1rem 1.5rem 1.5rem 1.5rem;
        }

        .comparison-table-wrapper {
          overflow-x: auto;
          scrollbar-width: thin;
        }

        .comparison-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .comparison-table th, 
        .comparison-table td {
          padding: 0.6rem 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          font-size: 0.9rem;
        }

        .comparison-table th {
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          border-bottom: 2px solid var(--card-border);
          color: var(--text-secondary);
        }

        .planet-header-cell {
          min-width: 150px;
        }

        .planet-hdr-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .planet-name-text {
          color: var(--highlight-color);
        }

        .remove-planet-btn {
          background: rgba(239, 68, 68, 0.15);
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: #ef4444;
          padding: 0.2rem;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .remove-planet-btn:hover {
          background: #ef4444;
          color: white;
        }

        .param-name {
          font-weight: 600;
          color: var(--text-secondary);
          min-width: 120px;
        }

        .highlighted-val {
          color: white;
          font-weight: 500;
        }

        @media (max-width: 600px) {
          .compare-drawer-container {
            width: 100%;
            max-height: 70vh;
            border-radius: 12px 12px 0 0;
          }
          
          .comparison-table th, 
          .comparison-table td {
            font-size: 0.8rem;
            padding: 0.4rem 0.6rem;
          }
        }
      `}</style>
    </div>
  );
}
