"use client";

import React, { useState } from "react";

function getFormattedTimestamp() {
  const now = new Date();
  const dateStr = now.toLocaleDateString("fr-FR", {
    timeZone: "Europe/Paris",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const timeStr = now.toLocaleTimeString("fr-FR", {
    timeZone: "Europe/Paris",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  return `${dateStr} à ${timeStr} (heure de Paris)`;
}

export default function NetJetsForm() {
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    date: "",
    heure: "",
    depart: "Aéroport Paris CDG",
    arrivee: "Jetex",
    passagers: "2",
    payment_method: "On board",
    numvol: "",
    hotel: "",
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const data = new FormData(e.currentTarget);
      data.set("form-name", "netjets");
      data.set("subject", "Nouvelle réservation NetJets");

      if (typeof window !== "undefined") {
        data.set("pageUrl", window.location.href);
        data.set("timestamp", getFormattedTimestamp());
      }

      const params = new URLSearchParams();
      for (const [key, value] of data.entries()) {
        params.append(key, value.toString());
      }

      const res = await fetch("/form.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });

      if (
        res.ok ||
        (typeof window !== "undefined" &&
          (window.location.hostname === "localhost" ||
            window.location.hostname === "127.0.0.1"))
      ) {
        setIsSuccess(true);
      } else {
        throw new Error("Erreur de transmission");
      }
    } catch (err) {
      console.error("Erreur lors de la réservation NetJets :", err);
      setErrorMessage(
        "An error occurred while submitting your booking. Please try again or call us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      date: "",
      heure: "",
      depart: "Aéroport Paris CDG",
      arrivee: "Jetex",
      passagers: "2",
      payment_method: "On board",
      numvol: "",
      hotel: "",
      name: "",
      phone: "",
      email: "",
      message: "",
    });
    setIsSuccess(false);
    setErrorMessage("");
  };

  return (
    <div className="netjets-form-wrapper" style={{ width: "100%", maxWidth: "780px", margin: "0 auto" }}>
      <style jsx global>{`
        .netjets-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.15rem;
          width: 100%;
        }

        @media (max-width: 640px) {
          .netjets-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }

        .netjets-full {
          grid-column: 1 / -1;
        }

        .netjets-group {
          position: relative !important;
          width: 100% !important;
          margin-bottom: 0 !important;
        }

        .netjets-icon {
          position: absolute !important;
          left: 1rem !important;
          top: 50% !important;
          transform: translateY(-50%) !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          color: #800000 !important;
          pointer-events: none !important;
          z-index: 2 !important;
        }

        .netjets-icon.textarea-icon {
          top: 1.15rem !important;
          transform: none !important;
        }

        .netjets-chevron {
          position: absolute !important;
          right: 1rem !important;
          top: 50% !important;
          transform: translateY(-50%) !important;
          color: #94a3b8 !important;
          pointer-events: none !important;
          z-index: 2 !important;
        }

        .netjets-input,
        .netjets-select {
          width: 100% !important;
          height: 3.4rem !important;
          padding-left: 2.85rem !important;
          padding-right: 1rem !important;
          padding-top: 1.15rem !important;
          padding-bottom: 0.25rem !important;
          background-color: #ffffff !important;
          border: 1.5px solid #d1d5db !important;
          border-radius: 8px !important;
          font-family: inherit !important;
          font-size: 0.95rem !important;
          color: #231615 !important;
          outline: none !important;
          transition: border-color 0.2s ease, box-shadow 0.2s ease !important;
          box-sizing: border-box !important;
        }

        .netjets-select {
          appearance: none !important;
          -webkit-appearance: none !important;
          padding-right: 2.5rem !important;
          cursor: pointer !important;
        }

        .netjets-textarea {
          width: 100% !important;
          min-height: 7.5rem !important;
          padding-left: 2.85rem !important;
          padding-right: 1rem !important;
          padding-top: 1.55rem !important;
          padding-bottom: 0.65rem !important;
          background-color: #ffffff !important;
          border: 1.5px solid #d1d5db !important;
          border-radius: 8px !important;
          font-family: inherit !important;
          font-size: 0.95rem !important;
          color: #231615 !important;
          outline: none !important;
          resize: vertical !important;
          transition: border-color 0.2s ease, box-shadow 0.2s ease !important;
          box-sizing: border-box !important;
        }

        .netjets-input:focus,
        .netjets-select:focus,
        .netjets-textarea:focus {
          border-color: #800000 !important;
          box-shadow: 0 0 0 3px rgba(128, 0, 0, 0.12) !important;
        }

        .netjets-input::placeholder,
        .netjets-textarea::placeholder {
          color: transparent !important;
          transition: color 0.2s ease !important;
        }

        .netjets-input:focus::placeholder,
        .netjets-textarea:focus::placeholder {
          color: #94a3b8 !important;
        }

        .netjets-label {
          position: absolute !important;
          left: 2.85rem !important;
          top: 50% !important;
          transform: translateY(-50%) !important;
          font-family: inherit !important;
          font-size: 0.92rem !important;
          color: #64748b !important;
          pointer-events: none !important;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
          background: transparent !important;
          white-space: nowrap !important;
          z-index: 1 !important;
        }

        .netjets-label.select-label {
          top: 0.35rem !important;
          transform: none !important;
          font-size: 0.68rem !important;
          font-weight: 600 !important;
        }

        .netjets-label.textarea-label {
          top: 1.25rem !important;
          transform: none !important;
        }

        .netjets-input:focus ~ .netjets-label,
        .netjets-input:not(:placeholder-shown) ~ .netjets-label,
        .netjets-input:-webkit-autofill ~ .netjets-label,
        .netjets-textarea:focus ~ .netjets-label,
        .netjets-textarea:not(:placeholder-shown) ~ .netjets-label {
          top: 0.35rem !important;
          left: 2.85rem !important;
          transform: none !important;
          font-size: 0.68rem !important;
          font-weight: 600 !important;
          color: #800000 !important;
          background: transparent !important;
        }

        .netjets-btn {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 10px !important;
          width: 100% !important;
          min-height: 48px !important;
          padding: 12px 28px !important;
          background-color: #800000 !important;
          color: #ffffff !important;
          border: 1px solid #800000 !important;
          border-radius: 4px !important;
          font-family: "Roboto", sans-serif !important;
          font-size: 16px !important;
          font-weight: 500 !important;
          cursor: pointer !important;
          transition: background-color 0.25s ease, border-color 0.25s ease !important;
          transform: none !important;
        }

        .netjets-btn:hover:not(:disabled) {
          background-color: #231615 !important;
          border-color: #231615 !important;
        }

        .netjets-btn:disabled {
          opacity: 0.7 !important;
          cursor: not-allowed !important;
        }
      `}</style>

      {isSuccess ? (
        <div style={{ background: "#f0fdf4", border: "1.5px solid #86efac", borderRadius: "8px", padding: "2rem", textAlign: "center", color: "#166534" }}>
          <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: "#dcfce7", color: "#15803d", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>Booking request sent successfully!</h3>
          <p style={{ fontSize: "0.95rem", color: "#374151", marginBottom: "1.5rem" }}>
            Thank you for choosing RT Drivers. Our team is processing your NetJets reservation and will confirm shortly.
          </p>
          <button type="button" onClick={handleReset} className="netjets-btn" style={{ maxWidth: "260px", margin: "0 auto" }}>
            <span>Make another booking</span>
          </button>
        </div>
      ) : (
        <form
          action="/form.html"
          name="netjets"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value="netjets" />
          <input type="hidden" name="subject" value="Nouvelle réservation NetJets" />
          <p className="hidden" style={{ display: "none" }}>
            <label>Ne pas remplir : <input name="bot-field" /></label>
          </p>

          {errorMessage && (
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: "6px", color: "#991b1b", padding: "0.75rem", marginBottom: "1rem", fontSize: "0.9rem" }}>
              {errorMessage}
            </div>
          )}

          <div className="netjets-grid">
            {/* Date */}
            <div className="netjets-group">
              <div className="netjets-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              </div>
              <input type="date" id="netjets-date" name="date" min={today} value={formData.date} onChange={handleChange} className="netjets-input" required />
              <label htmlFor="netjets-date" className="netjets-label select-label">Date*</label>
            </div>

            {/* Time */}
            <div className="netjets-group">
              <div className="netjets-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              </div>
              <input type="time" id="netjets-time" name="heure" value={formData.heure} onChange={handleChange} className="netjets-input" required />
              <label htmlFor="netjets-time" className="netjets-label select-label">Time*</label>
            </div>

            {/* Pickup address */}
            <div className="netjets-group">
              <div className="netjets-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </div>
              <select id="netjets-depart" name="depart" value={formData.depart} onChange={handleChange} className="netjets-select" required>
                <option value="Aéroport Paris CDG">Aéroport Paris CDG</option>
                <option value="Zone hôtelière CDG">Zone hôtelière CDG</option>
                <option value="Jetex">Jetex</option>
                <option value="Orly">Orly</option>
                <option value="Gare du Nord">Gare du Nord</option>
              </select>
              <div className="netjets-chevron">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
              <label htmlFor="netjets-depart" className="netjets-label select-label">Pickup address*</label>
            </div>

            {/* Dropoff address */}
            <div className="netjets-group">
              <div className="netjets-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </div>
              <select id="netjets-arrivee" name="arrivee" value={formData.arrivee} onChange={handleChange} className="netjets-select" required>
                <option value="Jetex">Jetex</option>
                <option value="Orly">Orly</option>
                <option value="Gare du Nord">Gare du Nord</option>
                <option value="Aéroport Paris CDG">Aéroport Paris CDG</option>
                <option value="Zone hôtelière CDG">Zone hôtelière CDG</option>
              </select>
              <div className="netjets-chevron">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
              <label htmlFor="netjets-arrivee" className="netjets-label select-label">Dropoff address*</label>
            </div>

            {/* Passengers */}
            <div className="netjets-group">
              <div className="netjets-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
              <select id="netjets-passagers" name="passagers" value={formData.passagers} onChange={handleChange} className="netjets-select" required>
                <option value="2">2 passengers</option>
                <option value="3">3 passengers</option>
                <option value="4">4 passengers</option>
              </select>
              <div className="netjets-chevron">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
              <label htmlFor="netjets-passagers" className="netjets-label select-label">Passengers*</label>
            </div>

            {/* Payment method */}
            <div className="netjets-group">
              <div className="netjets-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
              </div>
              <select id="netjets-payment" name="payment_method" value={formData.payment_method} onChange={handleChange} className="netjets-select" required>
                <option value="On board">On board</option>
                <option value="Online">Online</option>
              </select>
              <div className="netjets-chevron">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
              <label htmlFor="netjets-payment" className="netjets-label select-label">Payment method*</label>
            </div>

            {/* Flight number */}
            <div className="netjets-group">
              <div className="netjets-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13"></path><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </div>
              <input type="text" id="netjets-numvol" name="numvol" value={formData.numvol} onChange={handleChange} className="netjets-input" placeholder="Ex : NJE456" />
              <label htmlFor="netjets-numvol" className="netjets-label">Flight number</label>
            </div>

            {/* Hotel name */}
            <div className="netjets-group">
              <div className="netjets-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
              </div>
              <input type="text" id="netjets-hotel" name="hotel" value={formData.hotel} onChange={handleChange} className="netjets-input" placeholder="Ex : Hôtel Ritz Paris" />
              <label htmlFor="netjets-hotel" className="netjets-label">Hotel name</label>
            </div>

            {/* Name */}
            <div className="netjets-group">
              <div className="netjets-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </div>
              <input type="text" id="netjets-name" name="name" value={formData.name} onChange={handleChange} className="netjets-input" placeholder="Ex : John Doe" required />
              <label htmlFor="netjets-name" className="netjets-label">Your Name*</label>
            </div>

            {/* Phone */}
            <div className="netjets-group">
              <div className="netjets-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </div>
              <input type="tel" id="netjets-phone" name="phone" value={formData.phone} onChange={handleChange} className="netjets-input" placeholder="Ex : +33 6 12 34 56 78" required />
              <label htmlFor="netjets-phone" className="netjets-label">Phone number*</label>
            </div>

            {/* Email */}
            <div className="netjets-group netjets-full">
              <div className="netjets-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </div>
              <input type="email" id="netjets-email" name="email" value={formData.email} onChange={handleChange} className="netjets-input" placeholder="Ex : john.doe@example.com" required />
              <label htmlFor="netjets-email" className="netjets-label">Your E-mail*</label>
            </div>

            {/* Additional infos */}
            <div className="netjets-group netjets-full">
              <div className="netjets-icon textarea-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              </div>
              <textarea id="netjets-message" name="message" value={formData.message} onChange={handleChange} className="netjets-textarea" placeholder="Please add any useful infos here..."></textarea>
              <label htmlFor="netjets-message" className="netjets-label textarea-label">Additional infos</label>
            </div>

            {/* Submit button */}
            <div className="netjets-full">
              <button type="submit" disabled={isSubmitting} className="netjets-btn">
                <span>{isSubmitting ? "Sending booking..." : "Confirm NetJets Booking"}</span>
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
