import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Message envoyé - RT Drivers",
  description: "Merci pour votre message. L'équipe RT Drivers vous répondra dans les plus brefs délais.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/merci/",
  },
};

export default function MerciPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#f9fafb", color: "#231615", fontFamily: "Roboto, sans-serif" }}>
      {/* Header */}
      <header style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e5e7eb", padding: "16px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link href="/">
            <img
              src="/images/cropped-Color-logo-no-background480.png"
              alt="RT Drivers"
              style={{ maxHeight: "50px", width: "auto" }}
            />
          </Link>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 18px",
              backgroundColor: "#800000",
              color: "#ffffff",
              borderRadius: "4px",
              fontSize: "14px",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            <span>Retour à l&apos;accueil</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 20px" }}>
        <div
          style={{
            maxWidth: "600px",
            width: "100%",
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
            padding: "48px 36px",
            textAlign: "center",
          }}
        >
          {/* Success Icon */}
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              backgroundColor: "#dcfce7",
              color: "#16a34a",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "24px",
            }}
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>

          <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#231615", margin: "0 0 12px 0", fontFamily: "Poppins, sans-serif" }}>
            Merci pour votre message !
          </h1>

          <p style={{ fontSize: "16px", color: "#4b5563", lineHeight: "1.6", margin: "0 0 32px 0" }}>
            Nous vous remercions d’avoir rempli notre formulaire de contact. Notre équipe a bien pris en compte votre demande et reviendra vers vous dans les plus brefs délais.
          </p>

          {/* Quick Assistance Box */}
          <div
            style={{
              backgroundColor: "#f8f9fa",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              padding: "20px",
              textAlign: "left",
              marginBottom: "32px",
            }}
          >
            <span style={{ fontSize: "12px", textTransform: "uppercase", fontWeight: 700, color: "#800000", letterSpacing: "0.5px", display: "block", marginBottom: "10px" }}>
              Besoin d’une réponse immédiate ?
            </span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", fontSize: "14px" }}>
              <a href="tel:+33606694497" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#231615", textDecoration: "none", fontWeight: 500 }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#800000" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                <span>+33 6 06 69 44 97</span>
              </a>
              <a href="mailto:contact@rtdrivers.fr" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#231615", textDecoration: "none", fontWeight: 500 }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#800000" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                <span>contact@rtdrivers.fr</span>
              </a>
            </div>
          </div>

          <Link
            href="/"
            style={{
              display: "inline-block",
              padding: "12px 28px",
              backgroundColor: "#231615",
              color: "#ffffff",
              borderRadius: "4px",
              fontSize: "15px",
              fontWeight: 500,
              textDecoration: "none",
              transition: "background 0.2s",
            }}
          >
            Retourner au site
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: "#ffffff", borderTop: "1px solid #e5e7eb", padding: "20px", textAlign: "center", fontSize: "13px", color: "#6b7280" }}>
        <p style={{ margin: 0 }}>
          © {new Date().getFullYear()} RT Drivers — Tous droits réservés. | <Link href="/conditions-generales-de-vente/" style={{ color: "#6b7280" }}>CGV</Link> | <Link href="/mentions-legales/" style={{ color: "#6b7280" }}>Mentions légales</Link>
        </p>
      </footer>
    </div>
  );
}
