import React, { useState } from "react";
import { Search, Sun, Moon, Menu, X, Orbit, Heart } from "lucide-react";

export default function Navbar({ currentPage, setCurrentPage, theme, toggleTheme, onSearchOpen, favoritesCount }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "solarsystem", label: "Solar System" },
    { id: "planets", label: "Planets" },
    { id: "sun", label: "The Sun" },
    { id: "galaxies", label: "Galaxies" },
    { id: "stars", label: "Stars" },
    { id: "blackholes", label: "Black Holes" },
    { id: "missions", label: "Missions" },
    { id: "astronauts", label: "Astronauts" },
    { id: "kalam", label: "Dr. Kalam" },
    { id: "timeline", label: "Timeline" },
  ];

  const handleNavClick = (id) => {
    setCurrentPage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="navbar-fixed glass-panel">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo" onClick={() => handleNavClick("home")}>
          <Orbit className="w-6 h-6 text-blue-400 logo-icon float-element" />
          <span className="logo-text font-display">
            WONDERS<span className="text-blue-400">OF THE</span>UNIVERSE
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <ul className="navbar-links">
          {navItems.map(item => (
            <li key={item.id}>
              <button
                className={`nav-link-btn ${currentPage === item.id ? "active" : ""}`}
                onClick={() => handleNavClick(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Right Actions */}
        <div className="navbar-actions">
          {/* Search Trigger */}
          <button 
            className="action-icon-btn" 
            onClick={onSearchOpen}
            title="Search the universe"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Theme Toggle */}
          <button 
            className="action-icon-btn" 
            onClick={toggleTheme}
            title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>

          {/* Favorites shortcut counter */}
          {favoritesCount > 0 && (
            <button 
              className="action-icon-btn fav-shortcut-btn"
              onClick={() => handleNavClick("astronauts")}
              title={`You have ${favoritesCount} favorites`}
            >
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span className="fav-count-badge flex-center">{favoritesCount}</span>
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="action-icon-btn mobile-menu-btn" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Drawer */}
      <div className={`mobile-nav-drawer glass-panel ${mobileMenuOpen ? "open" : ""}`}>
        <div className="drawer-header">
          <Orbit className="w-6 h-6 text-blue-400" />
          <button className="drawer-close" onClick={() => setMobileMenuOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>
        <ul className="drawer-links">
          {navItems.map(item => (
            <li key={item.id}>
              <button
                className={`drawer-link-btn ${currentPage === item.id ? "active" : ""}`}
                onClick={() => handleNavClick(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <style jsx="true">{`
        .navbar-fixed {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 52px; /* Small, sleek height */
          z-index: 800;
          display: flex;
          align-items: center;
          border-top: none;
          border-left: none;
          border-right: none;
          border-bottom: 1px solid var(--card-border);
        }

        .navbar-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
        }

        .logo-icon {
          animation: float 4s ease-in-out infinite;
          width: 22px;
          height: 22px;
        }

        .logo-text {
          font-size: 0.9rem;
          font-weight: 800;
          letter-spacing: 1.5px;
          color: var(--text-color);
        }

        .navbar-links {
          display: flex;
          list-style: none;
          gap: 0.95rem;
        }

        .nav-link-btn {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          font-size: 0.75rem;
          cursor: pointer;
          position: relative;
          padding: 0.25rem 0;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          transition: color 0.3s;
        }

        .nav-link-btn:hover {
          color: var(--text-color);
        }

        .nav-link-btn::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--primary-color), var(--highlight-color));
          transition: width 0.3s ease;
        }

        .nav-link-btn.active {
          color: var(--highlight-color);
          text-shadow: 0 0 10px rgba(var(--highlight-rgb), 0.3);
        }

        .nav-link-btn.active::after {
          width: 100%;
        }

        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .action-icon-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--card-border);
          color: var(--text-color);
          width: 32px; /* Smaller action buttons */
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.3s;
          position: relative;
        }

        .action-icon-btn:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: var(--primary-color);
          transform: translateY(-1px);
        }

        .fav-shortcut-btn {
          border-color: rgba(239, 68, 68, 0.3);
        }

        .fav-shortcut-btn:hover {
          border-color: #ef4444;
          background: rgba(239, 68, 68, 0.1);
        }

        .fav-count-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background: #ef4444;
          color: white;
          font-size: 0.6rem;
          font-weight: 700;
          width: 15px;
          height: 15px;
          border-radius: 50%;
          border: 1.5px solid var(--bg-color);
        }

        .mobile-menu-btn {
          display: none;
        }

        /* Mobile Menu Drawer */
        .mobile-nav-drawer {
          position: fixed;
          top: 0;
          right: -300px;
          width: 280px;
          height: 100vh;
          z-index: 900;
          display: flex;
          flex-direction: column;
          padding: 2rem;
          transition: right 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          border-top: none;
          border-right: none;
          border-bottom: none;
          border-left: 1px solid var(--card-border);
        }

        .mobile-nav-drawer.open {
          right: 0;
        }

        .drawer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .drawer-close {
          background: transparent;
          border: none;
          color: var(--text-color);
          cursor: pointer;
        }

        .drawer-links {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          list-style: none;
        }

        .drawer-link-btn {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          width: 100%;
          text-align: left;
          transition: color 0.3s;
        }

        .drawer-link-btn:hover,
        .drawer-link-btn.active {
          color: var(--highlight-color);
        }

        @media (max-width: 1200px) {
          .navbar-links {
            display: none;
          }

          .mobile-menu-btn {
            display: flex;
          }
        }

        @media (max-width: 500px) {
          .logo-text {
            font-size: 0.8rem;
            letter-spacing: 1px;
          }
          .navbar-container {
            padding: 0 0.75rem;
          }
        }
      `}</style>
    </nav>
  );
}
