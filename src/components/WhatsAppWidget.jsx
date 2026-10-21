import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { shop, whatsappLink } from "../data";
import { ExternalLink, WhatsAppIcon } from "./Primitives";

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const root = useRef(null);
  const trigger = useRef(null);
  const closeButton = useRef(null);
  const close = (restoreFocus = false) => {
    setOpen(false);
    if (restoreFocus) trigger.current?.focus();
  };
  useEffect(() => {
    if (!open) return;
    closeButton.current?.focus({ preventScroll: true });
    const onPointerDown = (event) => {
      if (!root.current?.contains(event.target)) setOpen(false);
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus({ preventScroll: true });
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className={`whatsapp-widget ${open ? "is-open" : ""}`} ref={root}>
      <section
        id="whatsapp-panel"
        className="whatsapp-panel"
        hidden={!open}
        aria-labelledby="whatsapp-title"
      >
        <div className="whatsapp-panel-header">
          <div className="whatsapp-emblem">
            <WhatsAppIcon size={29} />
          </div>
          <span>
            LUNETTE STORE<small>LE CONSEIL, EN TOUTE SIMPLICITÉ</small>
          </span>
          <button
            ref={closeButton}
            className="whatsapp-close"
            onClick={() => close(true)}
            aria-label="Fermer le panneau WhatsApp"
          >
            <X size={19} />
          </button>
        </div>
        <div className="whatsapp-panel-body">
          <span className="eyebrow">FAISONS CONNAISSANCE</span>
          <h2 id="whatsapp-title">
            Un nouveau regard.
            <br />
            <em>Une conversation.</em>
          </h2>
          <p>
            Une monture vous plaît ? Une question sur nos services ? Écrivez à
            la boutique.
          </p>
          <div className="whatsapp-options">
            {shop.phones.map((phone, index) => (
              <ExternalLink
                className="whatsapp-option"
                href={whatsappLink(phone)}
                key={phone.whatsapp}
              >
                <span className="whatsapp-option-icon">
                  <WhatsAppIcon size={23} />
                </span>
                <span>
                  <small>CONTACT {String(index + 1).padStart(2, "0")}</small>
                  <strong>{phone.label}</strong>
                </span>
                <ArrowUpRight size={20} />
              </ExternalLink>
            ))}
          </div>
          <p className="whatsapp-panel-note">
            Choisissez un numéro pour ouvrir WhatsApp.
            <br />
            Aucun message n’est envoyé automatiquement.
          </p>
        </div>
        <div className="whatsapp-panel-footer">
          <span>✳</span> À Daloa, tout près de vous.
        </div>
      </section>
      <button
        className="whatsapp-launcher"
        ref={trigger}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="whatsapp-panel"
        aria-label={
          open ? "Fermer les contacts WhatsApp" : "Ouvrir les contacts WhatsApp"
        }
      >
        <span className="whatsapp-launcher-icon">
          {open ? <X size={24} /> : <WhatsAppIcon size={28} />}
        </span>
        <span className="whatsapp-launcher-copy">
          <small>UN CONSEIL, UNE ENVIE ?</small>
          <strong>Parlons sur WhatsApp</strong>
        </span>
        <ArrowUpRight className="whatsapp-launcher-arrow" size={18} />
      </button>
    </div>
  );
}
