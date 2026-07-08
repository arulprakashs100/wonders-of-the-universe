import React, { useState } from "react";
import { Send, MapPin, Mail, Phone, ChevronDown, Sparkles } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    {
      q: "What is the difference between terrestrial planets and gas giants?",
      a: "Terrestrial planets (Mercury, Venus, Earth, Mars) are composed mostly of rock and metals, have solid surfaces, and are closer to the Sun. Gas and Ice Giants (Jupiter, Saturn, Uranus, Neptune) are composed mostly of hydrogen, helium, water, ammonia, and methane, lack solid surfaces, and are located in the outer Solar System."
    },
    {
      q: "What is the 'Goldilocks Zone' mentioned in Earth's details?",
      a: "The habitable zone, colloquially called the Goldilocks Zone, is the range of orbits around a star where a planetary surface can support liquid water given sufficient atmospheric pressure. Earth sits perfectly within this zone around the Sun."
    },
    {
      q: "How does the Event Horizon Telescope capture a black hole image?",
      a: "The Event Horizon Telescope (EHT) links radio dishes across the globe to create an Earth-sized interferometer. By synchronizing atomic clocks and gathering petabytes of raw data, scientists reconstruct the shadow of a black hole accretion disk."
    },
    {
      q: "What is the timeline target for the Artemis Program?",
      a: "The Artemis Program aims to fly crewed missions around the Moon (Artemis II) by late 2025/2026, followed by landing astronauts near the lunar south pole (Artemis III) using the Space Launch System and SpaceX's Starship HLS."
    }
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert(`Transmission Received! Thank you, ${formData.name}. Mission control will respond shortly.`);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="contact-page-container container">
      <div className="page-header text-center">
        <h1 className="page-title font-display gradient-text">Contact Mission Control</h1>
        <p className="page-subtitle">Have questions about astronomical stats or suggestions for new deep space grids? Reach out below.</p>
      </div>

      <div className="contact-grid">
        {/* Left column: Contact Info & Map placeholder */}
        <div className="contact-left-col flex flex-col gap-6">
          <div className="contact-info-panel glass-panel">
            <h3 className="section-title font-display">Orbital Coordinates</h3>
            
            <div className="info-items-list flex flex-col gap-4">
              <div className="info-item-row flex items-center gap-3">
                <div className="icon-wrapper flex-center glass-panel">
                  <MapPin className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="meta">
                  <span className="label">Headquarters</span>
                  <p className="val">NASA Kennedy Space Center, Florida, USA</p>
                </div>
              </div>

              <div className="info-item-row flex items-center gap-3">
                <div className="icon-wrapper flex-center glass-panel">
                  <Mail className="w-5 h-5 text-blue-400" />
                </div>
                <div className="meta">
                  <span className="label">Telemetry Mail</span>
                  <p className="val">contact@wonders-universe.space</p>
                </div>
              </div>

              <div className="info-item-row flex items-center gap-3">
                <div className="icon-wrapper flex-center glass-panel">
                  <Phone className="w-5 h-5 text-purple-400" />
                </div>
                <div className="meta">
                  <span className="label">Sub-space Comms</span>
                  <p className="val">+1 (321) 867-5000 (Spaceport)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Vector Grid Blueprint */}
          <div className="map-blueprint-panel glass-panel flex-center flex-col">
            <svg viewBox="0 0 100 60" className="blueprint-svg w-full max-w-xs opacity-40">
              {/* Radial sonar grid circles */}
              <circle cx="50" cy="30" r="28" fill="none" stroke="var(--primary-color)" strokeWidth="0.25" strokeDasharray="1,2" />
              <circle cx="50" cy="30" r="18" fill="none" stroke="var(--primary-color)" strokeWidth="0.25" strokeDasharray="1,1" />
              <circle cx="50" cy="30" r="8" fill="none" stroke="var(--primary-color)" strokeWidth="0.25" />
              
              {/* Coordinate axis */}
              <line x1="5" y1="30" x2="95" y2="30" stroke="var(--primary-color)" strokeWidth="0.15" />
              <line x1="50" y1="5" x2="50" y2="55" stroke="var(--primary-color)" strokeWidth="0.15" />
              
              {/* Radar sweeps */}
              <line x1="50" y1="30" x2="72" y2="12" stroke="var(--highlight-color)" strokeWidth="0.5" />
              
              {/* Glowing core location target */}
              <circle cx="50" cy="30" r="2" fill="var(--highlight-color)" />
              <circle cx="50" cy="30" r="4" fill="none" stroke="var(--highlight-color)" strokeWidth="0.5" className="animate-ping" />
            </svg>
            <div className="blueprint-text text-center mt-3">
              <span className="font-display text-xs text-white uppercase tracking-wider block font-bold">Kennedy Space Center Radar Track</span>
              <span className="text-[10px] text-cyan-400 font-mono">LAT: 28.5721° N | LON: 80.6480° W</span>
            </div>
          </div>
        </div>

        {/* Right column: Form */}
        <div className="contact-right-col">
          <form className="contact-form-panel glass-panel" onSubmit={handleFormSubmit}>
            <h3 className="section-title font-display flex items-center gap-2">
              <Send className="w-4 h-4 text-cyan-400" /> Dispatch Transmission
            </h3>

            <div className="form-grid">
              <div className="form-group">
                <label className="input-label">Astronaut Name</label>
                <input
                  type="text"
                  required
                  className="input-field"
                  placeholder="Yuri Gagarin"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="input-label">Communication Frequency (Email)</label>
                <input
                  type="email"
                  required
                  className="input-field"
                  placeholder="explorer@nasa.gov"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="input-label">Signal Subject</label>
                <input
                  type="text"
                  required
                  className="input-field"
                  placeholder="Planetary comparison suggestions"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="input-label">Encrypted Message</label>
                <textarea
                  required
                  className="input-field textarea-field"
                  placeholder="Type your message to mission control here..."
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>
            </div>

            <button type="submit" className="btn-gradient submit-btn mt-6">
              Send Signal <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <section className="faq-section mt-12">
        <h2 className="section-title-faq font-display text-center flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-yellow-400" /> Frequently Asked Questions
        </h2>
        <p className="section-subtitle-faq text-center mb-8">Basic guide answers regarding cosmic specifications and planetary systems.</p>

        <div className="faq-accordion-list flex flex-col gap-3 max-w-3xl mx-auto">
          {faqs.map((faq, idx) => {
            const isActive = activeFaq === idx;

            return (
              <div key={idx} className="faq-item-card glass-panel">
                <button
                  className="faq-question-trigger flex justify-between items-center w-full text-left"
                  onClick={() => setActiveFaq(isActive ? null : idx)}
                >
                  <span className="faq-question font-display font-semibold text-white">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isActive ? "rotate-185" : ""}`} />
                </button>
                <div className={`faq-answer-wrapper ${isActive ? "expanded" : ""}`}>
                  <p className="faq-answer text-secondary">{faq.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <style jsx="true">{`
        .contact-page-container {
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
          max-width: 700px;
          margin: 0 auto;
        }

        /* Layout Grid */
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 2rem;
        }

        .contact-left-col, .contact-right-col {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .contact-info-panel, .contact-form-panel, .map-blueprint-panel {
          padding: 2rem;
          border-radius: 16px;
        }

        .section-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--highlight-color);
          margin-bottom: 1.5rem;
          border-bottom: 1px solid var(--card-border);
          padding-bottom: 0.5rem;
        }

        /* Info rows */
        .info-items-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .icon-wrapper {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--card-border);
          flex-shrink: 0;
        }

        .info-item-row .meta {
          display: flex;
          flex-direction: column;
        }

        .info-item-row .label {
          font-size: 0.7rem;
          text-transform: uppercase;
          color: var(--text-secondary);
          font-weight: 700;
        }

        .info-item-row .val {
          font-size: 0.9rem;
          color: white;
          font-weight: 500;
        }

        /* Map Blueprint visual styling */
        .map-blueprint-panel {
          background: linear-gradient(135deg, rgba(var(--primary-rgb), 0.05) 0%, rgba(0, 0, 0, 0.2) 100%);
          border-color: rgba(var(--primary-rgb), 0.2);
          position: relative;
        }

        .rotate-185 {
          transform: rotate(180deg);
        }

        .blueprint-svg {
          filter: drop-shadow(0 0 10px rgba(var(--primary-rgb), 0.3));
        }

        /* Form styling */
        .form-grid {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .input-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .textarea-field {
          resize: none;
        }

        .submit-btn {
          width: 100%;
          justify-content: center;
          padding: 0.9rem;
          font-size: 1rem;
        }

        /* FAQ CSS */
        .section-title-faq {
          font-size: 1.8rem;
          font-weight: 800;
          color: white;
          margin-bottom: 0.25rem;
        }

        .section-subtitle-faq {
          color: var(--text-secondary);
          font-size: 0.95rem;
        }

        .faq-item-card {
          border-radius: 12px;
          overflow: hidden;
          padding: 0.5rem 0.5rem;
        }

        .faq-question-trigger {
          background: transparent;
          border: none;
          padding: 0.8rem 1rem;
          cursor: pointer;
        }

        .faq-question {
          font-size: 1rem;
        }

        .faq-answer-wrapper {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s cubic-bezier(0, 1, 0, 1);
        }

        .faq-answer-wrapper.expanded {
          max-height: 200px;
          transition: max-height 0.3s cubic-bezier(0.85, 0, 0.15, 1);
        }

        .faq-answer {
          padding: 0 1rem 1rem 1rem;
          font-size: 0.85rem;
          line-height: 1.5;
        }

        .text-secondary {
          color: var(--text-secondary);
        }

        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
