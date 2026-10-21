import { ArrowUpRight, MessageCircle, MapPin, Glasses } from "lucide-react";
import { shop, whatsappLink } from "../data";
import { ExternalLink } from "./Primitives";
export default function VisitJourney() {
  return (
    <section className="section visit-journey" aria-labelledby="journey-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">
            <span /> VOTRE VISITE, TOUT SIMPLEMENT
          </p>
          <h2 id="journey-title">
            D’un premier message
            <br />à votre <em>prochaine monture.</em>
          </h2>
        </div>
        <p className="section-intro">
          Pas de parcours compliqué.
          <br />
          Le bon choix commence par un échange.
        </p>
      </div>
      <ol className="journey-steps">
        <li>
          <div className="journey-step-top">
            <span>01</span>
            <MessageCircle size={26} strokeWidth={1.3} />
          </div>
          <h3>Faisons connaissance.</h3>
          <p>
            Une question sur les montures, les horaires ou le test de vue ?
            Contactez-nous avant votre passage.
          </p>
          <ExternalLink
            className="text-link"
            href={whatsappLink(shop.phones[0])}
          >
            Écrire à la boutique <ArrowUpRight size={17} />
          </ExternalLink>
        </li>
        <li>
          <div className="journey-step-top">
            <span>02</span>
            <MapPin size={26} strokeWidth={1.3} />
          </div>
          <h3>Retrouvons-nous à Daloa.</h3>
          <p>
            Rendez-vous à Gogoguhe, à côté du Collège Imane. Les horaires sont à
            confirmer auprès de la boutique.
          </p>
          <ExternalLink className="text-link" href={shop.maps}>
            Trouver la boutique <ArrowUpRight size={17} />
          </ExternalLink>
        </li>
        <li>
          <div className="journey-step-top">
            <span>03</span>
            <Glasses size={26} strokeWidth={1.3} />
          </div>
          <h3>Trouvez votre évidence.</h3>
          <p>
            Découvrez les modèles disponibles et échangez en boutique pour
            choisir selon votre style, vos besoins et votre budget.
          </p>
          <a className="text-link" href="#montures">
            Explorer les inspirations <ArrowUpRight size={17} />
          </a>
        </li>
      </ol>
    </section>
  );
}
