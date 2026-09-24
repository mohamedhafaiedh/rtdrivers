import type { Metadata } from "next";
import Link from "next/link";
import NetJetsForm from "@/components/NetJetsForm";

export const metadata: Metadata = {
  title: "NetJets Bookings - RT Drivers",
  description: "Book your luxury chauffeur service with RT Drivers for NetJets flights in Paris and Île-de-France.",
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
                {/* Header */}
                <header
                  className="elementor-section elementor-inner-section elementor-element elementor-section-full_width elementor-section-content-middle"
                  style={{ backgroundColor: "#ffffff", padding: "16px 24px", borderBottom: "1px solid #e5e7eb" }}
                >
                  <div className="elementor-container elementor-column-gap-no" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", maxWidth: "1200px", margin: "0 auto" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Link href="/">
                        <img
                          fetchPriority="high"
                          decoding="async"
                          width="240"
                          height="68"
                          src="/images/cropped-Color-logo-no-background480.png"
                          alt="RT Drivers"
                          style={{ maxHeight: "55px", width: "auto" }}
                        />
                      </Link>
                    </div>
                    <div>
                      <Link
                        className="elementor-button elementor-size-xs"
                        href="/"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "8px 16px",
                          backgroundColor: "#f3f4f6",
                          color: "#374151",
                          border: "1px solid #d1d5db",
                          borderRadius: "4px",
                          fontSize: "14px",
                          textDecoration: "none",
                          fontWeight: 500
                        }}
                      >
                        <svg aria-hidden="true" width="12" height="12" viewBox="0 0 352 512" fill="currentColor">
                          <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
                        </svg>
                        <span>Cancel</span>
                      </Link>
                    </div>
                  </div>
                </header>

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
                        Book your chauffeur service
                      </h1>
                      <p style={{ color: "#6b7280", marginTop: "8px", fontSize: "15px" }}>
                        Dedicated private transport for NetJets passengers & crew
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
                        Need help ? Call us on{" "}
                        <a href="tel:+33606694497" style={{ color: "#800000", fontWeight: 600, textDecoration: "none" }}>
                          +33 6 06 69 44 97
                        </a>{" "}
                        or send an email to{" "}
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
