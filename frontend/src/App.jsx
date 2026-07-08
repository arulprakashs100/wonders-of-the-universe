import React, { useState, useEffect } from "react";
import { ArrowUp, Rocket } from "lucide-react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Starfield from "./components/Starfield";
import SearchModal from "./components/SearchModal";
import CompareDrawer from "./components/CompareDrawer";
import DetailPageModal from "./components/DetailPageModal";

// Pages
import Home from "./pages/Home";
import Planets from "./pages/Planets";
import Galaxies from "./pages/Galaxies";
import Stars from "./pages/Stars";
import Moons from "./pages/Moons";
import BlackHoles from "./pages/BlackHoles";
import Nebulae from "./pages/Nebulae";
import Missions from "./pages/Missions";
import Astronauts from "./pages/Astronauts";
import Timeline from "./pages/Timeline";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SolarSystem from "./pages/SolarSystem";
import PlanetDetail from "./pages/PlanetDetail";
import SunPage from "./pages/SunPage";
import KalamTribute from "./pages/KalamTribute";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedPlanetId, setSelectedPlanetId] = useState("earth");
  
  // Theme state
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("universe_theme");
    return saved || "dark";
  });

  // Favorites state
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("universe_favorites");
    return saved ? JSON.parse(saved) : [];
  });

  // Compare planet list
  const [compareList, setCompareList] = useState([]);
  
  // Modal states
  const [searchOpen, setSearchOpen] = useState(false);
  const [detailItem, setDetailItem] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Set theme on body element
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("universe_theme", theme);
  }, [theme]);

  // Initial loader countdown
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // 2.5s launch sequence
    return () => clearTimeout(timer);
  }, []);

  // Back to top scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  // Toggle favorite
  const handleToggleFavorite = (item) => {
    setFavorites(prev => {
      const exists = prev.some(f => f.id === item.id && f.category === item.category);
      let updated;
      if (exists) {
        updated = prev.filter(f => !(f.id === item.id && f.category === item.category));
      } else {
        updated = [...prev, item];
      }
      localStorage.setItem("universe_favorites", JSON.stringify(updated));
      return updated;
    });
  };

  // Compare Planet Handler
  const handleToggleCompare = (planet) => {
    setCompareList(prev => {
      const exists = prev.some(c => c.id === planet.id);
      if (exists) {
        return prev.filter(c => c.id !== planet.id);
      }
      if (prev.length >= 3) {
        alert("You can compare a maximum of 3 planets at a time.");
        return prev;
      }
      return [...prev, planet];
    });
  };

  const handleRemoveCompare = (planetId) => {
    setCompareList(prev => prev.filter(c => c.id !== planetId));
  };

  const handleSelectSearchResult = (item) => {
    // If the search result clicked is a planet, let's open its dedicated detail page directly!
    if (item.category === "Planet") {
      setSelectedPlanetId(item.id);
      setCurrentPage("planet-detail");
    } else if (item.id === "sun") {
      setCurrentPage("sun");
    } else {
      setDetailItem(item);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Render active page view
  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home setCurrentPage={setCurrentPage} onLearnMore={setDetailItem} />;
      case "solarsystem":
        return (
          <SolarSystem 
            onSelectPlanet={(planet) => {
              setSelectedPlanetId(planet.id);
              setCurrentPage("planet-detail");
            }}
            setCurrentPage={setCurrentPage}
          />
        );
      case "planets":
        return (
          <Planets
            onLearnMore={(item) => {
              setSelectedPlanetId(item.id);
              setCurrentPage("planet-detail");
            }}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            compareList={compareList}
            onToggleCompare={handleToggleCompare}
          />
        );
      case "planet-detail":
        return (
          <PlanetDetail 
            planetId={selectedPlanetId}
            onBack={() => setCurrentPage("solarsystem")}
          />
        );
      case "sun":
        return (
          <SunPage 
            onBack={() => setCurrentPage("solarsystem")}
          />
        );
      case "galaxies":
        return <Galaxies onLearnMore={setDetailItem} />;
      case "stars":
        return <Stars onLearnMore={setDetailItem} />;
      case "moons":
        return <Moons onLearnMore={setDetailItem} />;
      case "blackholes":
        return <BlackHoles onLearnMore={setDetailItem} />;
      case "nebulae":
        return <Nebulae onLearnMore={setDetailItem} />;
      case "missions":
        return <Missions onLearnMore={setDetailItem} favorites={favorites} onToggleFavorite={handleToggleFavorite} />;
      case "astronauts":
        return <Astronauts onLearnMore={setDetailItem} favorites={favorites} onToggleFavorite={handleToggleFavorite} />;
      case "timeline":
        return <Timeline />;
      case "about":
        return <About />;
      case "contact":
        return <Contact />;
      case "kalam":
        return <KalamTribute />;
      default:
        return <Home setCurrentPage={setCurrentPage} onLearnMore={setDetailItem} />;
    }
  };

  if (loading) {
    return (
      <div className="rocket-loader">
        <div className="rocket-wrapper">
          <Rocket className="rocket-icon" />
          <div className="rocket-fire" />
        </div>
        <h2 className="loader-text font-display">PREPARING LIFTOFF</h2>
        <p className="text-sm text-cyan-400 font-mono">Loading Space Telemetry...</p>
        <div className="loader-bar">
          <div className="loader-progress" />
        </div>
      </div>
    );
  }

  return (
    <div className="app-layout">
      {/* Canvas background starfield */}
      <Starfield theme={theme} />

      {/* Global Navigation header */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        theme={theme}
        toggleTheme={toggleTheme}
        onSearchOpen={() => setSearchOpen(true)}
        favoritesCount={favorites.length}
      />

      {/* Page Content Body */}
      <main className="main-content-layout">
        {renderPage()}
      </main>

      {/* Global comparison drawer (only visible on planets page when compare items are present) */}
      <CompareDrawer
        isOpen={currentPage === "planets" && compareList.length > 0}
        onClose={() => setCompareList([])}
        compareList={compareList}
        onRemove={handleRemoveCompare}
      />

      {/* Global overlays */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectResult={handleSelectSearchResult}
      />

      <DetailPageModal
        item={detailItem}
        isOpen={detailItem !== null}
        onClose={() => setDetailItem(null)}
        isFavorite={detailItem && favorites.some(f => f.id === detailItem.id && f.category === detailItem.category)}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* Global Footer */}
      {currentPage !== "solarsystem" && <Footer setCurrentPage={setCurrentPage} />}

      {/* Floating scroll action */}
      <button
        className={`back-to-top ${showScrollTop ? "visible" : ""}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      <style jsx="true">{`
        .app-layout {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .main-content-layout {
          flex: 1;
          position: relative;
          z-index: 10;
        }
      `}</style>
    </div>
  );
}
