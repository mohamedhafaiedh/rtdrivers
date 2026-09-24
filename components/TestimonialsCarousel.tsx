"use client";

import React, { useState } from "react";

interface Review {
  id: string;
  name: string;
  date: string;
  text: string;
  avatar: string;
}

const REVIEWS_DATA: Review[] = [
  {
    id: "rev-1",
    name: "Julien Cristofini",
    date: "13 Décembre 2022",
    text: "Aller retour Paris Orly. 2 chauffeurs ponctuels, professionnels, service impeccable.",
    avatar: "/images/ti_asset_1.png",
  },
  {
    id: "rev-2",
    name: "Fanny IRIBARNE",
    date: "10 Septembre 2022",
    text: "Très bonne expérience, merci beaucoup pour votre disponibilité et votre sérieux.",
    avatar: "/images/ti_asset_6.png",
  },
  {
    id: "rev-3",
    name: "Pierre Demondion",
    date: "8 Mai 2022",
    text: "Tout est toujours parfait. Je recommande sincèrement pour tous déplacements à Paris.",
    avatar: "/images/ti_asset_2.png",
  },
  {
    id: "rev-4",
    name: "Ris Trett",
    date: "20 Avril 2022",
    text: "Chauffeur ponctuel et sympa ! Véhicule très propre et confortable. Je recommande.",
    avatar: "/images/ti_asset_9.png",
  },
  {
    id: "rev-5",
    name: "Lluis Font Vizcarra",
    date: "18 Avril 2022",
    text: "Acabamos de volver de Paris-Disneyland habiendo utilizado su servicio de transfer en 3 ocasiones: aeropuerto-Paris, París-Disney y Disney-aeropuerto. Todo perfecto, profesionales y serios. Totalmente recomendable.",
    avatar: "/images/ti_asset_0.png",
  },
  {
    id: "rev-6",
    name: "Ludivine G",
    date: "14 Mars 2022",
    text: "Course parfaite. Ramzi toujours très pro et sympa pour nous accueillir à l'aéroport. Van impeccable pour accueillir toute la famille. Je recommande à 200%",
    avatar: "/images/ti_asset_7.png",
  },
  {
    id: "rev-7",
    name: "Myo MC",
    date: "26 Janvier 2022",
    text: "Service irréprochable. Chauffeur très avenant et agréable. Véhicule haut de gamme.",
    avatar: "/images/ti_asset_5.png",
  },
  {
    id: "rev-8",
    name: "Telemiomio Telemio",
    date: "18 Janvier 2022",
    text: "Le chauffeur Amar B. était à l'heure prévue. Accueillant et très aimable nous a pris en charge jusqu'à l'aéroport. Service sérieux et professionnel. Merci beaucoup !",
    avatar: "/images/ti_asset_3.png",
  },
];

const DISPLAY_REVIEWS = [...REVIEWS_DATA, ...REVIEWS_DATA, ...REVIEWS_DATA];

export default function TestimonialsCarousel() {
  const [startIndex, setStartIndex] = useState(0);
  const total = REVIEWS_DATA.length;

  const prevSlide = () => {
    setStartIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const nextSlide = () => {
    setStartIndex((prev) => (prev + 1) % total);
  };

  return (
    <div className="rt-testimonials-section">
      {/* Google Trustindex Header Badge */}
      <div className="rt-ti-header-badge">
        <div className="rt-ti-left">
          <svg
            className="rt-ti-logo-google"
            width="38"
            height="38"
            viewBox="0 0 24 24"
            style={{ width: "38px", height: "38px", minWidth: "38px", minHeight: "38px" }}
          >
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <div>
            <div className="rt-ti-score-row">
              <span className="rt-ti-score-text">EXCELLENT</span>
              <div className="rt-ti-stars">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    width="18"
                    height="18"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    style={{ width: "18px", height: "18px" }}
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <div className="rt-ti-subtext">
              Note 5.0 / 5 • Basée sur <strong>42 avis Google vérifiés</strong>
            </div>
          </div>
        </div>

        <div className="rt-ti-pill">Avis 100% réels</div>
      </div>

      {/* Carousel Track Container */}
      <div style={{ position: "relative", width: "100%" }}>
        {/* Navigation Left */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Avis précédent"
          className="rt-carousel-btn btn-prev"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            style={{ width: "20px", height: "20px" }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Navigation Right */}
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Avis suivant"
          className="rt-carousel-btn btn-next"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            style={{ width: "20px", height: "20px" }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Viewport */}
        <div className="rt-carousel-viewport">
          <div
            className="carousel-track-3"
            style={{
              transform: `translateX(calc(-100% / var(--items-visible) * ${startIndex}))`,
            }}
          >
            {DISPLAY_REVIEWS.map((review, idx) => (
              <div key={`${review.id}-${idx}`} className="carousel-slide-3" style={{ padding: "0 10px" }}>
                <div className="rt-review-card">
                  <div>
                    {/* Header: Avatar, Name, Date, Google Logo */}
                    <div className="rt-review-top">
                      <div className="rt-review-author-wrap">
                        <img
                          src={review.avatar}
                          alt={review.name}
                          className="rt-review-avatar"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.target as HTMLElement;
                            target.style.display = "none";
                            const fallback = target.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = "flex";
                          }}
                        />
                        <div
                          className="rt-review-fallback-avatar"
                          style={{ display: "none" }}
                        >
                          {review.name.charAt(0)}
                        </div>

                        <div>
                          <h4 className="rt-review-author-name">{review.name}</h4>
                          <span className="rt-review-date">{review.date}</span>
                        </div>
                      </div>

                      {/* Google G Icon */}
                      <svg
                        className="rt-review-g-icon"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        style={{ width: "20px", height: "20px" }}
                      >
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                      </svg>
                    </div>

                    {/* 5 Stars */}
                    <div className="rt-review-stars">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          width="15"
                          height="15"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          style={{ width: "15px", height: "15px" }}
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    {/* Review text */}
                    <p className="rt-review-body">
                      "{review.text}"
                    </p>
                  </div>

                  {/* Verified Footer */}
                  <div className="rt-review-footer">
                    <span className="rt-review-verified">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        style={{ width: "14px", height: "14px" }}
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Avis vérifié Google
                    </span>
                    <span>Source Google</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="rt-carousel-dots">
          {REVIEWS_DATA.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setStartIndex(i)}
              aria-label={`Avis ${i + 1}`}
              className={`rt-dot ${startIndex === i ? "active" : ""}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
