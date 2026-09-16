from pathlib import Path
from argparse import ArgumentParser
from tempfile import TemporaryDirectory

from fontTools.ttLib import TTFont as Font
from fontTools.varLib.instancer import instantiateVariableFont
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor


ROOT = Path(__file__).resolve().parents[1]
parser = ArgumentParser(description="Build the client style sheet using an Inter variable TTF.")
parser.add_argument("--font", required=True, type=Path)
args = parser.parse_args()
OUT = ROOT / "output/pdf/Gladys Henriquez - Website Style.pdf"
OUT.parent.mkdir(parents=True, exist_ok=True)
with TemporaryDirectory(prefix="gladys-fonts-") as font_dir:
    for weight, name in [(300, "InterLight"), (400, "Inter"), (500, "InterMedium")]:
        font = instantiateVariableFont(Font(args.font), {"wght": weight, "opsz": 14})
        path = str(Path(font_dir) / f"{name}.ttf")
        font.save(path)
        pdfmetrics.registerFont(TTFont(name, path))

c = canvas.Canvas(str(OUT), pagesize=(842, 595))
c.setTitle("Gladys Henriquez | Website Style")
c.setAuthor("Studio in the Box")
PAPER, TAUPE, STONE, INK = "#FDFCFC", "#F5F3F1", "#EBE8E4", "#000000"
GRAY, ROSE, WINE = "#68625C", "#E8D9D5", "#69434B"


def rect(x, y, w, h, fill, radius=0, stroke=None):
    c.setFillColor(HexColor(fill))
    c.setStrokeColor(HexColor(stroke or fill))
    c.setLineWidth(0.7)
    c.roundRect(x, y, w, h, radius, fill=1, stroke=int(stroke is not None))


def text(x, y, value, size=12, font="Inter", color=INK):
    c.setFillColor(HexColor(color))
    c.setFont(font, size)
    c.drawString(x, y, value)


def button(x, y, label, height, size, primary=True):
    width = pdfmetrics.stringWidth(label, "InterMedium", size) + 36
    rect(x, y, width, height, INK if primary else PAPER, height / 2, None if primary else STONE)
    text(x + 18, y + (height - size) / 2 + 2, label, size, "InterMedium", PAPER if primary else INK)
    return width


rect(0, 0, 842, 595, PAPER)
text(38, 546, "Gladys Henriquez", 25, "InterMedium")
text(38, 522, "A calm, personal website. Clear from the first visit.", 12, color=GRAY)
text(658, 549, "Website style", 12, "InterMedium")
text(658, 530, "For your review", 10, color=GRAY)
c.setStrokeColor(HexColor(STONE))
c.line(38, 501, 804, 501)

rect(38, 235, 468, 243, TAUPE, 20)
text(62, 430, "You don’t have to figure", 28, "InterLight")
text(62, 396, "everything out alone.", 28, "InterLight")
text(62, 355, "A place to talk, ask questions, and find support", 12, color=GRAY)
text(62, 336, "for what feels difficult right now.", 12, color=GRAY)
button(62, 265, "Request a free consultation", 40, 11)

text(38, 205, "Inter Light", 16, "InterLight")
text(38, 185, "Open, understated headings", 10, color=GRAY)
text(295, 205, "Inter Regular & Medium", 12, "InterMedium")
text(295, 185, "Easy-to-read text and clear actions", 10, color=GRAY)

text(538, 458, "Warm neutrals", 20, "InterLight")
swatches = [(PAPER, "Eggshell", "#FDFCFC"), (TAUPE, "Warm taupe", "#F5F3F1"), (STONE, "Stone", "#EBE8E4"), (INK, "Ink", "#000000")]
for i, (color, label, code) in enumerate(swatches):
    x = 538 + (i % 2) * 140
    y = 350 - (i // 2) * 103
    rect(x, y, 126, 61, color, 10, STONE if i == 0 else None)
    text(x, y - 17, label, 10, "InterMedium")
    text(x + 73, y - 17, code, 8, color=GRAY)

text(538, 195, "Optional touches of warmth", 12, "InterMedium")
rect(538, 153, 126, 27, ROSE, 6)
rect(678, 153, 126, 27, WINE, 6)
text(538, 138, "Muted rose", 9, color=GRAY)
text(678, 138, "Deep wine", 9, color=GRAY)
text(538, 119, "Used sparingly. Buttons stay black and white.", 9, color=GRAY)

c.setStrokeColor(HexColor(STONE))
c.line(38, 158, 506, 158)
button(38, 88, "Get started", 44, 12)
button(188, 92, "About Gladys", 36, 10, False)
button(329, 96, "Learn more", 28, 9, False)
text(38, 70, "Large", 9, color=GRAY)
text(188, 70, "Regular", 9, color=GRAY)
text(329, 70, "Small", 9, color=GRAY)

c.setStrokeColor(HexColor(STONE))
c.line(38, 49, 804, 49)
text(38, 29, "Soft backgrounds. Neutral buttons. Room for Gladys’s real presence.", 9, color=GRAY)
text(712, 29, "September 2026", 9, color=GRAY)
c.showPage()
c.save()
print(OUT)
