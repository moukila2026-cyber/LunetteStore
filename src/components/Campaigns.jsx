import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Maximize2,
  X,
} from "lucide-react";
import { campaigns } from "../campaigns";
import { shop, whatsappLink } from "../data";
import { ExternalLink, WhatsAppIcon } from "./Primitives";

function Poster({ campaign, enlarged = false }) {
  return (
    <img
      src={`/media/campaigns/${campaign.id}.webp`}
      srcSet={`/media/campaigns/${campaign.id}-540.webp 540w, /media/campaigns/${campaign.id}.webp 1080w`}
      sizes={
        enlarged
          ? "(max-width: 700px) 95vw, 50vw"
          : "(max-width: 600px) 90vw, (max-width: 1100px) 45vw, 24vw"
      }
      alt={campaign.alt}
      width={campaign.width}
      height={campaign.height}
      loading={enlarged ? "eager" : "lazy"}
      decoding="async"
    />
  );
}
export default function Campaigns() {
  const [selected, setSelected] = useState(null);
  const dialog = useRef(null);
  const trigger = useRef(null);
  const current = selected === null ? null : campaigns[selected];
  const open = (index, element) => {
    trigger.current = element;
    setSelected(index);
  };
  const close = () => {
    dialog.current?.close();
    setSelected(null);
  };
  const step = (amount) =>
    setSelected(
      (index) => (index + amount + campaigns.length) % campaigns.length,
    );
  useEffect(() => {
    if (selected === null) return;
    if (!dialog.current.open) dialog.current.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [selected]);
  const handleKeys = (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
    }
    if (event.key === "Tab") {
      const items = dialog.current.querySelectorAll("button, a[href]");
      const first = items[0],
        last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  };
  return (
    <section
      id="actualites"
      className="campaign-section"
      aria-labelledby="campaign-heading"
    >
      <div className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              <span /> LES NOUVELLES DE LUNETTE STORE
            </p>
            <h2 id="campaign-heading">
              Une boutique vivante.
              <br />
              <em>Des messages à partager.</em>
            </h2>
          </div>
          <p className="section-intro">
            Nos campagnes, nos offres et nos attentions.
            <br />
            Découvrez les affiches de la boutique.
          </p>
        </div>
        <div className="campaign-grid">
          {campaigns.map((campaign, index) => (
            <article className="campaign-card" key={campaign.id}>
              <button
                className="campaign-poster"
                aria-label={`Agrandir l’affiche : ${campaign.label}`}
                aria-haspopup="dialog"
                onClick={(event) => open(index, event.currentTarget)}
              >
                <span className="campaign-artwork">
                  <Poster campaign={campaign} />
                </span>
                <span className="campaign-enlarge">
                  <Maximize2 size={15} /> Voir l’affiche
                </span>
              </button>
              <div className="campaign-card-copy">
                <p className="campaign-label">{campaign.label}</p>
                <h3>{campaign.title}</h3>
                <p>{campaign.summary}</p>
                <button
                  className="campaign-detail-link"
                  onClick={(event) => open(index, event.currentTarget)}
                  aria-haspopup="dialog"
                >
                  Découvrir les détails <ArrowUpRight size={17} />
                </button>
              </div>
            </article>
          ))}
        </div>
        <p className="campaign-source-note">
          Affiches fournies par Lunette Store. Dates, validité des offres et
          modalités à confirmer auprès de la boutique. Cliquez sur une affiche
          pour l’agrandir.
        </p>
        <dialog
          ref={dialog}
          className="campaign-dialog"
          aria-labelledby="campaign-dialog-title"
          onCancel={close}
          onClose={() => {
            setSelected(null);
            trigger.current?.focus();
          }}
          onClick={(event) => {
            if (event.target === event.currentTarget) close();
          }}
          onKeyDown={handleKeys}
        >
          {current && (
            <>
              <div className="campaign-dialog-toolbar">
                <button
                  autoFocus
                  className="campaign-close icon-button"
                  onClick={close}
                  aria-label="Fermer l’affiche"
                >
                  <X />
                </button>
              </div>
              <div className="campaign-dialog-content">
                <div className="campaign-dialog-image">
                  <Poster campaign={current} enlarged />
                </div>
                <div className="campaign-dialog-details">
                  <p className="eyebrow">{current.label}</p>
                  <h2 id="campaign-dialog-title">{current.title}</h2>
                  <p>{current.description}</p>
                  <p className="campaign-notice">{current.notice}</p>
                  <ExternalLink
                    className="button button-green"
                    href={whatsappLink(shop.phones[0], current.message)}
                  >
                    <WhatsAppIcon size={21} />
                    {current.action}
                    <ArrowUpRight size={17} />
                  </ExternalLink>
                  <ExternalLink
                    className="campaign-original-link"
                    href={`/media/campaigns/${current.id}.webp`}
                  >
                    Ouvrir l’image en grand <Maximize2 size={15} />
                  </ExternalLink>
                  <div className="campaign-controls">
                    <button
                      className="icon-button"
                      aria-label="Affiche précédente"
                      onClick={() => step(-1)}
                    >
                      <ArrowLeft />
                    </button>
                    <span aria-live="polite">
                      {selected + 1} / {campaigns.length}
                    </span>
                    <button
                      className="icon-button"
                      aria-label="Affiche suivante"
                      onClick={() => step(1)}
                    >
                      <ArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </dialog>
      </div>
    </section>
  );
}
