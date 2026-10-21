import { useEffect, useRef } from "react";

export default function VisualEffects() {
  const progress = useRef(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      if (progress.current)
        progress.current.style.transform = `scaleX(${height > 0 ? Math.min(1, window.scrollY / height) : 0})`;
      frame = 0;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer;
    if (!motion.matches && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-revealed");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08 },
      );
      document
        .querySelectorAll(
          ".section-heading, .collection-card, .service, .editorial-item, .editorial-heading, .story-copy, .contact-details, .location-card",
        )
        .forEach((element, index) => {
          if (element.getBoundingClientRect().top > window.innerHeight) {
            element.classList.add("will-reveal");
            element.style.setProperty(
              "--reveal-delay",
              `${(index % 3) * 65}ms`,
            );
            observer.observe(element);
          }
        });
    }
    const revealAll = () => {
      if (motion.matches) {
        document
          .querySelectorAll(".will-reveal")
          .forEach((element) => element.classList.add("is-revealed"));
        observer?.disconnect();
      }
    };
    motion.addEventListener("change", revealAll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      motion.removeEventListener("change", revealAll);
      observer?.disconnect();
      document
        .querySelectorAll(".will-reveal")
        .forEach((element) => element.classList.remove("will-reveal"));
    };
  }, []);
  return <div className="reading-progress" ref={progress} aria-hidden="true" />;
}
