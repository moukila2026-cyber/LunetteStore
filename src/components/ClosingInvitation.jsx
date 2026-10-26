import { ArrowUpRight, Phone } from "lucide-react";
import { ExternalLink, WhatsAppIcon } from "./Primitives";
import { shop, whatsappLink } from "../data";
export default function ClosingInvitation() {
  return (
    <section className="closing-invitation" aria-labelledby="invitation-title">
      <span className="closing-star" aria-hidden="true">
        ✳
      </span>
      <p className="eyebrow">VOTRE REGARD MÉRITE CE PREMIER PAS</p>
      <h2 id="invitation-title">
        Et si votre prochaine paire
        <br />
        commençait par <em>un bonjour ?</em>
      </h2>
      <p>
        Une question, un conseil, une envie de changement.
        <br />
        Lunette Store vous donne rendez-vous à Daloa.
      </p>
      <div className="closing-actions">
        <ExternalLink
          className="button button-champagne"
          href={whatsappLink(shop.phones[0])}
        >
          <WhatsAppIcon size={22} /> Discuter avec la boutique{" "}
          <ArrowUpRight size={18} />
        </ExternalLink>
        <a
          className="button button-glass"
          href={`tel:${shop.phones[0].international}`}
        >
          <Phone size={18} /> Appeler
        </a>
      </div>
    </section>
  );
}
