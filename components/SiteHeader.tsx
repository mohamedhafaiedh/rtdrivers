"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./SiteHeader.module.css";

/**
 * En-tête commun à toutes les pages du site (hors tunnel de réservation,
 * qui utilise ReservationHeader).
 *
 * La disposition n'est pas figée par des points de rupture : l'en-tête mesure
 * la place réelle et retient la première disposition qui tient sur une ligne.
 *   full    : menu + téléphone avec numéro + Réservation
 *   book    : burger + téléphone avec numéro + Réservation
 *   call    : burger + téléphone avec numéro
 *   compact : burger + icône d'appel seule
 * Le menu ne s'affiche donc jamais sur deux lignes, et le numéro reste visible
 * tant qu'il a la place.
 *
 * Le burger ouvre un menu plein écran en <dialog> modal (même principe que
 * Driver Line) : focus gardé dans le menu, Échap pour fermer, page inerte derrière.
 */

const PHONE_HREF = "tel:0033606694497";
const PHONE_LABEL = "+33 6 06 69 44 97";

// NetJets Bookings est réservé à une clientèle précise : jamais dans le menu.
const MENU = [
  { href: "/nos-services/", label: "Nos services" },
  { href: "/notre-flotte/", label: "Notre flotte" },
  { href: "/conciergerie/", label: "Conciergerie" },
  { href: "/nous-contacter/", label: "Nous contacter" },
];

type Mode = "full" | "book" | "call" | "compact";

function PhoneIcon() {
  return (
    <svg aria-hidden="true" className={styles.phoneIcon} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z"></path>
    </svg>
  );
}

function Logo() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={styles.logoImg}
      src="/images/cropped-Color-logo-no-background480.png"
      alt="RT Drivers"
      width={480}
      height={137}
    />
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [mode, setMode] = useState<Mode | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const isActive = (href: string) => pathname === href || pathname === href.replace(/\/$/, "");

  // Choix de la disposition à partir des largeurs réelles (polices chargées comprises)
  const fit = useCallback(() => {
    const bar = barRef.current;
    const m = measureRef.current;
    if (!bar || !m) return;
    const w = (key: string) => m.querySelector<HTMLElement>(`[data-m="${key}"]`)?.getBoundingClientRect().width ?? 0;
    const cs = getComputedStyle(bar);
    const available = bar.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    const gap = parseFloat(cs.columnGap) || 0;
    const inner = parseFloat(getComputedStyle(m).columnGap) || 0;
    const logo = w("logo");
    const candidates: [Mode, number][] = [
      ["full", logo + gap + w("nav") + gap + w("callFull") + inner + w("book")],
      ["book", logo + gap + w("callFull") + inner + w("book") + inner + w("burger")],
      ["call", logo + gap + w("callFull") + inner + w("burger")],
    ];
    const found = candidates.find(([, need]) => need <= available);
    setMode(found ? found[0] : "compact");
  }, []);

  useLayoutEffect(() => {
    fit();
    const ro = new ResizeObserver(fit);
    if (barRef.current) ro.observe(barRef.current);
    document.fonts?.ready.then(fit);
    return () => ro.disconnect();
  }, [fit]);

  // Ouverture / fermeture du menu plein écran
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (menuOpen && !dialog.open) {
      dialog.showModal();
      closeRef.current?.focus();
    } else if (!menuOpen && dialog.open) {
      dialog.close();
    }
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  // Si la place revient pour le menu complet, le menu plein écran se ferme
  useEffect(() => {
    if (mode === "full" && dialogRef.current?.open) dialogRef.current.close();
  }, [mode]);

  const closeMenu = () => setMenuOpen(false);

  const callLink = (withNumber: boolean, extra: string) => (
    <a
      className={`${styles.call} ${extra}`}
      href={PHONE_HREF}
      aria-label={withNumber ? undefined : `Appeler le ${PHONE_LABEL}`}
    >
      <PhoneIcon />
      {withNumber && <span>{PHONE_LABEL}</span>}
    </a>
  );

  const burger = (inMenu: boolean) =>
    inMenu ? (
      <button ref={closeRef} type="button" className={`${styles.burger} ${styles.isClose}`} aria-label="Fermer le menu" onClick={closeMenu}>
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>
    ) : (
      <button
        type="button"
        className={styles.burger}
        aria-label="Ouvrir le menu"
        aria-expanded={menuOpen}
        aria-controls="site-menu"
        onClick={() => setMenuOpen(true)}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>
    );

  // Barre d'en-tête, rendue dans l'en-tête et en haut du menu : la croix tombe à la place du burger
  const bar = (inMenu: boolean) => (
    <div ref={inMenu ? undefined : barRef} className={styles.bar}>
      <Link href="/" className={styles.logo} onClick={inMenu ? closeMenu : undefined}>
        <Logo />
      </Link>

      {!inMenu && (
        <nav className={styles.nav} aria-label="Menu principal">
          <ul>
            {MENU.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link href={item.href} className={active ? styles.active : undefined} aria-current={active ? "page" : undefined}>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}

      <div className={styles.actions}>
        {callLink(true, styles.callFull)}
        {callLink(false, styles.callShort)}
        {!inMenu && (
          <Link href="/reservation/" className={styles.book}>
            Réservation
          </Link>
        )}
        {burger(inMenu)}
      </div>
    </div>
  );

  return (
    <>
      <header className={styles.header} data-mode={mode ?? undefined}>
        {bar(false)}

        {/* Copie invisible qui sert uniquement à mesurer la largeur naturelle de chaque bloc */}
        <div ref={measureRef} className={styles.measure} aria-hidden="true">
          <span data-m="logo" className={styles.logo}><Logo /></span>
          <span data-m="nav" className={styles.nav}>
            <ul>
              {MENU.map((item) => (
                <li key={item.href}><span className={styles.navItem}>{item.label}</span></li>
              ))}
            </ul>
          </span>
          <span data-m="callFull" className={styles.call}><PhoneIcon /><span>{PHONE_LABEL}</span></span>
          <span data-m="book" className={styles.book}>Réservation</span>
          <span data-m="burger" className={styles.burger} />
        </div>
      </header>

      <dialog id="site-menu" ref={dialogRef} className={styles.dialog} aria-label="Menu" onClose={closeMenu} data-mode={mode ?? undefined}>
        {bar(true)}
        <nav className={styles.menu} aria-label="Menu mobile">
          <ul>
            {MENU.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={active ? styles.active : undefined}
                    aria-current={active ? "page" : undefined}
                    onClick={closeMenu}
                  >
                    {item.label}
                    <svg aria-hidden="true" className={styles.arrow} viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className={styles.menuActions}>
            <Link href="/reservation/" className={styles.menuPrimary} onClick={closeMenu}>
              Réserver un trajet
            </Link>
            <a href={PHONE_HREF} className={styles.menuSecondary}>
              <PhoneIcon />
              {PHONE_LABEL}
            </a>
          </div>
        </nav>
      </dialog>
    </>
  );
}
