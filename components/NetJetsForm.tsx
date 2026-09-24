"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import settingsData from "@/data/settings.json";

import netjetsData from "@/data/netjets_rates.json";
const NETJETS_RATES = netjetsData.netjetsRates;

const LOCATIONS = [
  "Aéroport Paris CDG",
  "Zone hôtelière CDG",
  "Jetex",
  "Orly",
  "Gare du Nord",
];

export function getNetjetsOffsetHours(): number {
  if (typeof settingsData?.netjetsDefaultTimeOffsetHours === "number") {
    return settingsData.netjetsDefaultTimeOffsetHours;
  }
  return 2;
}

export function validateNetjetsDateTime(date: string, heure: string): { valid: boolean; message: string } {
  if (!date || !date.trim()) {
    return { valid: false, message: "Veuillez sélectionner la date de prise en charge" };
  }
  if (!heure || !heure.trim()) {
    return { valid: false, message: "Veuillez sélectionner l'heure de prise en charge" };
  }

  try {
    const offsetHours = getNetjetsOffsetHours();
    const [year, month, day] = date.split("-").map(Number);
    const [h, m] = heure.split(":").map(Number);

    if (isNaN(year) || isNaN(month) || isNaN(day) || isNaN(h) || isNaN(m)) {
      return { valid: false, message: "Format de date ou heure invalide" };
    }

    // Heure actuelle à Paris
    const formatter = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Europe/Paris",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const parts = formatter.formatToParts(new Date());
    const curYear = parseInt(parts.find((p) => p.type === "year")?.value || "2026", 10);
    const curMonth = parseInt(parts.find((p) => p.type === "month")?.value || "1", 10);
    const curDay = parseInt(parts.find((p) => p.type === "day")?.value || "1", 10);
    let curHour = parseInt(parts.find((p) => p.type === "hour")?.value || "0", 10);
    if (curHour === 24) curHour = 0;
    const curMin = parseInt(parts.find((p) => p.type === "minute")?.value || "0", 10);
    const curSec = parseInt(parts.find((p) => p.type === "second")?.value || "0", 10);

    const nowParisTimestamp = Date.UTC(curYear, curMonth - 1, curDay, curHour, curMin, curSec);
    const selectedTimestamp = Date.UTC(year, month - 1, day, h, m, 0);

    // Contrôle unique du délai de prévenance présent dans le fichier JSON (y compris si la date/heure est antérieure)
    const minAllowedTimestamp = nowParisTimestamp + (offsetHours * 60 * 60 * 1000);
    if (selectedTimestamp < minAllowedTimestamp) {
      return {
        valid: false,
        message: `La réservation doit être effectuée au moins ${offsetHours} heures à l'avance.`,
      };
    }

    return { valid: true, message: "" };
  } catch {
    return { valid: true, message: "" };
  }
}

export function getNetjetsPrice(depart: string, arrivee: string, passengers: string): number | null {
  if (!depart || !arrivee || !passengers) return null;
  const found = NETJETS_RATES.find((r) => r.from === depart && r.to === arrivee);
  if (found && found.prices && (found.prices as Record<string, number>)[passengers]) {
    return (found.prices as Record<string, number>)[passengers];
  }
  return null;
}

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
  const router = useRouter();
  const today = new Date().toISOString().split("T")[0];

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    depart: "",
    arrivee: "",
    passagers: "",
    date: "",
    heure: "",
    flightNumber: "",
    hotelName: "",
    trainNumber: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const departRef = useRef<HTMLSelectElement>(null);
  const arriveeRef = useRef<HTMLSelectElement>(null);
  const hotelRef = useRef<HTMLInputElement>(null);
  const passagersRef = useRef<HTMLSelectElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const timeRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const openDatePicker = () => {
    try {
      if (dateRef.current && typeof dateRef.current.showPicker === "function") {
        dateRef.current.showPicker();
      }
    } catch {}
  };

  const openTimePicker = () => {
    try {
      if (timeRef.current && typeof timeRef.current.showPicker === "function") {
        timeRef.current.showPicker();
      }
    } catch {}
  };

  const triggerFieldReportValidity = (
    element: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null,
    customMessage?: string
  ) => {
    if (!element) return;
    if (customMessage) {
      element.setCustomValidity(customMessage);
    } else {
      element.setCustomValidity("");
    }
    element.reportValidity();
    const clearCustomValidity = () => {
      element.setCustomValidity("");
      element.removeEventListener("input", clearCustomValidity);
      element.removeEventListener("change", clearCustomValidity);
    };
    element.addEventListener("input", clearCustomValidity);
    element.addEventListener("change", clearCustomValidity);
  };

  // Règle stricte demandée :
  // - "numéro de vol" : UNIQUEMENT lorsqu'il s'agit d'un DÉPART d'un aéroport (CDG, Orly, Jetex).
  // - "numéro de train" : UNIQUEMENT lorsqu'il s'agit d'un DÉPART d'une gare (Gare du Nord).
  // - "nom d'hôtel" : si départ ou arrivée en Zone hôtelière CDG.
  const isDepartAirport =
    formData.depart === "Aéroport Paris CDG" ||
    formData.depart === "Orly" ||
    formData.depart === "Jetex";
  const isDepartTrain = formData.depart === "Gare du Nord";
  const isHotel =
    formData.depart === "Zone hôtelière CDG" ||
    formData.arrivee === "Zone hôtelière CDG";

  // Calcul du prix dynamique pour l'étape 2
  const currentPrice = getNetjetsPrice(formData.depart, formData.arrivee, formData.passagers);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateStep1 = () => {
    const errors: Record<string, string> = {};

    if (!formData.depart) {
      errors.depart = "Veuillez sélectionner un lieu de départ";
      if (departRef.current) {
        departRef.current.focus();
        triggerFieldReportValidity(departRef.current, errors.depart);
      }
    } else if (!formData.arrivee) {
      errors.arrivee = "Veuillez sélectionner un lieu d'arrivée";
      if (arriveeRef.current) {
        arriveeRef.current.focus();
        triggerFieldReportValidity(arriveeRef.current, errors.arrivee);
      }
    } else if (formData.depart === formData.arrivee) {
      errors.arrivee = "Le lieu d'arrivée doit être différent du lieu de départ";
      if (arriveeRef.current) {
        arriveeRef.current.focus();
        triggerFieldReportValidity(arriveeRef.current, errors.arrivee);
      }
    } else if (isHotel && !formData.hotelName.trim()) {
      errors.hotelName = "Veuillez renseigner le nom de l'hôtel";
      if (hotelRef.current) {
        hotelRef.current.focus();
        triggerFieldReportValidity(hotelRef.current, errors.hotelName);
      }
    } else if (!formData.passagers) {
      errors.passagers = "Veuillez sélectionner le nombre de passagers";
      if (passagersRef.current) {
        passagersRef.current.focus();
        triggerFieldReportValidity(passagersRef.current, errors.passagers);
      }
    } else if (!formData.date) {
      errors.date = "Veuillez sélectionner la date de prise en charge";
      if (dateRef.current) {
        dateRef.current.focus();
        triggerFieldReportValidity(dateRef.current, errors.date);
      }
    } else if (!formData.heure) {
      errors.heure = "Veuillez sélectionner l'heure de prise en charge";
      if (timeRef.current) {
        timeRef.current.focus();
        triggerFieldReportValidity(timeRef.current, errors.heure);
      }
    } else {
      // Validation du délai d'écart d'heures présent dans le fichier JSON
      const dateTimeValidation = validateNetjetsDateTime(formData.date, formData.heure);
      if (!dateTimeValidation.valid) {
        errors.heure = dateTimeValidation.message;
        if (timeRef.current) {
          timeRef.current.focus();
          triggerFieldReportValidity(timeRef.current, dateTimeValidation.message);
        }
      }
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return false;
    }

    setFieldErrors({});
    return true;
  };

  const handleNextStep = (e: React.MouseEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setStep(2);
      window.scrollTo({ top: 200, behavior: "smooth" });
    }
  };

  const handlePrevStep = () => {
    setStep(1);
    window.scrollTo({ top: 200, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    const errors: Record<string, string> = {};
    if (!formData.name.trim()) {
      errors.name = "Veuillez renseigner votre nom";
      if (nameRef.current) {
        nameRef.current.focus();
        triggerFieldReportValidity(nameRef.current, errors.name);
      }
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
        errors.email = "Veuillez renseigner une adresse email valide";
        if (emailRef.current) {
          emailRef.current.focus();
          triggerFieldReportValidity(emailRef.current, errors.email);
        }
      } else if (!formData.phone.trim()) {
        errors.phone = "Veuillez renseigner un numéro de téléphone";
        if (phoneRef.current) {
          phoneRef.current.focus();
          triggerFieldReportValidity(phoneRef.current, errors.phone);
        }
      }
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const data = new FormData();
      data.set("form-name", "netjets");
      data.set("subject", "Nouvelle réservation NetJets - RT Drivers");
      data.set("depart", formData.depart);
      data.set("arrivee", formData.arrivee);
      data.set("passagers", `${formData.passagers} passagers`);
      data.set("prix", currentPrice ? `${currentPrice} €` : "Sur devis");
      data.set("date", formData.date);
      data.set("heure", formData.heure);
      data.set("flightNumber", isDepartAirport ? formData.flightNumber || "Non renseigné" : "N/A");
      data.set("hotelName", isHotel ? formData.hotelName || "Non renseigné" : "N/A");
      data.set("trainNumber", isDepartTrain ? formData.trainNumber || "Non renseigné" : "N/A");
      data.set("name", formData.name);
      data.set("email", formData.email);
      data.set("phone", formData.phone);
      data.set("message", formData.message || "Aucune remarque");

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
        // Redirection vers la page dédiée de remerciement NetJets
        router.push("/merci-netjets/");
      } else {
        throw new Error("Erreur serveur lors de la transmission du formulaire");
      }
    } catch (err) {
      console.error("Erreur de réservation NetJets :", err);
      if (
        typeof window !== "undefined" &&
        (window.location.hostname === "localhost" ||
          window.location.hostname === "127.0.0.1")
      ) {
        router.push("/merci-netjets/");
      } else {
        setSubmitError(
          "Une erreur est survenue lors de l'envoi de votre réservation. Veuillez nous contacter directement au +33 6 06 69 44 97."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="netjets-form-wrapper" style={{ width: "100%", maxWidth: "780px", margin: "0 auto" }}>
      <style jsx global>{`
        .nj-stepper {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid #f0ece9;
        }
        .nj-step-item {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: default;
        }
        .nj-step-bubble {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 14px;
          transition: all 0.3s ease;
        }
        .nj-step-bubble.active {
          background-color: #800000;
          color: #ffffff;
          box-shadow: 0 4px 10px rgba(128, 0, 0, 0.25);
        }
        .nj-step-bubble.inactive {
          background-color: #f3f4f6;
          color: #9ca3af;
          border: 1px solid #e5e7eb;
        }
        .nj-step-label {
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .nj-step-label.active {
          color: #231615;
        }
        .nj-step-label.inactive {
          color: #9ca3af;
        }
        .nj-step-line {
          width: 60px;
          height: 2px;
          background-color: #e5e7eb;
          margin: 0 16px;
        }
        .nj-step-line.filled {
          background-color: #800000;
        }

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
          min-height: 6.5rem !important;
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
        .netjets-input.error,
        .netjets-select.error,
        .netjets-textarea.error {
          border-color: #ef4444 !important;
          background-color: #fffaf0 !important;
        }

        /* Masquage strict du placeholder hors-focus pour ne jamais chevaucher le libellé au repos */
        .netjets-input::placeholder,
        .netjets-textarea::placeholder {
          color: transparent !important;
          opacity: 0 !important;
          transition: color 0.2s ease, opacity 0.2s ease !important;
        }

        /* Affichage du placeholder uniquement quand le focus est sur le champ */
        .netjets-input:focus::placeholder,
        .netjets-textarea:focus::placeholder {
          color: #94a3b8 !important;
          opacity: 1 !important;
        }

        /* Libellé au repos : centré au milieu du champ */
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

        /* Libellé fixé en haut pour les selects et inputs de type date/heure */
        .netjets-label.select-label {
          top: 0.35rem !important;
          transform: none !important;
          font-size: 0.68rem !important;
          font-weight: 600 !important;
          color: #800000 !important;
        }

        /* Libellé au repos pour le textarea */
        .netjets-label.textarea-label {
          top: 1.25rem !important;
          transform: none !important;
        }

        /* Transition du libellé vers le haut dès que le champ a le focus ou n'est plus vide */
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

        .netjets-input[type="date"],
        .netjets-input[type="time"] {
          cursor: pointer !important;
        }
        .netjets-input[type="date"]::-webkit-calendar-picker-indicator,
        .netjets-input[type="time"]::-webkit-calendar-picker-indicator {
          cursor: pointer !important;
          padding: 4px !important;
          border-radius: 4px !important;
          opacity: 0.75 !important;
          transition: all 0.2s ease !important;
        }
        .netjets-input[type="date"]::-webkit-calendar-picker-indicator:hover,
        .netjets-input[type="time"]::-webkit-calendar-picker-indicator:hover {
          opacity: 1 !important;
          background-color: rgba(128, 0, 0, 0.08) !important;
        }

        .nj-error-msg {
          font-size: 11px;
          color: #ef4444;
          margin-top: 4px;
          font-weight: 500;
        }

        .netjets-btn-primary {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 10px !important;
          width: 100% !important;
          min-height: 50px !important;
          padding: 12px 28px !important;
          background-color: #800000 !important;
          color: #ffffff !important;
          border: 1px solid #800000 !important;
          border-radius: 6px !important;
          font-family: "Roboto", sans-serif !important;
          font-size: 15px !important;
          font-weight: 600 !important;
          cursor: pointer !important;
          transition: background-color 0.25s ease, border-color 0.25s ease !important;
        }
        .netjets-btn-primary:hover:not(:disabled) {
          background-color: #231615 !important;
          border-color: #231615 !important;
        }
        .netjets-btn-secondary {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: 8px !important;
          min-height: 50px !important;
          padding: 12px 24px !important;
          background-color: #f3f4f6 !important;
          color: #374151 !important;
          border: 1px solid #d1d5db !important;
          border-radius: 6px !important;
          font-family: "Roboto", sans-serif !important;
          font-size: 14px !important;
          font-weight: 600 !important;
          cursor: pointer !important;
          transition: all 0.2s ease !important;
        }
        .netjets-btn-secondary:hover:not(:disabled) {
          background-color: #e5e7eb !important;
          color: #111827 !important;
        }
      `}</style>

      {/* Stepper à 2 étapes (Diamond Services) */}
      <div className="nj-stepper">
        <div className="nj-step-item">
          <div className={`nj-step-bubble ${step >= 1 ? "active" : "inactive"}`}>1</div>
          <span className={`nj-step-label ${step >= 1 ? "active" : "inactive"}`}>
            Trajet &amp; Passagers
          </span>
        </div>
        <div className={`nj-step-line ${step === 2 ? "filled" : ""}`} />
        <div className="nj-step-item">
          <div className={`nj-step-bubble ${step === 2 ? "active" : "inactive"}`}>2</div>
          <span className={`nj-step-label ${step === 2 ? "active" : "inactive"}`}>
            Coordonnées
          </span>
        </div>
      </div>

      {submitError && (
        <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: "6px", color: "#991b1b", padding: "0.85rem", marginBottom: "1.25rem", fontSize: "0.9rem" }}>
          {submitError}
        </div>
      )}

      <form
        action="/form.html"
        name="netjets"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="form-name" value="netjets" />
        <input type="hidden" name="subject" value="Nouvelle réservation NetJets - RT Drivers" />
        <p className="hidden" style={{ display: "none" }}>
          <label>Ne pas remplir : <input name="bot-field" /></label>
        </p>

        {/* ==============================================================
            ÉTAPE 1 : TRAJET, DATE, HEURE & NOMBRE DE PASSAGERS
           ============================================================== */}
        {step === 1 && (
          <div className="netjets-grid">
            {/* Lieu de Départ */}
            <div className="netjets-group">
              <div className="netjets-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </div>
              <select
                ref={departRef}
                id="nj-depart"
                name="depart"
                value={formData.depart}
                onChange={handleChange}
                className={`netjets-select ${fieldErrors.depart ? "error" : ""}`}
                required
              >
                <option value="" disabled>
                  — Veuillez choisir un lieu de prise en charge —
                </option>
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc} disabled={loc === formData.arrivee}>
                    {loc} {loc === formData.arrivee ? "(sélectionné à l'arrivée)" : ""}
                  </option>
                ))}
              </select>
              <div className="netjets-chevron">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
              <label htmlFor="nj-depart" className="netjets-label select-label">Lieu de prise en charge*</label>
            </div>

            {/* Lieu d'Arrivée */}
            <div className="netjets-group">
              <div className="netjets-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </div>
              <select
                ref={arriveeRef}
                id="nj-arrivee"
                name="arrivee"
                value={formData.arrivee}
                onChange={handleChange}
                className={`netjets-select ${fieldErrors.arrivee ? "error" : ""}`}
                required
              >
                <option value="" disabled>
                  — Veuillez choisir un lieu de destination —
                </option>
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc} disabled={loc === formData.depart}>
                    {loc} {loc === formData.depart ? "(sélectionné au départ)" : ""}
                  </option>
                ))}
              </select>
              <div className="netjets-chevron">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
              <label htmlFor="nj-arrivee" className="netjets-label select-label">Lieu de destination*</label>
            </div>

            {/* Champ conditionnel : N° de vol (UNIQUEMENT si départ d'un aéroport) */}
            {isDepartAirport && (
              <div className="netjets-group netjets-full">
                <div className="netjets-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13"></path><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </div>
                <input
                  type="text"
                  id="nj-flight"
                  name="flightNumber"
                  value={formData.flightNumber}
                  onChange={handleChange}
                  placeholder="Ex : NJE123 / AF1234"
                  className="netjets-input"
                />
                <label htmlFor="nj-flight" className="netjets-label">Numéro de vol (optionnel)</label>
              </div>
            )}

            {/* Champ conditionnel : Nom de l'hôtel (si départ ou arrivée en Zone hôtelière CDG) */}
            {isHotel && (
              <div className="netjets-group netjets-full">
                <div className="netjets-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                </div>
                <input
                  ref={hotelRef}
                  type="text"
                  id="nj-hotel"
                  name="hotelName"
                  value={formData.hotelName}
                  onChange={handleChange}
                  placeholder="Ex : Sheraton Paris Airport, Hilton CDG, CitizenM..."
                  className={`netjets-input ${fieldErrors.hotelName ? "error" : ""}`}
                  required
                />
                <label htmlFor="nj-hotel" className="netjets-label">Nom de l&apos;hôtel*</label>
              </div>
            )}

            {/* Champ conditionnel : N° de train (UNIQUEMENT si départ d'une gare) */}
            {isDepartTrain && (
              <div className="netjets-group netjets-full">
                <div className="netjets-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="3" width="16" height="16" rx="2"></rect><path d="M4 11h16"></path><path d="M12 3v8"></path><path d="M8 19l-2 3"></path><path d="M16 19l2 3"></path></svg>
                </div>
                <input
                  type="text"
                  id="nj-train"
                  name="trainNumber"
                  value={formData.trainNumber}
                  onChange={handleChange}
                  placeholder="Ex : Eurostar 9012 / TGV 7120"
                  className="netjets-input"
                />
                <label htmlFor="nj-train" className="netjets-label">Numéro de train (optionnel)</label>
              </div>
            )}

            {/* Nombre de passagers (2, 3, 4 passagers) */}
            <div className="netjets-group netjets-full">
              <div className="netjets-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
              <select
                ref={passagersRef}
                id="nj-passagers"
                name="passagers"
                value={formData.passagers}
                onChange={handleChange}
                className={`netjets-select ${fieldErrors.passagers ? "error" : ""}`}
                required
              >
                <option value="" disabled>
                  — Veuillez choisir le nombre de passagers —
                </option>
                <option value="2">2 passagers</option>
                <option value="3">3 passagers</option>
                <option value="4">4 passagers</option>
              </select>
              <div className="netjets-chevron">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </div>
              <label htmlFor="nj-passagers" className="netjets-label select-label">Nombre de passagers*</label>
            </div>

            {/* Date */}
            <div
              className="netjets-group"
              onClick={openDatePicker}
              style={{ cursor: "pointer" }}
            >
              <div className="netjets-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              </div>
              <input
                ref={dateRef}
                type="date"
                id="nj-date"
                name="date"
                min={today}
                value={formData.date}
                onChange={handleChange}
                onClick={(e) => {
                  e.stopPropagation();
                  openDatePicker();
                }}
                className={`netjets-input ${fieldErrors.date ? "error" : ""}`}
                style={{ cursor: "pointer" }}
                required
              />
              <label htmlFor="nj-date" className="netjets-label select-label" style={{ cursor: "pointer" }}>Date de prise en charge*</label>
            </div>

            {/* Heure (champ natif) */}
            <div
              className="netjets-group"
              onClick={openTimePicker}
              style={{ cursor: "pointer" }}
            >
              <div className="netjets-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              </div>
              <input
                ref={timeRef}
                type="time"
                id="nj-heure"
                name="heure"
                value={formData.heure}
                onChange={handleChange}
                onClick={(e) => {
                  e.stopPropagation();
                  openTimePicker();
                }}
                className={`netjets-input ${fieldErrors.heure ? "error" : ""}`}
                style={{ cursor: "pointer" }}
                required
              />
              <label htmlFor="nj-heure" className="netjets-label select-label" style={{ cursor: "pointer" }}>Heure de prise en charge*</label>
            </div>

            {/* Bouton Continuer vers Étape 2 (prix non affiché à l'étape 1 selon consigne) */}
            <div className="netjets-full" style={{ marginTop: "0.5rem" }}>
              <button
                type="button"
                onClick={handleNextStep}
                className="netjets-btn-primary"
              >
                <span>Continuer</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            </div>
          </div>
        )}

        {/* ==============================================================
            ÉTAPE 2 : COORDONNÉES ET CONFIRMATION
           ============================================================== */}
        {step === 2 && (
          <div className="netjets-grid">
            {/* Récapitulatif du trajet et tarif (conservé tel quel à l'étape 2) */}
            <div className="netjets-full" style={{ backgroundColor: "#fdf8f6", border: "1px solid #fee2e2", borderRadius: "8px", padding: "14px 18px", marginBottom: "0.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#231615" }}>
                    {formData.depart} → {formData.arrivee}
                  </div>
                  <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "2px" }}>
                    {formData.date} à {formData.heure} • {formData.passagers} passagers
                    {isHotel && formData.hotelName ? ` • Hôtel : ${formData.hotelName}` : ""}
                    {isDepartAirport && formData.flightNumber ? ` • Vol : ${formData.flightNumber}` : ""}
                    {isDepartTrain && formData.trainNumber ? ` • Train : ${formData.trainNumber}` : ""}
                  </div>
                </div>
                {currentPrice !== null && (
                  <div style={{ backgroundColor: "#059669", color: "#ffffff", padding: "6px 14px", borderRadius: "6px", fontWeight: 800, fontSize: "16px" }}>
                    {currentPrice} €
                  </div>
                )}
              </div>
            </div>

            {/* Nom & Prénom */}
            <div className="netjets-group netjets-full">
              <div className="netjets-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              </div>
              <input
                ref={nameRef}
                type="text"
                id="nj-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ex : John Doe"
                className={`netjets-input ${fieldErrors.name ? "error" : ""}`}
                required
              />
              <label htmlFor="nj-name" className="netjets-label">Nom et Prénom*</label>
            </div>

            {/* E-mail */}
            <div className="netjets-group netjets-full">
              <div className="netjets-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </div>
              <input
                ref={emailRef}
                type="email"
                id="nj-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ex : client@netjets.com"
                className={`netjets-input ${fieldErrors.email ? "error" : ""}`}
                required
              />
              <label htmlFor="nj-email" className="netjets-label">Adresse e-mail*</label>
            </div>

            {/* Téléphone */}
            <div className="netjets-group netjets-full">
              <div className="netjets-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </div>
              <input
                ref={phoneRef}
                type="tel"
                id="nj-phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Ex : +33 6 12 34 56 78"
                className={`netjets-input ${fieldErrors.phone ? "error" : ""}`}
                required
              />
              <label htmlFor="nj-phone" className="netjets-label">Numéro de téléphone*</label>
            </div>

            {/* Remarques particulières */}
            <div className="netjets-group netjets-full">
              <div className="netjets-icon textarea-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              </div>
              <textarea
                id="nj-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Remarques particulières (ex : références vol/mission, consignes chauffeur)..."
                className="netjets-textarea"
              ></textarea>
              <label htmlFor="nj-message" className="netjets-label textarea-label">Remarques particulières</label>
            </div>

            {/* Notice de confidentialité */}
            <div className="netjets-full" style={{ fontSize: "11px", color: "#6b7280", textAlign: "center", fontStyle: "italic" }}>
              Vos données personnelles sont collectées exclusivement pour le traitement et le suivi de votre réservation.
            </div>

            {/* Boutons d'action : Retour & Confirmer */}
            <div className="netjets-full" style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "12px", marginTop: "0.5rem" }}>
              <button
                type="button"
                onClick={handlePrevStep}
                disabled={isSubmitting}
                className="netjets-btn-secondary"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                <span>Retour</span>
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="netjets-btn-primary"
              >
                <span>{isSubmitting ? "Confirmation en cours..." : "Confirmer la réservation"}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
