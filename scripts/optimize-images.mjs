import sharp from "sharp";
import { mkdir } from "node:fs/promises";
await mkdir("public/images", { recursive: true });
for (const name of [
  "editorial",
  "timeless",
  "modern",
  "bold",
  "women",
  "men",
  "kids",
  "care",
  "editorial-man",
  "editorial-woman",
  "sunlight",
  "craft",
]) {
  for (const width of [640, 1280]) {
    await sharp(`source-assets/${name}.png`)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 83 })
      .toFile(`public/images/${name}-${width}.webp`);
  }
}
