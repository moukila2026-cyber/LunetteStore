import { ArrowUpRight, Glasses, HeartHandshake, Sparkles } from "lucide-react";
import Hero from "./components/Hero";
import VisionExperience from "./components/VisionExperience";
import VisitJourney from "./components/VisitJourney";
import ClosingInvitation from "./components/ClosingInvitation";
import Header from "./components/Header";
import WhatsAppWidget from "./components/WhatsAppWidget";
import Editorial from "./components/Editorial";
import VisualEffects from "./components/VisualEffects";
import Gallery from "./components/Gallery";
import Services from "./components/Services";
import Contact from "./components/Contact";
import {
  Brand,
  Picture,
  ExternalLink,
  WhatsAppIcon,
} from "./components/Primitives";
import { navigation, shop, creator } from "./data";
export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        Aller au contenu
      </a>
      <VisualEffects />
      <Header />
      <main id="main">
        <Hero />
        <div className="values-strip">
          <div>
            <Glasses size={23} strokeWidth={1.25} />
            <span>Du style pour chaque regard</span>
          </div>
          <span className="strip-star">✳</span>
          <div>
            <HeartHandshake size={22} strokeWidth={1.25} />
            <span>Des conseils, en toute simplicité</span>
          </div>
          <span className="strip-star">✳</span>
          <div>
            <Sparkles size={22} strokeWidth={1.25} />
            <span>Une belle paire, à votre portée</span>
          </div>
        </div>
        <Services />
        <Gallery />
        <VisionExperience />
        <VisitJourney />
        <Editorial />
        <section id="boutique" className="brand-story">
          <div className="story-image">
            <Picture
              name="craft"
              alt="Détail illustratif d’une monture écaille ambrée sur un socle de travertin"
            />
            <div className="story-image-label">
              LE SENS DU DÉTAIL.
              <br />
              L’ESSENTIEL DU STYLE.
            </div>
            <span className="story-photo-note">
              Visuel illustratif créé par IA
            </span>
          </div>
          <div className="story-copy">
            <p className="eyebrow">
              <span /> L’ESPRIT LUNETTE STORE
            </p>
            <h2>
              Votre regard mérite
              <br />
              une attention
              <br />
              <em>particulière.</em>
            </h2>
            <div className="gold-rule" />
            <p>
              Chez Lunette Store, nous vous aidons à trouver des lunettes qui
              associent style, confort et qualité. Des montures tendance, des
              verres adaptés à vos besoins et des conseils en boutique pour
              faire le bon choix.
            </p>
            <p className="story-location">
              Ancrés à Daloa. À l’écoute de votre regard.
            </p>
            <a className="text-link" href="#contact">
              Venez faire connaissance <ArrowUpRight size={19} />
            </a>
          </div>
        </section>
        <div className="brand-manifesto">
          <span className="manifesto-star">✳</span>
          <p>
            Une monture ne change pas qui vous êtes.
            <br />
            <em>Elle le révèle.</em>
          </p>
          <span className="eyebrow">LUNETTE STORE · DALOA</span>
        </div>
        <Contact />
        <ClosingInvitation />
      </main>
      <footer className="footer">
        <div className="footer-main">
          <div className="footer-brand">
            <Brand footer />
            <p>
              Voyez le monde.
              <br />À votre manière.
            </p>
            <span>Votre boutique d’optique à Daloa.</span>
          </div>
          <div>
            <h2>EXPLORER</h2>
            <nav aria-label="Navigation de pied de page">
              {navigation.map(([label, id]) => (
                <a href={`#${id}`} key={id}>
                  {label}
                </a>
              ))}
            </nav>
          </div>
          <div>
            <h2>NOUS RETROUVER</h2>
            <p>
              Gogoguhe, à côté du Collège Imane
              <br />
              Daloa, Côte d’Ivoire
            </p>
            <ExternalLink href={shop.maps} className="text-link">
              Voir l’itinéraire <ArrowUpRight size={16} />
            </ExternalLink>
          </div>
          <div>
            <h2>RESTONS EN CONTACT</h2>
            {shop.phones.map((phone) => (
              <a
                className="footer-phone"
                key={phone.international}
                href={`tel:${phone.international}`}
              >
                {phone.label}
              </a>
            ))}
            <a className="footer-email" href={`mailto:${shop.email}`}>
              {shop.email}
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Lunette Store. Tous droits réservés.
          </span>
          <span>Le style vous appartient.</span>
          <a href="#accueil">Retour en haut ↑</a>
        </div>
        <div className="footer-credit">
          <span>
            Conçu par <strong>Shopin30</strong>
          </span>
          <span className="footer-credit-divider" aria-hidden="true">
            ·
          </span>
          <ExternalLink
            href={creator.whatsappUrl}
            aria-label="Contacter Shopin30 sur WhatsApp au +225 05 01 30 33 43"
          >
            <WhatsAppIcon size={17} />
            <span>{creator.phoneLabel}</span>
            <ArrowUpRight size={15} />
          </ExternalLink>
        </div>
      </footer>
      <WhatsAppWidget />
    </>
  );
}
