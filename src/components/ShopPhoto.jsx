export default function ShopPhoto({
  hero = false,
  sizes = "(max-width: 700px) 100vw, 50vw",
}) {
  return (
    <img
      src="/media/shop/interieur-1080.webp"
      srcSet="/media/shop/interieur-640.webp 640w, /media/shop/interieur-1080.webp 1080w"
      sizes={sizes}
      alt="Intérieur de Lunette Store à Daloa : montures exposées, miroir et décoration murale rouge et blanche"
      width="1080"
      height="1094"
      loading={hero ? "eager" : "lazy"}
      fetchPriority={hero ? "high" : undefined}
      decoding="async"
    />
  );
}
