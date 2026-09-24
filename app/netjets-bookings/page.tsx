import type { Metadata } from "next";
import Link from "next/link";
import NetJetsForm from "@/components/NetJetsForm";
import ReservationHeader from "@/components/ReservationHeader";

export const metadata: Metadata = {
  title: "Réservation NetJets - RT Drivers",
  description: "Réservez votre service de chauffeur privé avec RT Drivers pour les vols NetJets à Paris et en Île-de-France.",
  alternates: {
    canonical: "/netjets-bookings/",
  },
};

export default function NetJetsBookingsPage() {
  return (
    <div className="wp-singular page-template page-template-elementor_canvas page page-id-32225 hello-elementor-default elementor-default elementor-template-canvas elementor-kit-80 elementor-page elementor-page-32225">
      <div data-elementor-type="wp-page" data-elementor-id="32225" className="elementor elementor-32225">
        <section
          data-dce-background-color="#F5F5F5"
          className="elementor-section elementor-top-section elementor-element elementor-element-ff037c1 elementor-section-full_width elementor-section-height-min-height elementor-section-items-top elementor-section-height-default"
          style={{ minHeight: "100vh", backgroundColor: "#f8f9fa", padding: "0 0 60px 0" }}
        >
          <div className="elementor-background-overlay"></div>
          <div className="elementor-container elementor-column-gap-no">
            <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-75901fc">
              <div className="elementor-widget-wrap elementor-element-populated">

                {/* Header partagé – identique à la page /reservation/ */}
                <ReservationHeader />

                {/* Main Content Box */}
                <section
                  className="elementor-section elementor-inner-section elementor-element elementor-section-boxed"
                  style={{ maxWidth: "860px", margin: "40px auto 0 auto", padding: "0 20px" }}
                >
                  <div
                    style={{
                      backgroundColor: "#ffffff",
                      borderRadius: "12px",
                      padding: "40px 32px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                      border: "1px solid #e5e7eb"
                    }}
                  >
                    <div style={{ textAlign: "center", marginBottom: "32px" }}>
                      <h1
                        className="elementor-heading-title"
                        style={{
                          fontSize: "32px",
                          fontWeight: 700,
                          color: "#231615",
                          margin: 0,
                          fontFamily: "Poppins, sans-serif"
                        }}
                      >
                        Réservation NetJets
                      </h1>
                      <p style={{ color: "#6b7280", marginTop: "8px", fontSize: "15px" }}>
                        Service de transport et transferts privés dédiés aux passagers et équipages NetJets.
                      </p>
                    </div>

                    {/* Booking Form */}
                    <NetJetsForm />

                    {/* Assistance Info */}
                    <div
                      style={{
                        marginTop: "36px",
                        paddingTop: "24px",
                        borderTop: "1px solid #e5e7eb",
                        textAlign: "center",
                        fontSize: "14px",
                        color: "#4b5563"
                      }}
                    >
                      <p style={{ margin: "0 0 12px 0" }}>
                        Besoin d&apos;aide ? Appelez le{" "}
                        <a href="tel:+33606694497" style={{ color: "#800000", fontWeight: 600, textDecoration: "none" }}>
                          +33 6 06 69 44 97
                        </a>{" "}
                        ou envoyez un e-mail à{" "}
                        <a href="mailto:contact@rtdrivers.fr" style={{ color: "#800000", fontWeight: 600, textDecoration: "none" }}>
                          contact@rtdrivers.fr
                        </a>
                      </p>
                      <p style={{ margin: 0, color: "#9ca3af" }}>
                        <Link href="/conditions-generales-de-vente/" style={{ color: "#6b7280", textDecoration: "underline" }}>
                          CGV
                        </Link>{" "}
                        –{" "}
                        <Link href="/mentions-legales/" style={{ color: "#6b7280", textDecoration: "underline" }}>
                          Mentions légales
                        </Link>
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
