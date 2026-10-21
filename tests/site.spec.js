import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("page, images, SEO et absence de débordement", async ({ page }) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page).toHaveTitle(/Lunette Store Daloa/);
  await expect(page.locator("html")).toHaveAttribute("lang", "fr");
  await expect(page.locator("h1")).toHaveText(
    "Voyez le monde.À votre manière.",
  );
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    /Daloa/,
  );
  await expect(page.locator(".collection-card")).toHaveCount(7);
  for (const image of await page.locator("img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() => image.evaluate((img) => img.complete && img.naturalWidth > 0))
      .toBe(true);
  }
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  expect(errors).toEqual([]);
});

test("filtres et visionneuse avec navigation clavier et retour du focus", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Enfants", exact: true }).click();
  await expect(page.locator(".collection-card")).toHaveCount(1);
  await expect(
    page.getByRole("button", { name: "Enfants", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  const trigger = page.getByRole("button", {
    name: "Agrandir : Lunettes pour enfants",
    exact: true,
  });
  await trigger.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.locator("#lightbox-title")).toHaveText(
    "Lunettes pour enfants",
  );
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await page
    .getByRole("button", { name: "Tout découvrir", exact: true })
    .click();
  await page
    .getByRole("button", {
      name: "Agrandir : Élégance intemporelle",
      exact: true,
    })
    .click();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator("#lightbox-title")).toHaveText("Montures modernes");
  await page.keyboard.press("ArrowLeft");
  await expect(page.locator("#lightbox-title")).toHaveText(
    "Élégance intemporelle",
  );
  await page.getByRole("button", { name: "Image précédente" }).click();
  await expect(page.locator("#lightbox-title")).toHaveText(
    "Accessoires et entretien",
  );
  const href = await page
    .getByRole("dialog")
    .getByRole("link", { name: /Se renseigner/ })
    .getAttribute("href");
  expect(new URL(href).searchParams.get("text")).toContain(
    "Accessoires et entretien",
  );
  await page.getByRole("button", { name: "Fermer la visionneuse" }).click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
});

test("coordonnées, WhatsApp prérempli, email et recherche Maps", async ({
  page,
}) => {
  await page.goto("/");
  const contact = page.locator("#contact");
  for (const [phone, number] of [
    ["01 01 16 21 37", "2250101162137"],
    ["07 13 58 23 57", "2250713582357"],
  ]) {
    await expect(contact.locator(`a[href="tel:+${number}"]`)).toHaveText(phone);
    const whatsapp = contact.locator(`a[href^="https://wa.me/${number}"]`);
    await expect(whatsapp).toBeVisible();
    expect(
      new URL(await whatsapp.getAttribute("href")).searchParams.get("text"),
    ).toBe(
      "Bonjour Lunette Store, je souhaite obtenir des informations sur vos montures et vos services.",
    );
  }
  await expect(
    contact.locator('a[href="mailto:lunettestore875@gmail.com"]'),
  ).toBeVisible();
  const maps = new URL(
    await contact
      .getByRole("link", { name: /Ouvrir Google Maps/ })
      .getAttribute("href"),
  );
  expect(maps.searchParams.get("query")).toContain("Gogoguhe");
  expect(maps.searchParams.get("query")).toContain("Collège Imane");
  expect(maps.searchParams.get("query")).toContain("Daloa");
  for (const anchor of await page.locator('a[href^="#"]').all()) {
    const id = await anchor.getAttribute("href");
    expect(id).not.toBe("#");
    await expect(page.locator(id)).toHaveCount(1);
  }
});

test("navigation mobile ou bureau", async ({ page, isMobile }) => {
  await page.goto("/");
  if (isMobile) {
    const toggle = page.getByRole("button", { name: "Ouvrir le menu" });
    await toggle.click();
    await expect(page.locator("#mobile-menu")).toBeVisible();
    await page
      .locator("#mobile-menu")
      .getByRole("link", { name: "Nos services" })
      .click();
    await expect(page).toHaveURL(/#services$/);
    await expect(page.locator("#mobile-menu")).not.toBeVisible();
    await toggle.click();
    await page.keyboard.press("Escape");
    await expect(page.locator("#mobile-menu")).not.toBeVisible();
    await expect(toggle).toBeFocused();
    await expect(page.locator(".whatsapp-launcher")).toBeVisible();
  } else {
    await page
      .getByRole("navigation", { name: "Navigation principale", exact: true })
      .getByRole("link", { name: "Nos montures" })
      .click();
    await expect(page).toHaveURL(/#montures$/);
  }
});

test("accessibilité WCAG A/AA de la page et de la visionneuse", async ({
  page,
}) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(result.violations).toEqual([]);
  await page
    .getByRole("button", {
      name: "Agrandir : Élégance intemporelle",
      exact: true,
    })
    .click();
  const dialogResult = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(dialogResult.violations).toEqual([]);
});

test("captures de contrôle", async ({ page }, testInfo) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  for (const image of await page.locator("img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() => image.evaluate((img) => img.complete && img.naturalWidth > 0))
      .toBe(true);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({
    path: testInfo.outputPath("page.png"),
    fullPage: true,
    animations: "disabled",
  });
  await page
    .getByRole("button", { name: "Ouvrir les contacts WhatsApp" })
    .click();
  await page.screenshot({
    path: testInfo.outputPath("whatsapp.png"),
    animations: "disabled",
  });
});

test("toutes les catégories et focus contenu dans la fenêtre modale", async ({
  page,
}) => {
  await page.goto("/");
  for (const [name, count] of [
    ["Optiques", 5],
    ["Solaires", 1],
    ["Femmes", 4],
    ["Hommes", 4],
    ["Enfants", 1],
    ["Accessoires", 1],
    ["Tout découvrir", 7],
  ]) {
    await page.getByRole("button", { name, exact: true }).click();
    await expect(page.locator(".collection-card")).toHaveCount(count);
  }
  await page
    .getByRole("button", {
      name: "Agrandir : Élégance intemporelle",
      exact: true,
    })
    .click();
  for (let n = 0; n < 8; n++) {
    await page.keyboard.press("Tab");
    expect(
      await page.evaluate(() => !!document.activeElement.closest("dialog")),
    ).toBe(true);
  }
});

test("responsive de 320 px à 1920 px", async ({ page }) => {
  await page.goto("/");
  for (const width of [320, 375, 768, 1024, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }
});

test("contenu statique accessible sans JavaScript", async ({ request }) => {
  const response = await request.get("/");
  expect(response.status()).toBe(200);
  const html = await response.text();
  expect(html).toContain("Votre nouveau regard");
  expect(html).toContain("tel:+2250101162137");
  expect(html).toContain("application/ld+json");
});

test("WhatsApp flottant : deux contacts, clavier, fermeture et accessibilité", async ({
  page,
}) => {
  await page.goto("/");
  const trigger = page.locator(".whatsapp-launcher");
  const panel = page.getByRole("region", {
    name: "Un nouveau regard. Une conversation.",
  });
  await expect(page.locator("#whatsapp-panel")).not.toBeVisible();
  await trigger.click();
  await expect(panel).toBeVisible();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(
    page.getByRole("button", { name: "Fermer le panneau WhatsApp" }),
  ).toBeFocused();
  for (const number of ["2250101162137", "2250713582357"]) {
    const link = panel.locator(`a[href^="https://wa.me/${number}"]`);
    await expect(link).toBeVisible();
    expect(
      new URL(await link.getAttribute("href")).searchParams.get("text"),
    ).toContain("Bonjour Lunette Store");
  }
  const accessibility = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(accessibility.violations).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(panel).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page
    .getByRole("button", { name: "Fermer le panneau WhatsApp" })
    .click();
  await expect(panel).not.toBeVisible();
  await trigger.click();
  await page.mouse.click(6, 6);
  await expect(panel).not.toBeVisible();
  await page.locator("footer").scrollIntoViewIfNeeded();
  await expect(trigger).toBeInViewport();
});

test("WhatsApp ouvert sur petits écrans et en paysage", async ({ page }) => {
  await page.goto("/");
  for (const [width, height] of [
    [320, 568],
    [390, 844],
    [844, 390],
  ]) {
    await page.setViewportSize({ width, height });
    await page
      .getByRole("button", { name: "Ouvrir les contacts WhatsApp" })
      .click();
    const panel = page.locator("#whatsapp-panel");
    const box = await panel.boundingBox();
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.y).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(width);
    expect(box.y + box.height).toBeLessThanOrEqual(height);
    await panel.locator("a").last().scrollIntoViewIfNeeded();
    await expect(panel.locator("a").last()).toBeInViewport();
    await page.keyboard.press("Escape");
  }
});

test("les animations révèlent le contenu et respectent la réduction de mouvement", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const portrait = page.locator(".editorial-man");
  await portrait.scrollIntoViewIfNeeded();
  await expect(portrait).toHaveClass(/is-revealed/);
  await expect(portrait).toHaveCSS("opacity", "1");
  await page.emulateMedia({ reducedMotion: "reduce" });
  const card = page.locator(".location-card");
  await expect(card).toHaveCSS("opacity", "1");
});

test("signature Shopin30 et lien WhatsApp distinct de la boutique", async ({
  page,
}) => {
  await page.goto("/");
  const credit = page.locator(".footer-credit");
  await credit.scrollIntoViewIfNeeded();
  await expect(credit).toContainText("Conçu par Shopin30");
  const link = credit.getByRole("link", { name: /Contacter Shopin30/ });
  await expect(link).toBeVisible();
  await expect(link).toContainText("+225 05 01 30 33 43");
  const url = new URL(await link.getAttribute("href"));
  expect(url.hostname).toBe("wa.me");
  expect(url.pathname).toBe("/2250501303343");
  expect(url.searchParams.get("text")).toContain("Bonjour Shopin30");
  await expect(page.locator('#contact a[href*="2250501303343"]')).toHaveCount(
    0,
  );
  await expect(
    page.locator('#whatsapp-panel a[href*="2250501303343"]'),
  ).toHaveCount(0);
});

test("démonstration de netteté : curseur, remise à zéro et avertissement", async ({
  page,
}) => {
  await page.goto("/");
  const section = page.getByRole("region", {
    name: "Le plaisir de voir chaque détail.",
  });
  const range = section.getByRole("slider");
  await expect(range).toHaveValue("35");
  await expect(section).toContainText("Il ne mesure pas votre vision");
  await section.getByRole("button", { name: "Voir l’image nette" }).click();
  await expect(range).toHaveValue("100");
  await expect(section.locator(".vision-photo-filter")).toHaveCSS(
    "filter",
    "blur(0px)",
  );
  await range.focus();
  await page.keyboard.press("ArrowLeft");
  await expect(range).toHaveValue("99");
  await section
    .getByRole("button", { name: "Réinitialiser l’effet de netteté" })
    .click();
  await expect(range).toHaveValue("35");
});

test("logo officiel dans l’en-tête et le pied de page, proportions conservées", async ({
  page,
}) => {
  await page.goto("/");
  for (const area of ["header", "footer"]) {
    const logo = page.locator(`${area} .brand-logo`);
    await logo.scrollIntoViewIfNeeded();
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute("src", "/brand/lunette-store.webp");
    await expect
      .poll(() => logo.evaluate((img) => img.complete && img.naturalWidth > 0))
      .toBe(true);
    const box = await logo.boundingBox();
    expect(box.width / box.height).toBeCloseTo(569 / 308, 2);
    await expect(page.locator(`${area} .brand`)).toHaveAttribute(
      "href",
      "#accueil",
    );
  }
});
