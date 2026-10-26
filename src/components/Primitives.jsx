import { ArrowUpRight } from "lucide-react";
export function Brand({ footer = false }) {
  return (
    <a
      href="#accueil"
      className={`brand ${footer ? "brand-footer" : ""}`}
      aria-label="Lunette Store — Accueil"
    >
      <img
        className="brand-logo"
        src="/brand/lunette-store.webp"
        alt="Logo Lunette Store — lunettes et lettrage bordeaux"
        width="569"
        height="308"
        loading={footer ? "lazy" : "eager"}
        decoding="async"
      />
    </a>
  );
}
export function Picture({ name, alt, className = "", hero = false, sizes }) {
  return (
    <img
      className={className}
      src={`/images/${name}-1280.webp`}
      srcSet={`/images/${name}-640.webp 640w, /images/${name}-1280.webp 1280w`}
      sizes={
        sizes ||
        (hero
          ? "(max-width: 700px) 100vw, 50vw"
          : "(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw")
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
      <path d="M20.5 11.6a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.3-4.8a8.5 8.5 0 1 1 16.2-4.1Z" />
      <path
        d="m8.7 7.5-.5-.1c-.5 0-1.1.6-1.1 1.5 0 2.3 3.7 6.1 6.6 6.1 1 0 1.7-.7 1.7-1.2l-.1-.5-2.1-1-.8.9c-1.2-.5-2.4-1.6-2.9-2.8l.8-.9-1-2Z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}
