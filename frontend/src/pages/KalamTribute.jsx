import React, { useState } from "react";
import { Award, Compass, Star, Sparkles, BookOpen, Shield } from "lucide-react";

export default function KalamTribute() {
  const [activeTab, setActiveTab] = useState("rocket");

  const quotes = [
    "Dream, dream, dream. Dreams transform into thoughts and thoughts result in action.",
    "If you want to shine like a sun, first burn like a sun.",
    "Failure will never overtake me if my determination to succeed is strong enough.",
    "To succeed in your mission, you must have single-minded devotion to your goal.",
    "Great dreams of great dreamers are always transcended."
  ];

  return (
    <div className="kalam-tribute-page container">
      {/* Header Profile Hero */}
      <div className="kalam-hero-card glass-panel text-center">
        <div className="kalam-avatar-initials flex-center font-display mx-auto mb-4">AK</div>
        <span className="tag-badge text-yellow-400 border-yellow-400">Bharat Ratna Laureate</span>
        <h1 className="kalam-title font-display text-white mt-3">Dr. A.P.J. Abdul Kalam</h1>
        <p className="kalam-tagline font-display text-cyan-400 uppercase tracking-widest text-sm mt-1">
          The Missile Man & Pioneer of Indian Rocketry
        </p>
        <p className="kalam-intro-p text-secondary max-w-2xl mx-auto mt-4 text-sm leading-relaxed">
          Avul Pakir Jainulabdeen Abdul Kalam was an Indian aerospace scientist and statesman who served as the 11th President of India. Over a spanning career at ISRO and DRDO, he directed the development of India's first launch vehicle (SLV-III) and guided strategic defensive capabilities.
        </p>
      </div>

      {/* Tabs Controller */}
      <div className="kalam-tabs-bar flex-center gap-2 mt-8">
        <button
          className={`tab-btn font-display flex items-center gap-2 ${activeTab === "rocket" ? "active" : ""}`}
          onClick={() => setActiveTab("rocket")}
        >
          <Compass className="w-4 h-4" /> Space Rocketry
        </button>
        <button
          className={`tab-btn font-display flex items-center gap-2 ${activeTab === "defense" ? "active" : ""}`}
          onClick={() => setActiveTab("defense")}
        >
          <Shield className="w-4 h-4" /> Defense & Missiles
        </button>
        <button
          className={`tab-btn font-display flex items-center gap-2 ${activeTab === "life" ? "active" : ""}`}
          onClick={() => setActiveTab("life")}
        >
          <BookOpen className="w-4 h-4" /> Life & Presidency
        </button>
      </div>

      {/* Tab Panels */}
      <div className="kalam-panel-content mt-6">
        
        {/* TAB 1: ROCKETRY */}
        {activeTab === "rocket" && (
          <div className="kalam-tab-grid animate-fade">
            <div className="kalam-content-card glass-card">
              <h3 className="card-hdr font-display text-white flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-yellow-400" /> SLV-III: India's First Rocket
              </h3>
              <p className="text-secondary text-sm leading-relaxed">
                Dr. Kalam was appointed as the Project Director for the development of India's first indigenous Satellite Launch Vehicle (SLV-III). Under his leadership, the project achieved critical milestones, developing complex solid propellant technologies. In July 1980, the SLV-III successfully launched the **Rohini-1 satellite** into orbit, establishing India as the sixth member of the elite global space club.
              </p>
              <div className="kalam-specs-bullet mt-4 flex flex-col gap-2">
                <div className="spec-bullet flex gap-2 items-start text-xs text-gray-300">
                  <span className="bullet-dot">•</span>
                  <span><strong>Project SLV-III:</strong> Started from early designs at Thumba equatorial station, culminating in 1980 orbital deployment.</span>
                </div>
                <div className="spec-bullet flex gap-2 items-start text-xs text-gray-300">
                  <span className="bullet-dot">•</span>
                  <span><strong>Rohini Satellite:</strong> Successfully tracked and monitored, verifying Indian-made propulsion and telemetry.</span>
                </div>
              </div>
            </div>

            <div className="kalam-content-card glass-card">
              <h3 className="card-hdr font-display text-white flex items-center gap-2 mb-3">
                <Star className="w-5 h-5 text-cyan-400" /> Creating ISRO's Foundation
              </h3>
              <p className="text-secondary text-sm leading-relaxed">
                Early in his career, Dr. Kalam worked under the mentorship of Dr. Vikram Sarabhai. He was part of the Indian National Committee for Space Research (INCOSPAR) and helped establish the Thumba Equatorial Rocket Launching Station (TERLS) in Kerala. He carried rocket parts on bicycles and bullock carts during the pioneering phase of Indian space exploration.
              </p>
              <div className="kalam-specs-bullet mt-4 flex flex-col gap-2">
                <div className="spec-bullet flex gap-2 items-start text-xs text-gray-300">
                  <span className="bullet-dot">•</span>
                  <span><strong>Sounding Rockets:</strong> Conducted early propellant mixes and telemetry test integrations.</span>
                </div>
                <div className="spec-bullet flex gap-2 items-start text-xs text-gray-300">
                  <span className="bullet-dot">•</span>
                  <span><strong>International Liaison:</strong> Visited NASA's Wallops Island flight center to study sounding rocket launchers.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DEFENSE */}
        {activeTab === "defense" && (
          <div className="kalam-tab-grid animate-fade">
            <div className="kalam-content-card glass-card">
              <h3 className="card-hdr font-display text-white flex items-center gap-2 mb-3">
                <Shield className="w-5 h-5 text-red-400" /> The IGMDP Program
              </h3>
              <p className="text-secondary text-sm leading-relaxed">
                As chief of the Integrated Guided Missile Development Programme (IGMDP) at DRDO, Dr. Kalam directed the conceptualization and development of a family of indigenous strategic missiles, making India self-reliant in critical missile defense technologies.
              </p>
              <div className="kalam-specs-bullet mt-4 flex flex-col gap-3">
                <div className="spec-bullet flex gap-2 items-start text-xs text-gray-300">
                  <span className="badge-bullet red font-display font-bold">AGNI</span>
                  <span>Intermediate-to-intercontinental range ballistic missile system, demonstrating re-entry heat shield capabilities.</span>
                </div>
                <div className="spec-bullet flex gap-2 items-start text-xs text-gray-300">
                  <span className="badge-bullet orange font-display font-bold">PRITHVI</span>
                  <span>Surface-to-surface tactical battlefield missile system, utilizing indigenous liquid propulsion technologies.</span>
                </div>
              </div>
            </div>

            <div className="kalam-content-card glass-card">
              <h3 className="card-hdr font-display text-white flex items-center gap-2 mb-3">
                <Award className="w-5 h-5 text-yellow-400" /> Scientific Leadership & Pokhran-II
              </h3>
              <p className="text-secondary text-sm leading-relaxed">
                Dr. Kalam served as the Scientific Adviser to the Defense Minister and Director-General of DRDO. He was the Chief Scientific Adviser to the Prime Minister during the historic **Pokhran-II nuclear tests** in 1998, working alongside Dr. R. Chidambaram, establishing India as a nuclear weapons state.
              </p>
              <div className="kalam-specs-bullet mt-4 flex flex-col gap-2">
                <div className="spec-bullet flex gap-2 items-start text-xs text-gray-300">
                  <span className="bullet-dot">•</span>
                  <span><strong>Pokhran-II (1998):</strong> Supervised the field operations and scientific validation in the Rajasthan desert.</span>
                </div>
                <div className="spec-bullet flex gap-2 items-start text-xs text-gray-300">
                  <span className="bullet-dot">•</span>
                  <span><strong>Kalam-Raju Stent:</strong> Collaborated in 1998 to design a low-cost coronary stent, lowering healthcare costs.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: LIFE & PRESIDENCY */}
        {activeTab === "life" && (
          <div className="kalam-tab-grid animate-fade">
            <div className="kalam-content-card glass-card">
              <h3 className="card-hdr font-display text-white flex items-center gap-2 mb-3">
                <BookOpen className="w-5 h-5 text-purple-400" /> The People's President
              </h3>
              <p className="text-secondary text-sm leading-relaxed">
                In 2002, Dr. Kalam was elected as the 11th President of India with overwhelming support. Known affectionately as the 'People's President', he transformed the Rashtrapati Bhavan into an open center of interaction, meeting hundreds of thousands of students and youth during his tenure to ignite their minds.
              </p>
              <div className="kalam-specs-bullet mt-4 flex flex-col gap-2">
                <div className="spec-bullet flex gap-2 items-start text-xs text-gray-300">
                  <span className="bullet-dot">•</span>
                  <span><strong>Vision 2020:</strong> Proposed a roadmap to transform India into a developed nation by 2020.</span>
                </div>
                <div className="spec-bullet flex gap-2 items-start text-xs text-gray-300">
                  <span className="bullet-dot">•</span>
                  <span><strong>Writing & Legacy:</strong> Authored legendary books including 'Wings of Fire', 'Ignited Minds', and 'India 2020'.</span>
                </div>
              </div>
            </div>

            <div className="kalam-content-card glass-card">
              <h3 className="card-hdr font-display text-white flex items-center gap-2 mb-3">
                <Star className="w-5 h-5 text-yellow-400" /> Honours & Invaluable Legacy
              </h3>
              <p className="text-secondary text-sm leading-relaxed">
                Dr. Kalam received honorary doctorates from over 40 universities. The Government of India honored him with the **Padma Bhushan** (1981), **Padma Vibhushan** (1990), and India's highest civilian award, the **Bharat Ratna** (1997), for his stellar contributions to scientific research and modernization of defense technology.
              </p>
              <div className="kalam-specs-bullet mt-4 flex flex-col gap-2">
                <div className="spec-bullet flex gap-2 items-start text-xs text-gray-300">
                  <span className="bullet-dot">•</span>
                  <span><strong>October 15:</strong> Declared World Students' Day by the UN in honor of Dr. Kalam's birthday.</span>
                </div>
                <div className="spec-bullet flex gap-2 items-start text-xs text-gray-300">
                  <span className="bullet-dot">•</span>
                  <span><strong>Passing:</strong> Passed away on July 27, 2015, while lecturing students at IIM Shillong.</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Inspirational Quotes Ticker */}
      <div className="kalam-quotes-panel glass-panel p-6 rounded-[20px] mt-8 text-center">
        <h4 className="text-xs font-display text-yellow-400 uppercase tracking-widest mb-3">Words of Wisdom</h4>
        <div className="quotes-stack flex flex-col gap-3">
          {quotes.map((q, idx) => (
            <p key={idx} className="quote-text text-sm text-gray-200 italic leading-relaxed">
              "{q}"
            </p>
          ))}
        </div>
      </div>

      <style jsx="true">{`
        .kalam-tribute-page {
          padding-top: 100px;
          padding-bottom: 5rem;
        }

        .kalam-hero-card {
          padding: 2.5rem;
          border-radius: 20px;
          position: relative;
        }

        .kalam-avatar-initials {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
          color: white;
          font-size: 2.2rem;
          font-weight: 800;
          border: 3px solid rgba(255,255,255,0.15);
          box-shadow: 0 0 25px rgba(34, 211, 238, 0.4);
        }

        .kalam-title {
          font-size: 2.5rem;
          font-weight: 900;
          letter-spacing: -0.5px;
        }

        /* Tab Buttons */
        .kalam-tabs-bar {
          background: rgba(15,23,42,0.45);
          border: 1px solid var(--card-border);
          padding: 6px;
          border-radius: 30px;
          max-width: 600px;
          margin: 0 auto;
        }

        .tab-btn {
          flex: 1;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          padding: 0.6rem 1.25rem;
          border-radius: 24px;
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          text-transform: uppercase;
        }

        .tab-btn:hover {
          color: white;
          background: rgba(255,255,255,0.05);
        }

        .tab-btn.active {
          background: var(--primary-color);
          color: white;
          box-shadow: 0 4px 15px rgba(var(--primary-rgb), 0.35);
        }

        /* Grid */
        .kalam-tab-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .kalam-content-card {
          padding: 2rem;
          height: 100%;
        }

        .card-hdr {
          font-size: 1.2rem;
          font-weight: 700;
        }

        .bullet-dot {
          color: var(--highlight-color);
          font-size: 1.2rem;
          line-height: 1;
        }

        .badge-bullet {
          padding: 0.15rem 0.5rem;
          font-size: 0.6rem;
          color: white;
          border-radius: 4px;
          letter-spacing: 0.5px;
          flex-shrink: 0;
        }

        .badge-bullet.red { background: #ef4444; }
        .badge-bullet.orange { background: #f97316; }

        .kalam-quotes-panel {
          background: rgba(15, 23, 42, 0.45);
        }

        .quotes-stack p {
          border-bottom: 1px dashed rgba(255,255,255,0.03);
          padding-bottom: 0.75rem;
        }

        .quotes-stack p:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade {
          animation: fadeIn 0.4s ease forwards;
        }

        @media (max-width: 768px) {
          .kalam-tabs-bar {
            flex-direction: column;
            border-radius: 16px;
          }
          .tab-btn {
            width: 100%;
          }
          .kalam-tab-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
