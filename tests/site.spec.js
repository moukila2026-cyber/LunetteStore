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
    await expect(page.locator(".mobile-contact-bar")).toBeVisible();
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
  await page.screenshot({
    path: testInfo.outputPath("page.png"),
    fullPage: true,
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
