"use client";

import React, { useState } from "react";
import Link from "next/link";

interface Vehicle {
  id: string;
  category: string;
  model: string;
  slogan: string;
  image: string;
  passengers: string;
  luggage: string;
  link: string;
}

const FLEET_DATA: Vehicle[] = [
  {
    id: "business",
    category: "Business",
    model: "Mercedes Classe E ou équivalent",
    slogan: "La qualité premium, sans compromis",
    image: "/images/E-1.png",
    passengers: "x3",
    luggage: "x3",
    link: "/reservation/",
  },
  {
    id: "van",
    category: "Van",
    model: "Mercedes Classe V ou équivalent",
    slogan: "La qualité premium, avec plus d'espace",
    image: "/images/Mercedes-V-Class.png",
    passengers: "x6",
    luggage: "x8",
    link: "/reservation/",
  },
  {
    id: "taximoto",
    category: "Taxi Moto",
    model: "Honda Goldwing ou équivalent",
    slogan: "Vos déplacements loin des bouchons",
    image: "/images/taximoto2.png",
    passengers: "x1",
    luggage: "x1",
    link: "/reservation/",
  },
  {
    id: "first",
    category: "First",
    model: "Mercedes Classe S ou équivalent",
    slogan: "Le luxe, sans limites",
    image: "/images/s.png",
    passengers: "x3",
    luggage: "x3",
    link: "/reservation/",
  },
];

const DISPLAY_ITEMS = [...FLEET_DATA, ...FLEET_DATA, ...FLEET_DATA];

export default function FleetCarousel() {
  const [startIndex, setStartIndex] = useState(0);
  const total = FLEET_DATA.length;

  const prevSlide = () => {
    setStartIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const nextSlide = () => {
    setStartIndex((prev) => (prev + 1) % total);
  };

  return (
    <div className="rt-fleet-carousel">
      {/* Navigation Arrow Left */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Véhicule précédent"
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

      {/* Navigation Arrow Right */}
      <button
        type="button"
        onClick={nextSlide}
        aria-label="Véhicule suivant"
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

      {/* Viewport & Track */}
      <div className="rt-carousel-viewport">
        <div
          className="carousel-track-3"
          style={{
            transform: `translateX(calc(-100% / var(--items-visible) * ${startIndex}))`,
          }}
        >
          {DISPLAY_ITEMS.map((vehicle, idx) => (
            <div key={`${vehicle.id}-${idx}`} className="carousel-slide-3" style={{ padding: "0 10px" }}>
              <div className="rt-fleet-card">
                {/* Vehicle Image */}
                <div className="rt-fleet-img-wrap">
                  <img
                    src={vehicle.image}
                    alt={vehicle.model}
                    className="rt-fleet-img"
                    loading="lazy"
                  />
                </div>

                {/* Details */}
                <div>
                  <span className="rt-fleet-badge">{vehicle.category}</span>
                  <h3 className="rt-fleet-title">{vehicle.model}</h3>
                  <p className="rt-fleet-slogan">{vehicle.slogan}</p>

                  <div className="rt-fleet-divider"></div>

                  {/* Passengers / Luggage Specs */}
                  <div className="rt-fleet-specs">
                    <div className="rt-fleet-spec-item">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        style={{ width: "16px", height: "16px" }}
                      >
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                      </svg>
                      <span>{vehicle.passengers}</span>
                    </div>
                    <div className="rt-fleet-spec-item">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        style={{ width: "16px", height: "16px" }}
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 3a1 1 0 011-1h6a1 1 0 011 1v1h2a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2h2V3zm2 1h4V3H8v1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{vehicle.luggage}</span>
                    </div>
                  </div>
                </div>

                {/* Reservation CTA Button */}
                <Link href={vehicle.link} className="rt-fleet-btn">
                  <span>Réserver ce véhicule</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    style={{ width: "14px", height: "14px" }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="rt-carousel-dots">
        {FLEET_DATA.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setStartIndex(i)}
            aria-label={`Véhicule ${i + 1}`}
            className={`rt-dot ${startIndex === i ? "active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}
