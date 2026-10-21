import {
  Glasses,
  Focus,
  Sparkles,
  Wallet,
  Eye,
  Gift,
  ArrowUpRight,
} from "lucide-react";
import { Picture } from "./Primitives";
const services = [
  {
    Icon: Eye,
    title: "Contrôle de la vue",
    text: "Test de vue gratuit. Renseignez-vous en boutique sur les conditions et modalités.",
    image: "craft",
    alt: "Détail illustratif d’un verre et de sa monture écaille",
    label: "TEST GRATUIT · SOUS CONDITIONS",
  },
  {
    Icon: Glasses,
    title: "Montures tendance",
    text: "Un large choix de montures pour trouver le style qui vous ressemble.",
    image: "timeless",
    alt: "Illustration de lunettes rondes écaille miel",
  },
  {
    Icon: Focus,
    title: "Verres optiques",
    text: "Une gamme complète de verres unifocaux et progressifs.",
    image: "modern",
    alt: "Illustration d’une paire de lunettes à monture fine dorée",
  },
  {
    Icon: Sparkles,
    title: "Accessoires",
    text: "Cordons, étuis, produits d’entretien et accessoires pour prendre soin de vos lunettes.",
    image: "care",
    alt: "Illustration d’un étui, d’une microfibre et d’un produit d’entretien",
  },
  {
    Icon: Wallet,
    title: "Prix accessibles",
    text: "Des prix pour différentes bourses et des facilités de paiement selon les conditions en magasin.",
    image: "women",
    alt: "Illustration d’une monture optique bordeaux translucide",
  },
  {
    Icon: Gift,
    title: "Offre monture",
    text: "Une monture offerte pour tout achat de verres, selon les conditions à confirmer en magasin.",
    image: "men",
    alt: "Illustration d’une monture à arcade écaille et cerclage doré",
    label: "OFFRE · SOUS CONDITIONS",
  },
];
export default function Services() {
  return (
    <section id="services" className="services-wrap services-photographic">
      <div className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              <span /> LE STYLE, LE CONFORT, L’ACCOMPAGNEMENT
            </p>
            <h2>
              Un regard à vous.
              <br />
              <em>Des attentions pour vous.</em>
            </h2>
          </div>
          <p className="section-intro">
            Du choix de votre monture à son entretien,
            <br />
            découvrez ce que nous proposons en boutique.
          </p>
        </div>
        <div className="services-photo-grid">
          {services.map(({ Icon, title, text, image, alt, label }, index) => (
            <article
              className={`service-card ${index === 0 ? "service-card-featured" : ""}`}
              key={title}
            >
              <a
                className="service-photo"
                href="#contact"
                aria-label={`Se renseigner : ${title}`}
              >
                <Picture name={image} alt={alt} />
                <span className="service-photo-number">0{index + 1}</span>
                {label && <span className="service-photo-label">{label}</span>}
                <span className="service-photo-arrow">
                  <ArrowUpRight size={21} />
                </span>
              </a>
              <div className="service-card-body">
                <div className="service-card-title">
                  <Icon size={23} strokeWidth={1.4} />
                  <h3>{title}</h3>
                </div>
                <p>{text}</p>
                <a className="service-card-link" href="#contact">
                  En parler avec nous <ArrowUpRight size={17} />
                </a>
              </div>
            </article>
          ))}
        </div>
        <p className="services-note">
          Visuels illustratifs générés par IA. Les offres et leurs modalités
          sont à confirmer directement en magasin. Un test de vue ne remplace
          pas une consultation chez un ophtalmologue.
        </p>
      </div>
    </section>
  );
}
