import type { Metadata } from "next";
import ReservationHeader from "@/components/ReservationHeader";

export const metadata: Metadata = {
  title: "Réservation de Chauffeur VTC en Ligne - RT Drivers",
  description: "Annuler Obtenez une estimation et réservez Besoin d'aide ? Appelez le +33 6 06 69 44 97ou envoyez un e-mail à contact@rtdrivers.fr CGV – Mentions légales",
  alternates: {
    canonical: "/reservation/",
  },
};

export default function ReservationPage() {
  return (
    <div className="wp-singular page-template page-template-elementor_canvas page page-id-190 wp-custom-logo wp-embed-responsive wp-theme-hello-elementor wp-child-theme-hello-theme-child-master hello-elementor-default elementor-default elementor-template-canvas elementor-kit-80 elementor-page elementor-page-190">

      <div data-elementor-type="wp-page" data-elementor-id="190" className="elementor elementor-190" data-elementor-post-type="page">
        <section data-dce-background-color="#F5F5F5" className="elementor-section elementor-top-section elementor-element elementor-element-ff037c1 elementor-section-full_width elementor-section-height-min-height elementor-section-items-top elementor-section-height-default" data-id="ff037c1" data-element_type="section" data-e-type="section" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
          <div className="elementor-background-overlay"></div>
          <div className="elementor-container elementor-column-gap-no">
            <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-75901fc" data-id="75901fc" data-element_type="column" data-e-type="column">
              <div className="elementor-widget-wrap elementor-element-populated">

                {/* Header partagé – identique à la page /netjets-bookings/ */}
                <ReservationHeader />

                <section className="elementor-section elementor-inner-section elementor-element elementor-element-ad37af3 elementor-section-boxed elementor-section-height-default elementor-section-height-default" data-id="ad37af3" data-element_type="section" data-e-type="section" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
                  <div className="elementor-container elementor-column-gap-default">
                    <div data-dce-background-color="#FFFFFF" className="elementor-column elementor-col-100 elementor-inner-column elementor-element elementor-element-dd9ddcd" data-id="dd9ddcd" data-element_type="column" data-e-type="column" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
                      <div className="elementor-widget-wrap elementor-element-populated">
                        <div data-dce-title-color="#231615" className="elementor-element elementor-element-b6fad58 elementor-widget elementor-widget-heading" data-id="b6fad58" data-element_type="widget" data-e-type="widget" data-widget_type="heading.default">
                          <div className="elementor-widget-container">
                            <h1 className="elementor-heading-title elementor-size-default">Obtenez une estimation et réservez</h1>
                          </div>
                        </div>
                        <div className="elementor-element elementor-element-210f469 elementor-widget elementor-widget-shortcode" data-id="210f469" data-element_type="widget" data-e-type="widget" data-widget_type="shortcode.default">
                          <div className="elementor-widget-container">
                            <div className="elementor-shortcode">
                              <iframe
                                src="https://app.rtdrivers.fr/booking?site_key=f2a1237c618ca12fbd281b71444cd37f&lang=fr-FR"
                                name="eto-iframe"
                                id="eto-iframe-65773"
                                className="eto-iframe"
                                width="100%"
                                height="700"
                                style={{ width: "100%", minHeight: "650px", border: "0" }}
                                scrolling="auto"
                                allow="geolocation"
                              >
                                Votre navigateur ne prend pas en charge les cadres en ligne.
                              </iframe>
                            </div>
                          </div>
                        </div>
                        <div className="elementor-element elementor-element-ff55eed elementor-widget elementor-widget-text-editor" data-id="ff55eed" data-element_type="widget" data-e-type="widget" data-widget_type="text-editor.default">
                          <div className="elementor-widget-container">
                            <p>Besoin d&apos;aide ? Appelez le <a href="tel:+33606694497">+33 6 06 69 44 97</a><br />ou envoyez un e-mail à <a href="mailto:contact@rtdrivers.fr">contact@rtdrivers.fr</a></p>
                          </div>
                        </div>
                        <div className="elementor-element elementor-element-4e94a32 elementor-widget__width-inherit elementor-widget elementor-widget-text-editor" data-id="4e94a32" data-element_type="widget" data-e-type="widget" data-widget_type="text-editor.default">
                          <div className="elementor-widget-container">
                            <p><a href="/conditions-generales-de-vente/" target="_blank" rel="noopener">CGV</a> – <a href="/mentions-legales/" target="_blank" rel="noopener">Mentions légales</a></p>
                          </div>
                        </div>
                      </div>
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
