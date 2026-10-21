// Retouches photographiques classiques uniquement. Aucun ajout génératif.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
await mkdir("public/media/shop", { recursive: true });
await mkdir("public/media/campaigns", { recursive: true });
const enhancedInterior = () =>
  sharp("public/media/originals/boutique-interieur.jpg")
    .rotate()
    .gamma(1.25)
    .modulate({ brightness: 1.18, saturation: 1.02 })
    .sharpen({ sigma: 0.5, m1: 0.35, m2: 0.7 });
await enhancedInterior()
  .jpeg({ quality: 94 })
  .toFile("public/media/shop/interieur-ameliore.jpg");
for (const width of [640, 1080]) {
  await enhancedInterior()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 87 })
    .toFile(`public/media/shop/interieur-${width}.webp`);
}
for (const name of [
  "jeu-concours",
  "test-de-vue",
  "journee-de-la-vue",
  "octobre-rose",
]) {
  const original = `public/media/originals/${name}.jpg`;
  const metadata = await sharp(original).metadata();
  console.log(name, metadata.width, metadata.height);
  await sharp(original)
    .rotate()
    .webp({ quality: 91 })
    .toFile(`public/media/campaigns/${name}.webp`);
  await sharp(original)
    .rotate()
    .resize({ width: 540, withoutEnlargement: true })
    .webp({ quality: 87 })
    .toFile(`public/media/campaigns/${name}-540.webp`);
}
