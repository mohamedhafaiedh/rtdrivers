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

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    phone: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
      data.set("form-name", "contact");
      data.set("subject", "Nouvelle demande de contact");

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
      console.error("Erreur lors de la soumission du formulaire :", err);
      setErrorMessage(
        "Une erreur est survenue lors de l'envoi de votre message. Veuillez réessayer ou nous contacter directement par téléphone."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      nom: "",
      prenom: "",
      phone: "",
      email: "",
      message: "",
    });
    setIsSuccess(false);
    setErrorMessage("");
  };

  return (
    <div className="netlify-form-wrapper">
      <style jsx global>{`
        .netlify-form-wrapper {
          width: 100%;
        }

        .netlify-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.15rem;
          width: 100%;
        }

        @media (max-width: 640px) {
          .netlify-form-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }

        .netlify-form-full {
          grid-column: 1 / -1;
        }

        .netlify-floating-group {
          position: relative !important;
          width: 100% !important;
          margin-bottom: 0 !important;
        }

        .netlify-input-icon {
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

        .netlify-input-icon.textarea-icon {
          top: 1.15rem !important;
          transform: none !important;
        }

        .netlify-floating-input {
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

        .netlify-floating-textarea {
          width: 100% !important;
          min-height: 8rem !important;
          height: auto !important;
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

        .netlify-floating-input:focus,
        .netlify-floating-textarea:focus {
          border-color: #800000 !important;
          box-shadow: 0 0 0 3px rgba(128, 0, 0, 0.12) !important;
        }

        /* Placeholder d'exemple : masqué au repos, visible au focus */
        .netlify-floating-input::placeholder,
        .netlify-floating-textarea::placeholder {
          color: transparent !important;
          transition: color 0.2s ease !important;
        }

        .netlify-floating-input:focus::placeholder,
        .netlify-floating-textarea:focus::placeholder {
          color: #94a3b8 !important;
        }

        /* Libellé flottant intérieur : AU REPOS (centré dans le champ) */
        .netlify-floating-label {
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

        .netlify-floating-label.textarea-label {
          top: 1.25rem !important;
          transform: none !important;
        }

        /* LE LIBELLÉ MONTE TOUJOURS À L'INTÉRIEUR DU CHAMP (JAMAIS SUR LA BORDURE) */
        .netlify-floating-input:focus ~ .netlify-floating-label,
        .netlify-floating-input:not(:placeholder-shown) ~ .netlify-floating-label,
        .netlify-floating-input:-webkit-autofill ~ .netlify-floating-label,
        .netlify-floating-textarea:focus ~ .netlify-floating-label,
        .netlify-floating-textarea:not(:placeholder-shown) ~ .netlify-floating-label {
          top: 0.35rem !important;
          left: 2.85rem !important;
          transform: none !important;
          font-size: 0.68rem !important;
          font-weight: 600 !important;
          color: #800000 !important;
          background: transparent !important;
        }

        /* Bouton d'action fidèle au style RT Drivers */
        .netlify-submit-button {
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
          letter-spacing: 0.3px !important;
          cursor: pointer !important;
          transition: background-color 0.25s ease, border-color 0.25s ease, color 0.25s ease !important;
          box-shadow: none !important;
          transform: none !important;
        }

        .netlify-submit-button:hover:not(:disabled) {
          background-color: #231615 !important;
          border-color: #231615 !important;
          color: #ffffff !important;
        }

        .netlify-submit-button:disabled {
          opacity: 0.7 !important;
          cursor: not-allowed !important;
        }

        /* Panneau de succès moderne */
        .netlify-success-box {
          background: #f0fdf4;
          border: 1.5px solid #86efac;
          border-radius: 8px;
          padding: 2rem 1.5rem;
          text-align: center;
          color: #166534;
        }

        .netlify-success-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: #dcfce7;
          color: #15803d;
          margin-bottom: 1rem;
        }

        .netlify-error-alert {
          background: #fef2f2;
          border: 1px solid #fca5a5;
          border-radius: 6px;
          color: #991b1b;
          padding: 0.75rem 1rem;
          margin-bottom: 1rem;
          font-size: 0.9rem;
        }
      `}</style>

      {isSuccess ? (
        <div className="netlify-success-box" role="status" aria-live="polite">
          <div className="netlify-success-icon">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h3
            style={{
              fontSize: "1.25rem",
              fontWeight: 700,
              color: "#166534",
              marginBottom: "0.5rem",
            }}
          >
            Message envoyé avec succès !
          </h3>
          <p
            style={{
              fontSize: "0.95rem",
              color: "#374151",
              marginBottom: "1.5rem",
              lineHeight: 1.5,
            }}
          >
            Merci de nous avoir contactés. Notre équipe RT Drivers prend en
            charge votre demande et vous répondra dans les plus brefs délais.
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="elementor-button elementor-size-md netlify-submit-button"
            style={{ maxWidth: "260px", margin: "0 auto" }}
          >
            <span>Envoyer un autre message</span>
          </button>
        </div>
      ) : (
        <form
          action="/form.html"
          name="contact"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
          className="elementor-form"
          aria-label="Formulaire de contact"
        >
          {/* Champs de configuration Netlify */}
          <input type="hidden" name="form-name" value="contact" />
          <input
            type="hidden"
            name="subject"
            value="Nouvelle demande de contact"
          />

          {/* Champ Honeypot anti-spam masqué aux humains */}
          <p className="hidden" style={{ display: "none" }}>
            <label>
              Ne pas remplir : <input name="bot-field" />
            </label>
          </p>

          {errorMessage && (
            <div className="netlify-error-alert" role="alert">
              {errorMessage}
            </div>
          )}

          <div className="netlify-form-grid">
            {/* Nom */}
            <div className="netlify-floating-group">
              <div className="netlify-input-icon">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <input
                type="text"
                id="contact-nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                className="netlify-floating-input"
                placeholder="Ex : Dupont"
                required
              />
              <label htmlFor="contact-nom" className="netlify-floating-label">
                Nom*
              </label>
            </div>

            {/* Prénom */}
            <div className="netlify-floating-group">
              <div className="netlify-input-icon">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <input
                type="text"
                id="contact-prenom"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                className="netlify-floating-input"
                placeholder="Ex : Alexandre"
                required
              />
              <label htmlFor="contact-prenom" className="netlify-floating-label">
                Prénom*
              </label>
            </div>

            {/* Téléphone */}
            <div className="netlify-floating-group">
              <div className="netlify-input-icon">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <input
                type="tel"
                id="contact-phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="netlify-floating-input"
                placeholder="Ex : 06 12 34 56 78"
                required
              />
              <label htmlFor="contact-phone" className="netlify-floating-label">
                Téléphone*
              </label>
            </div>

            {/* E-mail */}
            <div className="netlify-floating-group">
              <div className="netlify-input-icon">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <input
                type="email"
                id="contact-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="netlify-floating-input"
                placeholder="Ex : contact@exemple.fr"
                required
              />
              <label htmlFor="contact-email" className="netlify-floating-label">
                E-mail*
              </label>
            </div>

            {/* Commentaire / Message */}
            <div className="netlify-floating-group netlify-form-full">
              <div className="netlify-input-icon textarea-icon">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="netlify-floating-textarea"
                placeholder="Ex : Bonjour, je souhaiterais obtenir des informations concernant un trajet..."
                required
              ></textarea>
              <label
                htmlFor="contact-message"
                className="netlify-floating-label textarea-label"
              >
                Commentaire*
              </label>
            </div>

            {/* Bouton d'envoi */}
            <div className="netlify-form-full">
              <button
                type="submit"
                disabled={isSubmitting}
                className="elementor-button elementor-size-md netlify-submit-button"
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        style={{
                          animation: "spin 1s linear infinite",
                          width: "18px",
                          height: "18px",
                        }}
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          strokeOpacity="0.25"
                        ></circle>
                        <path
                          d="M12 2a10 10 0 0 1 10 10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></path>
                      </svg>
                      <span>Envoi en cours...</span>
                    </>
                  ) : (
                    <>
                      <svg
                        aria-hidden="true"
                        width="12"
                        height="12"
                        viewBox="0 0 192 512"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"></path>
                      </svg>
                      <span>Envoyer</span>
                    </>
                  )}
                </span>
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
