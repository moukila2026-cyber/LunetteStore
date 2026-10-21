import {
  Glasses,
  Focus,
  Sparkles,
  Wallet,
  Eye,
  Gift,
  ArrowUpRight,
} from "lucide-react";
const services = [
  [
    Glasses,
    "Montures tendance",
    "Un large choix de montures pour trouver le style qui vous ressemble.",
  ],
  [
    Focus,
    "Verres optiques",
    "Une gamme complète de verres unifocaux et progressifs.",
  ],
  [
    Sparkles,
    "Accessoires",
    "Cordons, étuis, produits d’entretien et accessoires pour prendre soin de vos lunettes.",
  ],
  [
    Wallet,
    "Prix accessibles",
    "Des prix pour différentes bourses et des facilités de paiement selon les conditions en magasin.",
  ],
  [
    Eye,
    "Contrôle de la vue",
    "Test de vue gratuit. Renseignez-vous en boutique sur les conditions et modalités.",
  ],
  [
    Gift,
    "Offre monture",
    "Une monture offerte pour tout achat de verres, selon les conditions à confirmer en magasin.",
  ],
];
export default function Services() {
  return (
    <section id="services" className="services-wrap">
      <div className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              <span /> BIEN PLUS QU’UNE PAIRE DE LUNETTES
            </p>
            <h2>
              Votre style. Votre confort.
              <br />
              <em>Notre attention.</em>
            </h2>
          </div>
          <a className="text-link" href="#contact">
            Parlons de vos besoins <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="services-grid">
          {services.map(([Icon, title, text], index) => (
            <article className="service" key={title}>
              <div className="service-top">
                <Icon size={30} strokeWidth={1.2} />
                <span>0{index + 1}</span>
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <p className="services-note">
          Les offres et leurs modalités sont à confirmer directement en magasin.
          Un test de vue ne remplace pas une consultation chez un ophtalmologue.
        </p>
      </div>
    </section>
  );
}
