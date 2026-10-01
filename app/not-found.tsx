import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Page introuvable - RT Drivers",
  robots: { index: false, follow: true },
};

const SHORTCUTS = [
  { href: "/nos-services/", label: "Nos services", text: "Transferts aéroports, mise à disposition, événements." },
  { href: "/notre-flotte/", label: "Notre flotte", text: "Berlines et vans haut de gamme, chauffeurs professionnels." },
  { href: "/conciergerie/", label: "Conciergerie", text: "Un service sur mesure pour vos séjours à Paris." },
];

export default function NotFound() {
  return (
    <div id="page" className="site">
      <SiteHeader />

      <main id="content" className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <p className={styles.code} aria-hidden="true">404</p>
            <h1 className={styles.title}>Cette page a pris un autre itinéraire</h1>
            <p className={styles.lead}>
              La page que vous cherchez n’existe pas ou a été déplacée. Votre chauffeur, lui, est toujours
              disponible.
            </p>
            <div className={styles.actions}>
              <Link href="/" className={styles.primary}>Retour à l’accueil</Link>
              <Link href="/reservation/" className={styles.secondary}>Réserver un trajet</Link>
            </div>
          </div>
        </section>

        <section className={styles.shortcuts} aria-labelledby="nf-shortcuts">
          <h2 id="nf-shortcuts" className={styles.shortcutsTitle}>Vous cherchiez peut-être</h2>
          <ul className={styles.cards}>
            {SHORTCUTS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={styles.card}>
                  <span className={styles.cardLabel}>{item.label}</span>
                  <span className={styles.cardText}>{item.text}</span>
                  <span className={styles.cardArrow} aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className={styles.help}>
            Besoin d’aide ? Appelez-nous au <a href="tel:0033606694497">+33 6 06 69 44 97</a> ou{" "}
            <Link href="/nous-contacter/">écrivez-nous</Link>.
          </p>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
