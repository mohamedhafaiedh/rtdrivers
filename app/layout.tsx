import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://rtdrivers.fr"),
  title: "Chauffeur privé VTC à Paris et Ile-de-France - RT Drivers",
  description:
    "Pour tous déplacements en VTC à Paris, nous livrons des prestations de qualité pour une clientèle exigeante. Chez RT Drivers, votre confort est notre métier.",
  alternates: {
    canonical: "https://rtdrivers.fr/",
  },
  openGraph: {
    title: "Chauffeur privé VTC à Paris et Ile-de-France - RT Drivers",
    description:
      "Pour tous déplacements en VTC à Paris, nous livrons des prestations de qualité pour une clientèle exigeante. Chez RT Drivers, votre confort est notre métier.",
    url: "https://rtdrivers.fr/",
    siteName: "RT Drivers",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/images/cropped-Color-logo-no-background480.png",
        width: 480,
        height: 137,
        alt: "RT Drivers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chauffeur privé VTC à Paris et Ile-de-France - RT Drivers",
    description:
      "Pour tous déplacements en VTC à Paris, nous livrons des prestations de qualité pour une clientèle exigeante. Chez RT Drivers, votre confort est notre métier.",
    images: ["/images/cropped-Color-logo-no-background480.png"],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.png",
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://rtdrivers.fr/#organization",
      "name": "RT Drivers",
      "url": "https://rtdrivers.fr/",
      "logo": {
        "@type": "ImageObject",
        "@id": "https://rtdrivers.fr/#logo",
        "url": "https://rtdrivers.fr/images/cropped-Color-logo-no-background480.png",
        "contentUrl": "https://rtdrivers.fr/images/cropped-Color-logo-no-background480.png",
        "caption": "RT Drivers",
        "inLanguage": "fr-FR",
        "width": "480",
        "height": "137",
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+33606694497",
        "contactType": "customer service",
        "areaServed": "FR",
        "availableLanguage": ["French", "English"],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://rtdrivers.fr/#website",
      "url": "https://rtdrivers.fr/",
      "name": "RT Drivers",
      "publisher": {
        "@id": "https://rtdrivers.fr/#organization",
      },
      "inLanguage": "fr-FR",
    },
    {
      "@type": "WebPage",
      "@id": "https://rtdrivers.fr/#webpage",
      "url": "https://rtdrivers.fr/",
      "name": "Chauffeur privé VTC à Paris et Ile-de-France - RT Drivers",
      "about": {
        "@id": "https://rtdrivers.fr/#organization",
      },
      "isPartOf": {
        "@id": "https://rtdrivers.fr/#website",
      },
      "inLanguage": "fr-FR",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr-FR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Roboto+Slab:wght@300;400;500;600;700&family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        {/* Google Tag Manager */}
        <script
          id="gtm-script"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KKLRZL7');`,
          }}
        />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdData),
          }}
        />
      </head>
      <body className="home wp-singular page-template page-template-elementor_header_footer page page-id-31030 wp-custom-logo wp-embed-responsive wp-theme-hello-elementor wp-child-theme-hello-theme-child-master hello-elementor-default elementor-default elementor-template-full-width elementor-kit-80 elementor-page elementor-page-31030">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KKLRZL7"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
