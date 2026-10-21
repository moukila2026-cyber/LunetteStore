import { useEffect, useState } from "react";
import { Menu, X, MapPin, ArrowUpRight } from "lucide-react";
import { navigation, shop } from "../data";
import { Brand, ExternalLink } from "./Primitives";
export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("accueil");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -60% 0px" },
    );
    navigation.forEach(([, id]) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!open) return;
    const close = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        document.getElementById("menu-toggle")?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  return (
    <>
      <div className="announcement">
        <span>UN NOUVEAU REGARD SUR VOTRE STYLE</span>
        <span className="announcement-place">
          DALOA, CÔTE D’IVOIRE <span className="gold-dot" />
        </span>
      </div>
      <header className="header">
        <div className="header-inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Navigation principale">
            {navigation.map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                className={active === id ? "active" : ""}
                aria-current={active === id ? "location" : undefined}
              >
                {label}
              </a>
            ))}
          </nav>
          <ExternalLink href={shop.maps} className="find-us">
            Nous trouver <ArrowUpRight size={17} />
          </ExternalLink>
          <button
            id="menu-toggle"
            className="menu-toggle icon-button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        <nav
          id="mobile-menu"
          className="mobile-menu"
          hidden={!open}
          aria-label="Navigation mobile"
        >
          {navigation.map(([label, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
              {label}
              <ArrowUpRight size={18} />
            </a>
          ))}
          <ExternalLink href={shop.maps} onClick={() => setOpen(false)}>
            <MapPin size={18} /> Nous trouver à Daloa
          </ExternalLink>
        </nav>
      </header>
    </>
  );
}
