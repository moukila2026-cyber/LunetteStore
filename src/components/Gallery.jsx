import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowLeft, ArrowRight, X, Plus } from "lucide-react";
import { collection, filters, shop, whatsappLink } from "../data";
import { Picture, ExternalLink, WhatsAppIcon } from "./Primitives";
export default function Gallery() {
  const [filter, setFilter] = useState(filters[0]);
  const [selected, setSelected] = useState(null);
  const dialog = useRef(null);
  const lastTrigger = useRef(null);
  const visible =
    filter === filters[0]
      ? collection
      : collection.filter((item) => item.groups.includes(filter));
  const current = selected === null ? null : visible[selected];
  const close = () => {
    dialog.current?.close();
    setSelected(null);
  };
  const step = (direction) =>
    setSelected(
      (index) => (index + direction + visible.length) % visible.length,
    );
  const handleDialogKeyDown = (event) => {
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
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  };
  useEffect(() => {
    if (selected === null) return;
    if (!dialog.current.open) dialog.current.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [selected]);
  return (
    <section id="montures" className="section collection-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">
            <span /> À CHAQUE REGARD, SA MONTURE
          </p>
          <h2>
            Trouvez votre <em>signature.</em>
          </h2>
        </div>
        <p className="section-intro">
          Classique, singulière ou résolument moderne.
          <br />
          Une monture, mille façons d’être vous.
        </p>
      </div>
      <div className="collection-toolbar">
        <div className="filters" role="group" aria-label="Filtrer les styles">
          {filters.map((label) => (
            <button
              key={label}
              className={filter === label ? "selected" : ""}
              aria-pressed={filter === label}
              onClick={() => setFilter(label)}
            >
              {label}
            </button>
          ))}
        </div>
        <span className="collection-count" aria-live="polite">
          {String(visible.length).padStart(2, "0")} inspirations
        </span>
      </div>
      <div className="collection-grid">
        {visible.map((item, index) => (
          <article
            key={item.id}
            className={`collection-card ${item.id === "care" && filter === filters[0] ? "accessory-card" : ""}`}
          >
            <button
              className="product-image"
              onClick={(event) => {
                lastTrigger.current = event.currentTarget;
                setSelected(index);
              }}
              aria-label={`Agrandir : ${item.title}`}
              aria-haspopup="dialog"
            >
              <Picture name={item.image} alt={item.alt} />
              <span className="product-label">{item.category}</span>
              <span className="zoom-icon">
                <Plus size={20} />
              </span>
            </button>
            <div className="product-copy">
              <div>
                <h3>
                  <button
                    onClick={(event) => {
                      lastTrigger.current = event.currentTarget;
                      setSelected(index);
                    }}
                    aria-haspopup="dialog"
                  >
                    {item.title}
                  </button>
                </h3>
                <p>{item.subtitle}</p>
                {item.id === "care" && filter === filters[0] && (
                  <p className="accessory-description">
                    Les essentiels pour prendre soin de vos lunettes, jour après
                    jour.
                  </p>
                )}
              </div>
              <ArrowUpRight size={20} aria-hidden="true" />
            </div>
          </article>
        ))}
      </div>
      <div className="gallery-note">
        <p>
          Visuels illustratifs générés par IA. Modèles et disponibilités à
          découvrir en boutique.
        </p>
        <a className="text-link" href="#contact">
          Votre prochaine paire vous attend à Daloa <ArrowUpRight size={17} />
        </a>
      </div>
      <dialog
        ref={dialog}
        className="lightbox"
        aria-labelledby="lightbox-title"
        onCancel={close}
        onClose={() => {
          setSelected(null);
          lastTrigger.current?.focus();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        onKeyDown={handleDialogKeyDown}
      >
        {current && (
          <div className="lightbox-content">
            <button
              className="lightbox-close icon-button"
              aria-label="Fermer la visionneuse"
              onClick={close}
              autoFocus
            >
              <X />
            </button>
            <div className="lightbox-image">
              <Picture name={current.image} alt={current.alt} />
            </div>
            <div className="lightbox-details">
              <p className="eyebrow">
                {current.category} · INSPIRATION {selected + 1} /{" "}
                {visible.length}
              </p>
              <h2 id="lightbox-title">{current.title}</h2>
              <p>{current.description}</p>
              <p className="image-disclaimer">
                Visuel illustratif généré par IA, non contractuel. Demandez les
                modèles disponibles en boutique.
              </p>
              <ExternalLink
                className="button button-green"
                href={whatsappLink(
                  shop.phones[0],
                  `Bonjour Lunette Store, j’aime le style « ${current.title} ». Quels modèles similaires sont disponibles en boutique ?`,
                )}
              >
                <WhatsAppIcon /> Se renseigner sur ce style
              </ExternalLink>
              <div className="lightbox-controls">
                <button
                  className="icon-button"
                  onClick={() => step(-1)}
                  aria-label="Image précédente"
                >
                  <ArrowLeft />
                </button>
                <span aria-live="polite">
                  {selected + 1} / {visible.length}
                </span>
                <button
                  className="icon-button"
                  onClick={() => step(1)}
                  aria-label="Image suivante"
                >
                  <ArrowRight />
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
