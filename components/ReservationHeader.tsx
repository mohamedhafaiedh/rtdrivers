import Link from "next/link";

/**
 * Header partagé entre /reservation/ et /netjets-bookings/.
 * Entièrement piloté par des styles inline — aucune dépendance aux
 * classes CSS Elementor — ce qui garantit un rendu pixel-perfect
 * identique sur les deux pages quelle que soit leur page-class parente.
 * Pas de "use client" nécessaire : pas d'event handlers JS.
 */
export default function ReservationHeader() {
  return (
    <header
      style={{
        backgroundColor: "#ffffff",
        width: "100%",
        display: "flex",
        alignItems: "center",
        minHeight: "70px",
        borderBottom: "1px solid #e5e7eb",
        boxSizing: "border-box",
        padding: "0 20px",
        position: "relative",
        zIndex: 10,
      }}
    >
      <style>{`
        .rh-cancel-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 7px 14px;
          background-color: #800000;
          color: #ffffff !important;
          border-radius: 4px;
          font-size: 13px;
          font-weight: 600;
          font-family: inherit;
          text-decoration: none !important;
          line-height: 1.4;
          white-space: nowrap;
          transition: background-color 0.2s ease;
        }
        .rh-cancel-btn:hover {
          background-color: #231615;
        }
      `}</style>

      {/* Layout 3 colonnes : logo | centre vide | bouton */}
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo RT Drivers */}
        <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            fetchPriority="high"
            decoding="async"
            src="/images/cropped-Color-logo-no-background480.png"
            alt="RT Drivers"
            style={{ width: "160px", height: "auto", display: "block" }}
          />
        </Link>

        {/* Bouton Annuler */}
        <Link href="/" className="rh-cancel-btn">
          <svg
            aria-hidden="true"
            width="12"
            height="12"
            viewBox="0 0 352 512"
            xmlns="http://www.w3.org/2000/svg"
            style={{ flexShrink: 0 }}
          >
            <path
              fill="currentColor"
              d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
            />
          </svg>
          Annuler
        </Link>
      </div>
    </header>
  );
}
