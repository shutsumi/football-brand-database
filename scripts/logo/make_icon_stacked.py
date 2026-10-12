from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.transformPen import TransformPen
NAVY, RED = '#011D55', '#D4000D'
f = TTFont('Lato-Black.ttf'); gs = f.getGlyphSet(); cmap = f.getBestCmap(); hmtx = f['hmtx']
upm = f['head'].unitsPerEm; track = -0.01 * upm
def line(letters, y):
    x = 0; parts = []; bx = [1e9, 1e9, -1e9, -1e9]
    for ch, col in letters:
        g = cmap[ord(ch)]; t = (1, 0, 0, -1, x, y)
        pen = SVGPathPen(gs); gs[g].draw(TransformPen(pen, t))
        bp = BoundsPen(gs); gs[g].draw(TransformPen(bp, t)); a, b, c, d = bp.bounds
        bx = [min(bx[0], a), min(bx[1], b), max(bx[2], c), max(bx[3], d)]
        parts.append((pen.getCommands(), col)); x += hmtx[g][0] + track
    return parts, bx
cap = 1451; gap = cap * 0.16
l1, b1 = line([('F', NAVY), ('B', RED)], 0)
l2, b2 = line([('D', NAVY), ('B', NAVY)], cap + gap)
xmin = min(b1[0], b2[0]); xmax = max(b1[2], b2[2]); ymin = b1[1]; ymax = b2[3]
w, h = xmax - xmin, ymax - ymin
S_ = max(w, h) * 1.28
ox, oy = (S_ - w) / 2 - xmin, (S_ - h) / 2 - ymin
body = ''.join(f'<path fill="{c}" d="{d}"/>' for d, c in l1 + l2)
open('fbdb-icon-stacked.svg', 'w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {S_:.0f} {S_:.0f}"><rect width="{S_:.0f}" height="{S_:.0f}" fill="#ffffff"/><g transform="translate({ox:.1f} {oy:.1f})">{body}</g></svg>\n')
print(round(w), round(h))
