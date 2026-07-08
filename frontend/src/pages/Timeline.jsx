import React, { useEffect, useRef } from "react";
import { Star, Rocket, Orbit, Globe, Compass, Telescope, Award } from "lucide-react";

export default function Timeline() {
  const timelineData = [
    {
      year: "1957",
      title: "Sputnik 1 Launched",
      event: "First Artificial Satellite",
      agency: "Soviet Union (USSR)",
      desc: "The Space Age began on October 4, 1957, when Sputnik 1 was launched, orbiting Earth in 96 minutes and transmitting radio 'beeps'.",
      icon: <Orbit className="w-5 h-5 text-cyan-400" />
    },
    {
      year: "1961",
      title: "First Human in Space",
      event: "Vostok 1 Flight",
      agency: "Soviet Union (USSR)",
      desc: "Cosmonaut Yuri Gagarin made history on April 12, 1961, by orbiting Earth in his Vostok 1 spacecraft, proving humans could survive space.",
      icon: <Globe className="w-5 h-5 text-blue-400" />
    },
    {
      year: "1969",
      title: "First Moon Landing",
      event: "Apollo 11 Mission",
      agency: "NASA (United States)",
      desc: "Neil Armstrong and Buzz Aldrin stepped onto the Moon's surface on July 20, 1969, taking the historic first steps on another world.",
      icon: <Award className="w-5 h-5 text-yellow-400" />
    },
    {
      year: "2008",
      title: "Chandrayaan-1 Launch",
      event: "India's First Lunar Probe",
      agency: "ISRO (India) - Oct 22, 2008",
      desc: "India launched its maiden lunar mission Chandrayaan-1. The spacecraft successfully orbited the Moon and confirmed the ground-breaking discovery of water molecules on the lunar surface.",
      icon: <Telescope className="w-5 h-5 text-cyan-400 animate-pulse" />
    },
    {
      year: "2013",
      title: "Mangalyaan Launch",
      event: "Mars Orbiter Mission",
      agency: "ISRO (India) - Nov 5, 2013",
      desc: "India successfully launched its Mars Orbiter Mission, Mangalyaan, entering Martian orbit in September 2014 on its very first attempt.",
      icon: <Compass className="w-5 h-5 text-orange-400" />
    },
    {
      year: "2019",
      title: "Chandrayaan-2 Launch",
      event: "Lunar Topography Mission",
      agency: "ISRO (India) - July 22, 2019",
      desc: "ISRO launched Chandrayaan-2 to map the lunar surface. The advanced orbiter continues to map the surface, studying mineral distributions.",
      icon: <Orbit className="w-5 h-5 text-pink-400" />
    },
    {
      year: "2021",
      title: "JWST Launched",
      event: "Next-Gen Space Telescope",
      agency: "NASA / ESA / CSA",
      desc: "The James Webb Space Telescope opened its gold mirrors at L2, sending back the deepest infrared views of the early universe.",
      icon: <Telescope className="w-5 h-5 text-purple-400" />
    },
    {
      year: "2023",
      title: "Chandrayaan-3 Launch",
      event: "Historic Moon Landing",
      agency: "ISRO (India) - July 14, 2023",
      desc: "India launched Chandrayaan-3. On August 23, 2023, the Vikram lander soft-landed near the lunar South Pole, making India the first nation to reach the South Pole.",
      icon: <Rocket className="w-5 h-5 text-emerald-400 animate-bounce" />
    },
    {
      year: "2023",
      title: "Aditya-L1 Solar Mission",
      event: "Solar Corona Observatory",
      agency: "ISRO (India) - Sept 2, 2023",
      desc: "India launched Aditya-L1, its first solar observatory, placing it in a halo orbit around Lagrange Point L1 to observe solar storms.",
      icon: <Star className="w-5 h-5 text-yellow-400" />
    },
    {
      year: "TRIBUTE",
      title: "Dr. A.P.J. Abdul Kalam",
      event: "Pioneer of Indian Rocketry",
      agency: "ISRO Core Legacy",
      desc: "Dr. A.P.J. Abdul Kalam, the 'Missile Man of India' and 11th President, directed the development of India's first satellite launch vehicle (SLV-III) which placed the Rohini satellite in orbit in 1980. His early leadership laid the foundations for India's space launching capabilities and inspired generations of aerospace engineers.",
      icon: <Award className="w-5 h-5 text-yellow-500" />
    }
  ];

  const observerRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-active");
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll(".timeline-item");
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="timeline-page-container container" ref={observerRef}>
      <div className="page-header text-center">
        <h1 className="page-title font-display gradient-text">Space Exploration Timeline</h1>
        <p className="page-subtitle font-display">Trace the key steps of humanity's journey to leave Earth, featuring India's landmark achievements.</p>
      </div>

      <div className="timeline-track-wrapper">
        {/* Vertical Center Track Line */}
        <div className="timeline-center-line" />

        {/* Timeline Items */}
        <div className="timeline-items-list">
          {timelineData.map((item, idx) => {
            const isLeft = idx % 2 === 0;

            return (
              <div 
                key={idx} 
                className={`timeline-item ${isLeft ? "left-aligned" : "right-aligned"}`}
              >
                {/* Center Node Dot */}
                <div className="timeline-node glass-panel">
                  {item.icon}
                </div>

                {/* Event Card */}
                <div className="timeline-card-wrapper">
                  <div className="timeline-card glass-card">
                    <div className="card-header-row">
                      <span className="event-year">{item.year}</span>
                      <span className="event-agency">{item.agency}</span>
                    </div>
                    <h3 className="event-title font-display">{item.title}</h3>
                    <h4 className="event-subtitle font-display">{item.event}</h4>
                    <p className="event-desc">{item.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx="true">{`
        .timeline-page-container {
          padding-top: 110px;
          display: flex;
          flex-direction: column;
          gap: 3rem;
          padding-bottom: 5rem;
        }

        .page-header {
          margin-bottom: 2rem;
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

        /* Timeline Track */
        .timeline-track-wrapper {
          position: relative;
          width: 100%;
          max-width: 900px;
          margin: 0 auto;
        }

        .timeline-center-line {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, 
            var(--primary-color) 0%, 
            var(--accent-color) 50%, 
            var(--highlight-color) 100%
          );
          box-shadow: 0 0 10px rgba(var(--primary-rgb), 0.5);
          pointer-events: none;
        }

        .timeline-items-list {
          display: flex;
          flex-direction: column;
          gap: 3.5rem;
        }

        .timeline-item {
          display: flex;
          width: 100%;
          position: relative;
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s cubic-bezier(0.215, 0.610, 0.355, 1), 
                      transform 0.8s cubic-bezier(0.215, 0.610, 0.355, 1);
        }

        .timeline-item.reveal-active {
          opacity: 1;
          transform: translateY(0);
        }

        .timeline-node {
          position: absolute;
          left: 50%;
          transform: translate(-50%, 20px);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10;
          background: var(--bg-color);
          border: 2px solid var(--card-border);
          box-shadow: 0 0 15px rgba(var(--primary-rgb), 0.25);
        }

        .timeline-item.reveal-active .timeline-node {
          border-color: var(--highlight-color);
          box-shadow: 0 0 20px rgba(var(--highlight-rgb), 0.6);
        }

        .timeline-card-wrapper {
          width: 45%;
        }

        .left-aligned {
          justify-content: flex-start;
        }

        .right-aligned {
          justify-content: flex-end;
        }

        /* Timeline Card customization */
        .timeline-card {
          padding: 1.5rem;
          border-radius: 16px;
        }

        .card-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
          font-size: 0.8rem;
        }

        .event-year {
          background: var(--tag-bg);
          color: var(--primary-color);
          font-weight: 800;
          font-size: 0.9rem;
          padding: 0.2rem 0.6rem;
          border-radius: 6px;
        }

        .event-agency {
          color: var(--text-secondary);
          font-weight: 600;
        }

        .event-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.15rem;
        }

        .event-subtitle {
          font-size: 0.9rem;
          color: var(--highlight-color);
          font-weight: 600;
          margin-bottom: 0.75rem;
        }

        .event-desc {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        /* Connect lines indicators for desktop */
        .timeline-card::after {
          content: '';
          position: absolute;
          top: 30px;
          width: 0;
          height: 0;
          border-style: solid;
        }

        .left-aligned .timeline-card::after {
          right: -10px;
          border-width: 8px 0 8px 10px;
          border-color: transparent transparent transparent var(--card-border);
        }

        .right-aligned .timeline-card::after {
          left: -10px;
          border-width: 8px 10px 8px 0;
          border-color: transparent var(--card-border) transparent transparent;
        }

        @media (max-width: 768px) {
          .timeline-center-line {
            left: 20px;
          }

          .timeline-node {
            left: 20px;
            transform: translate(-50%, 15px);
            width: 36px;
            height: 36px;
          }

          .timeline-card-wrapper {
            width: calc(100% - 45px);
            margin-left: 45px;
          }

          .left-aligned, .right-aligned {
            justify-content: flex-start;
          }

          .left-aligned .timeline-card::after,
          .right-aligned .timeline-card::after {
            left: -10px;
            right: auto;
            border-width: 8px 10px 8px 0;
            border-color: transparent var(--card-border) transparent transparent;
          }
        }
      `}</style>
    </div>
  );
}
