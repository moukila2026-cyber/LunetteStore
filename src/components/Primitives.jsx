import { ArrowUpRight } from "lucide-react";
export function Brand({ footer = false }) {
  return (
    <a
      href="#accueil"
      className={`brand ${footer ? "brand-footer" : ""}`}
      aria-label="Lunette Store — Accueil"
    >
      <span>
        LUNETTE<span className="brand-star">✳</span>
      </span>
      <span className="brand-small">S T O R E</span>
    </a>
  );
}
export function Picture({ name, alt, className = "", hero = false }) {
  return (
    <img
      className={className}
      src={`/images/${name}-1280.webp`}
      srcSet={`/images/${name}-640.webp 640w, /images/${name}-1280.webp 1280w`}
      sizes={
        hero
          ? "(max-width: 700px) 100vw, 50vw"
          : "(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw"
      }
      alt={alt}
      loading={hero ? "eager" : "lazy"}
      fetchPriority={hero ? "high" : undefined}
      decoding="async"
      width={hero ? 928 : 1280}
      height={hero ? 1152 : 960}
    />
  );
}
export function ExternalLink({ children, className = "", href, ...props }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      {...props}
    >
      {children}
      <span className="sr-only"> (nouvel onglet)</span>
    </a>
  );
}
export function TextLink({ href, children }) {
  return (
    <a className="text-link" href={href}>
      {children}
      <ArrowUpRight size={17} />
    </a>
  );
}
export function WhatsAppIcon({ size = 20, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.3-4.8A8.5 8.5 0 1 1 20.5 11.7Z" />
      <path d="M8.3 7.6c-.6.2-.9 1-.7 1.8.7 2.7 2.3 4.3 5 5 .8.2 1.6-.1 1.8-.7l.5-1.1-2.2-1.1-.7.8c-1.4-.5-2.2-1.3-2.7-2.7l.8-.7L9 6.7Z" />
    </svg>
  );
}
