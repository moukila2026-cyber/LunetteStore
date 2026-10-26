#!/usr/bin/env python3
"""Create the print-ready Lunette Store Daloa QR presentation sheet (A4)."""

from pathlib import Path
import textwrap

import qrcode
from PIL import Image
from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "deliverables" / "lunette-store-daloa-acces-qr.pdf"
ASSETS = ROOT / "deliverables" / "assets"
BUILD = Path("/tmp/lunette-store-pdf-build")
SITE_URL = "https://lunette-store-daloa.vercel.app/"

# Palette derived from the shop identity: clean ivory, brand red and warm black.
RED = HexColor("#B51631")
DARK_RED = HexColor("#8E1026")
INK = HexColor("#24201F")
MUTED = HexColor("#6E625E")
CREAM = HexColor("#FBF8F5")
BLUSH = HexColor("#F4EAE6")
PAPER = HexColor("#FFFFFF")


def register_fonts():
    fonts = Path("/usr/share/fonts/truetype/dejavu")
    pdfmetrics.registerFont(TTFont("LunetteSans", str(fonts / "DejaVuSans.ttf")))
    pdfmetrics.registerFont(TTFont("LunetteSansBold", str(fonts / "DejaVuSans-Bold.ttf")))
    pdfmetrics.registerFont(TTFont("LunetteSerif", str(fonts / "DejaVuSerif.ttf")))


def prepare_image(source: Path, output: Path, mode="RGB") -> Path:
    """Convert web assets to PDF-friendly PNG/JPEG without changing the source asset."""
    output.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(source) as image:
        if mode == "RGBA":
            image.convert("RGBA").save(output, "PNG")
        else:
            image.convert("RGB").save(output, "JPEG", quality=92, optimize=True)
    return output


def make_qr() -> Path:
    BUILD.mkdir(parents=True, exist_ok=True)
    output = BUILD / "lunette-store-site-qr.png"
    code = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=18,
        border=5,
    )
    code.add_data(SITE_URL)
    code.make(fit=True)
    code.make_image(fill_color="#111111", back_color="#FFFFFF").save(output)
    return output


def fit_lines(text, font, size, max_width):
    words = text.split()
    lines, current = [], ""
    for word in words:
        candidate = f"{current} {word}".strip()
        if current and pdfmetrics.stringWidth(candidate, font, size) > max_width:
            lines.append(current)
            current = word
        else:
            current = candidate
    if current:
        lines.append(current)
    return lines


def draw_paragraph(c, text, x, y_top, width, font, size, leading, color=INK):
    c.setFillColor(color)
    c.setFont(font, size)
    lines = fit_lines(text, font, size, width)
    for index, line in enumerate(lines):
        c.drawString(x, y_top - (index * leading), line)
    return y_top - len(lines) * leading


def draw_eyebrow(c, text, x, y, color=RED, line_width=18):
    c.setStrokeColor(color)
    c.setLineWidth(1.4)
    c.line(x, y + 2.5, x + line_width, y + 2.5)
    c.setFillColor(color)
    c.setFont("LunetteSansBold", 6.8)
    c.drawString(x + line_width + 7, y, text.upper())


def draw_wrapped_title(c, lines, x, y_top, font="LunetteSerif", size=25, leading=29, color=INK):
    c.setFillColor(color)
    c.setFont(font, size)
    for i, line in enumerate(lines):
        c.drawString(x, y_top - i * leading, line)


def cropped_image(c, image, x, y, width, height, radius=0):
    """Draw a photo in a clipped rounded container while preserving image proportions."""
    reader = ImageReader(str(image))
    image_width, image_height = reader.getSize()
    scale = max(width / image_width, height / image_height)
    draw_width, draw_height = image_width * scale, image_height * scale
    draw_x = x - (draw_width - width) / 2
    draw_y = y - (draw_height - height) / 2
    c.saveState()
    path = c.beginPath()
    path.roundRect(x, y, width, height, radius)
    c.clipPath(path, stroke=0, fill=0)
    c.drawImage(reader, draw_x, draw_y, draw_width, draw_height, mask="auto")
    c.restoreState()


def service_card(c, number, title, body, x, y, width):
    c.setFillColor(BLUSH)
    c.circle(x + 6, y + 25, 6, stroke=0, fill=1)
    c.setFillColor(RED)
    c.setFont("LunetteSansBold", 5.6)
    c.drawCentredString(x + 6, y + 23.1, f"{number:02}")
    c.setFillColor(INK)
    c.setFont("LunetteSansBold", 7.9)
    c.drawString(x + 18, y + 26.5, title)
    draw_paragraph(c, body, x + 18, y + 16.2, width - 20, "LunetteSans", 6.35, 7.8, MUTED)


def build_pdf():
    register_fonts()
    BUILD.mkdir(parents=True, exist_ok=True)
    OUT.parent.mkdir(parents=True, exist_ok=True)

    logo = prepare_image(ASSETS / "lunette-store-logo.webp", BUILD / "logo.jpg")
    shop_photo = prepare_image(ASSETS / "boutique-daloa.webp", BUILD / "boutique.jpg")
    qr = make_qr()

    width, height = A4
    c = canvas.Canvas(str(OUT), pagesize=A4, pageCompression=1)
    c.setTitle("Lunette Store Daloa — Accès QR")
    c.setAuthor("Lunette Store Daloa")
    c.setSubject("Fiche de présentation et accès au site de Lunette Store Daloa")
    c.setCreator("Lunette Store Daloa")
    c.setFillColor(PAPER)
    c.rect(0, 0, width, height, stroke=0, fill=1)

    margin = 37

    # Fine, print-friendly header.
    c.setFillColor(RED)
    c.rect(margin, 800, width - margin * 2, 2.3, stroke=0, fill=1)
    logo_reader = ImageReader(str(logo))
    c.drawImage(logo_reader, margin, 722, 132, 71.4, mask="auto")
    c.setFillColor(MUTED)
    c.setFont("LunetteSansBold", 6.8)
    c.drawRightString(width - margin, 778, "FICHE D’ACCÈS NUMÉRIQUE")
    c.setFont("LunetteSans", 6.6)
    c.drawRightString(width - margin, 765, "DALOA · CÔTE D’IVOIRE")
    c.setStrokeColor(HexColor("#DDD5D1"))
    c.setLineWidth(0.45)
    c.line(margin, 706, width - margin, 706)

    # Main introduction.
    draw_eyebrow(c, "Optique, style & accompagnement", margin, 678)
    draw_wrapped_title(
        c,
        ["Votre regard mérite", "une attention particulière."],
        margin,
        653,
        size=23.2,
        leading=28,
    )
    draw_paragraph(
        c,
        "Découvrez l’univers Lunette Store : une adresse à Daloa pour choisir une monture qui associe style, confort et qualité.",
        margin,
        584,
        282,
        "LunetteSans",
        8.65,
        12.2,
        MUTED,
    )
    c.setStrokeColor(RED)
    c.setLineWidth(0.8)
    c.line(margin, 533, margin + 42, 533)
    c.setFillColor(INK)
    c.setFont("LunetteSansBold", 7.1)
    c.drawString(margin, 519, "LUNETTE STORE · OPTIQUE À DALOA")
    c.setFillColor(MUTED)
    c.setFont("LunetteSans", 6.8)
    c.drawString(margin, 507, "Gogoguhe, à côté du Collège Imane")

    # Actual boutique photograph with discreet brand-red frame.
    photo_x, photo_y, photo_w, photo_h = 365, 522, 193, 166
    c.setFillColor(BLUSH)
    c.roundRect(photo_x - 7, photo_y - 7, photo_w, photo_h, 14, stroke=0, fill=1)
    cropped_image(c, shop_photo, photo_x, photo_y, photo_w, photo_h, radius=10)
    c.setFillColor(white)
    c.setFont("LunetteSansBold", 6.1)
    c.drawString(photo_x + 12, photo_y + 13, "L’INTÉRIEUR DE NOTRE BOUTIQUE")

    # QR destination block.
    block_y, block_h = 303, 180
    c.setFillColor(CREAM)
    c.roundRect(margin, block_y, width - margin * 2, block_h, 14, stroke=0, fill=1)
    c.setFillColor(RED)
    c.roundRect(margin, block_y, 7, block_h, 3, stroke=0, fill=1)
    draw_eyebrow(c, "Scannez. Découvrez. Contactez.", margin + 23, 452)
    draw_wrapped_title(
        c,
        ["La boutique,", "en un scan."],
        margin + 23,
        425,
        size=21.6,
        leading=26,
    )
    draw_paragraph(
        c,
        "Utilisez l’appareil photo de votre téléphone pour ouvrir le site de Lunette Store, parcourir les montures et contacter l’équipe.",
        margin + 23,
        363,
        268,
        "LunetteSans",
        8.2,
        11.3,
        MUTED,
    )
    c.setFillColor(INK)
    c.setFont("LunetteSansBold", 6.5)
    c.drawString(margin + 23, 319, "LUNETTE-STORE-DALOA.VERCEL.APP")

    qr_size = 147
    qr_x, qr_y = 378, 320
    c.setFillColor(white)
    c.roundRect(qr_x - 6, qr_y - 6, qr_size + 12, qr_size + 12, 10, stroke=0, fill=1)
    c.drawImage(ImageReader(str(qr)), qr_x, qr_y, qr_size, qr_size, mask="auto")
    c.setFillColor(RED)
    c.setFont("LunetteSansBold", 6.5)
    c.drawCentredString(qr_x + qr_size / 2, 306, "SCANNEZ-MOI")

    # Condensed service review based on the live site content.
    draw_eyebrow(c, "Les essentiels proposés en boutique", margin, 274)
    c.setFillColor(INK)
    c.setFont("LunetteSerif", 14.6)
    c.drawString(margin, 249, "Le style, le confort, l’accompagnement.")
    c.setFillColor(HexColor("#E5DCD8"))
    c.roundRect(margin, 154, width - margin * 2, 78, 10, stroke=0, fill=1)
    card_w = 157
    service_card(c, 1, "Contrôle de la vue", "Test de vue gratuit, selon les conditions en boutique.", 49, 194, card_w)
    service_card(c, 2, "Montures", "Optiques, solaires, femmes, hommes et enfants.", 221, 194, card_w)
    service_card(c, 3, "Verres optiques", "Une gamme de verres unifocaux et progressifs.", 393, 194, card_w)
    service_card(c, 4, "Accessoires & entretien", "Étuis, cordons et produits pour vos lunettes.", 49, 160, card_w)
    service_card(c, 5, "Prix accessibles", "Facilités de paiement selon les conditions en magasin.", 221, 160, card_w)
    service_card(c, 6, "Offre monture", "Monture offerte pour achat de verres, sous conditions.", 393, 160, card_w)

    # Factual qualification, kept distinct and readable in print.
    draw_paragraph(
        c,
        "Offres, disponibilités et modalités à confirmer directement en boutique. Un test de vue ne remplace pas une consultation chez un ophtalmologue.",
        margin,
        140,
        width - margin * 2,
        "LunetteSans",
        5.8,
        7.2,
        MUTED,
    )

    # Contact footer.
    footer_h = 104
    c.setFillColor(INK)
    c.rect(0, 0, width, footer_h, stroke=0, fill=1)
    c.setFillColor(HexColor("#D98A9A"))
    c.setFont("LunetteSansBold", 6.3)
    c.drawString(margin, 82, "UN CONSEIL, UNE ENVIE ?")
    c.setFillColor(white)
    c.setFont("LunetteSerif", 15.3)
    c.drawString(margin, 59, "Faisons connaissance.")
    c.setStrokeColor(HexColor("#7F726E"))
    c.setLineWidth(0.5)
    c.line(270, 28, 270, 86)
    c.line(413, 28, 413, 86)

    c.setFillColor(HexColor("#D7CECA"))
    c.setFont("LunetteSansBold", 5.7)
    c.drawString(288, 80, "TÉLÉPHONE / WHATSAPP")
    c.setFillColor(white)
    c.setFont("LunetteSansBold", 7.6)
    c.drawString(288, 65, "01 01 16 21 37")
    c.drawString(288, 50, "07 13 58 23 57")
    c.setFillColor(HexColor("#D7CECA"))
    c.setFont("LunetteSans", 5.8)
    c.drawString(288, 35, "Contactez-nous avant votre visite.")

    c.setFillColor(HexColor("#D7CECA"))
    c.setFont("LunetteSansBold", 5.7)
    c.drawString(430, 80, "E-MAIL")
    c.setFillColor(white)
    c.setFont("LunetteSansBold", 7.0)
    c.drawString(430, 65, "lunettestore875@gmail.com")
    c.setFillColor(HexColor("#D7CECA"))
    c.setFont("LunetteSans", 5.8)
    c.drawString(430, 49, "Gogoguhe · à côté du Collège Imane")
    c.drawString(430, 36, "Daloa, Côte d’Ivoire")

    c.showPage()
    c.save()
    print(f"Created {OUT}")


if __name__ == "__main__":
    build_pdf()
