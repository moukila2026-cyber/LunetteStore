import {
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
  Navigation,
  MessageCircle,
} from "lucide-react";
import { shop, whatsappLink } from "../data";
import { ExternalLink, WhatsAppIcon } from "./Primitives";
export default function Contact() {
  return (
    <section id="contact" className="section contact-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">
            <span /> ET SI L’ON SE RENCONTRAIT ?
          </p>
          <h2>
            Votre nouveau regard
            <br />
            commence <em>ici.</em>
          </h2>
        </div>
        <p className="section-intro">
          Un conseil, une envie, une question ?<br />
          Échangeons, ou passez simplement nous voir.
        </p>
      </div>
      <div className="contact-grid">
        <div className="contact-details">
          <div className="contact-line">
            <MapPin size={22} />
            <div>
              <h3>Retrouvez-nous à Daloa</h3>
              <p>
                Balouzon, non loin du Collège Privé Iman.
                <br />
                Daloa, Côte d’Ivoire.
              </p>
            </div>
          </div>
          <div className="contact-line">
            <Phone size={22} />
            <div>
              <h3>Un appel, tout simplement</h3>
              <div className="phone-links">
                {shop.phones.map((phone) => (
                  <a
                    key={phone.international}
                    href={`tel:${phone.international}`}
                  >
                    {phone.label}
                    <ArrowUpRight size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="contact-line">
            <Mail size={22} />
            <div>
              <h3>Écrivez-nous</h3>
              <a className="email-link" href={`mailto:${shop.email}`}>
                {shop.email}
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
          <div className="whatsapp-contact">
            <p>
              <MessageCircle size={17} /> Plus simple sur WhatsApp
            </p>
            <div>
              {shop.phones.map((phone) => (
                <ExternalLink
                  key={phone.whatsapp}
                  href={whatsappLink(phone)}
                  className="contact-whatsapp-link"
                >
                  <span className="contact-whatsapp-icon">
                    <WhatsAppIcon size={24} />
                  </span>
                  <span>
                    <small>ÉCRIVEZ-NOUS</small>
                    <strong>{phone.label}</strong>
                  </span>
                  <ArrowUpRight size={18} />
                </ExternalLink>
              ))}
            </div>
            <small>
              Pour les horaires et les disponibilités, contactez la boutique
              avant votre visite.
            </small>
          </div>
        </div>
        <div className="location-card">
          <div className="location-illustration" aria-hidden="true">
            <span className="location-circle circle-one" />
            <span className="location-circle circle-two" />
            <span className="location-circle circle-three" />
            <div className="location-marker">
              <MapPin size={31} strokeWidth={1.2} />
            </div>
            <span className="location-name">DALOA</span>
            <span className="location-country">CÔTE D’IVOIRE</span>
            <span className="compass">
              N <Navigation size={20} />
            </span>
          </div>
          <div className="location-bottom">
            <div>
              <span className="eyebrow">UNE BOUTIQUE, TOUT PRÈS DE VOUS</span>
              <h3>Lunette Store · Balouzon</h3>
              <p>Non loin du Collège Privé Iman</p>
            </div>
            <ExternalLink href={shop.maps} className="button button-dark">
              Ouvrir Google Maps <ArrowUpRight size={19} />
            </ExternalLink>
            <small>
              Recherche par adresse · illustration de localisation, non
              géographique.
            </small>
          </div>
        </div>
      </div>
    </section>
  );
}
