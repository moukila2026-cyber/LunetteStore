import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Glasses,
  HeartHandshake,
  Sparkles,
  Phone,
} from "lucide-react";
import Header from "./components/Header";
import Gallery from "./components/Gallery";
import Services from "./components/Services";
import Contact from "./components/Contact";
import {
  Brand,
  Picture,
  ExternalLink,
  WhatsAppIcon,
} from "./components/Primitives";
import { navigation, shop, whatsappLink } from "./data";
export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        Aller au contenu
      </a>
      <Header />
      <main id="main">
        <section id="accueil" className="hero">
          <div className="hero-copy">
            <p className="eyebrow">
              <span /> VOTRE OPTICIEN À DALOA
            </p>
            <h1>
              Voyez le monde.
              <br />
              <em>
                À votre
                <br className="desktop-break" /> manière.
              </em>
            </h1>
            <p className="hero-description">
              La monture qui révèle votre personnalité.
              <br className="desktop-break" /> Le confort visuel qui accompagne
              vos journées.
              <br className="desktop-break" /> Découvrez l’univers Lunette
              Store.
            </p>
            <div className="hero-actions">
              <a className="button button-dark" href="#montures">
                Explorer les montures <ArrowUpRight size={18} />
              </a>
              <a className="text-link" href="#contact">
                Nous rendre visite <ArrowRight size={17} />
              </a>
            </div>
            <a className="hero-address" href="#contact">
              <MapPin size={17} />
              <span>Gogoguhe, à côté du Collège Imane, Daloa</span>
            </a>
          </div>
          <div className="hero-visual">
            <Picture
              name="editorial"
              alt="Portrait éditorial illustratif d’une femme portant des lunettes de soleil écaille"
              hero
            />
            <span className="hero-vertical">
              LUNETTE STORE — L’ART DE VOIR AUTREMENT
            </span>
            <div className="hero-caption">
              <span>
                LE STYLE SE VOIT.
                <br />
                LA CONFIANCE SE RESSENT.
              </span>
              <a
                href="#montures"
                aria-label="Découvrir nos inspirations de montures"
              >
                <ArrowUpRight size={27} strokeWidth={1.2} />
              </a>
            </div>
            <span className="hero-photo-note">
              Visuel éditorial créé par IA
            </span>
          </div>
        </section>
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
        <Gallery />
        <section id="boutique" className="brand-story">
          <div className="story-image">
            <Picture
              name="timeless"
              alt="Composition illustrative de lunettes écaille sur une surface de pierre claire"
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
        <Services />
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
      </footer>
      <ExternalLink
        href={whatsappLink(shop.phones[0])}
        className="floating-whatsapp"
        aria-label="Discuter avec Lunette Store sur WhatsApp"
      >
        <WhatsAppIcon size={26} />
        <span>Une question ?</span>
      </ExternalLink>
      <div className="mobile-contact-bar">
        <a href={`tel:${shop.phones[0].international}`}>
          <Phone size={18} /> Appeler
        </a>
        <ExternalLink href={whatsappLink(shop.phones[0])}>
          <WhatsAppIcon /> WhatsApp
        </ExternalLink>
      </div>
    </>
  );
}
