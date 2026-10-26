import ShopPhoto from "./ShopPhoto";
import { ArrowDown, ArrowUpRight, Eye, MapPin } from "lucide-react";
import { ExternalLink, WhatsAppIcon } from "./Primitives";
import { shop, whatsappLink } from "../data";

export default function Hero() {
  return (
    <section
      id="accueil"
      className="signature-hero"
      aria-labelledby="hero-title"
    >
      <div className="signature-hero-image">
        <ShopPhoto hero sizes="100vw" />
      </div>
      <div className="signature-hero-shade" aria-hidden="true" />
      <div className="signature-hero-content">
        <p className="eyebrow">
          <span /> LUNETTE STORE · OPTIQUE À DALOA
        </p>
        <h1 id="hero-title">
          Voyez le monde.
          <br />
          <em>À votre manière.</em>
        </h1>
        <p className="signature-hero-description">
          La monture qui révèle votre personnalité.
          <br />
          Le confort visuel qui accompagne vos journées.
          <br />
          Découvrez l’univers Lunette Store.
        </p>
        <div className="signature-hero-actions">
          <a href="#montures" className="button button-champagne">
            Explorer les montures <ArrowUpRight size={19} />
          </a>
          <ExternalLink
            href={whatsappLink(shop.phones[0])}
            className="button button-glass"
          >
            <WhatsAppIcon size={21} /> Parlons sur WhatsApp
          </ExternalLink>
        </div>
        <a href="#contact" className="signature-hero-address">
          <MapPin size={17} />
          <span>Balouzon, non loin du Collège Privé Iman, Daloa</span>
        </a>
      </div>
      <a className="hero-service-seal" href="#services">
        <Eye size={28} strokeWidth={1.3} />
        <span>
          UN PREMIER PAS
          <br />
          POUR VOTRE VUE
        </span>
        <strong>
          Test de vue
          <br />
          <em>gratuit*</em>
        </strong>
        <ArrowUpRight size={19} />
      </a>
      <div className="signature-hero-bottom">
        <a href="#services">
          <span className="hero-scroll-icon">
            <ArrowDown size={19} />
          </span>{" "}
          DÉCOUVRIR NOS SERVICES
        </a>
        <p>
          * Conditions et modalités à confirmer en boutique.
          <br />
          <span>Photo de notre boutique à Daloa.</span>
        </p>
      </div>
    </section>
  );
}
