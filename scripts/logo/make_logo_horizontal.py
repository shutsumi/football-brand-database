from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.transformPen import TransformPen
NAVY, RED = '#011D55', '#D4000D'
f = TTFont('Lato-Black.ttf'); gs = f.getGlyphSet(); cmap = f.getBestCmap(); hmtx = f['hmtx']
upm = f['head'].unitsPerEm
track = -0.01 * upm   # サイトの見出しと同じ字間（-0.01em）
letters = [('F', NAVY), ('B', RED), ('D', NAVY), ('B', NAVY)]
x = 0; parts = []; xmin = ymin = 1e9; xmax = ymax = -1e9
for ch, col in letters:
    g = cmap[ord(ch)]
    pen = SVGPathPen(gs)
    # フォントは上向きy、SVGは下向きy なので反転
    gs[g].draw(TransformPen(pen, (1, 0, 0, -1, x, 0)))
    bp = BoundsPen(gs); gs[g].draw(TransformPen(bp, (1, 0, 0, -1, x, 0)))
    if bp.bounds:
        a, b, c, d = bp.bounds; xmin, ymin, xmax, ymax = min(xmin, a), min(ymin, b), max(xmax, c), max(ymax, d)
    parts.append((pen.getCommands(), col))
    x += hmtx[g][0] + track
w, h = xmax - xmin, ymax - ymin
def svg(pad_ratio, square, bg):
    pad = w * pad_ratio
    W = w + pad * 2
    H = (W if square else h + pad * 2)
    ox, oy = pad - xmin, (H - h) / 2 - ymin
    body = ''.join(f'<path fill="{c}" d="{d}"/>' for d, c in parts)
    rect = f'<rect width="{W:.0f}" height="{H:.0f}" fill="{bg}"/>' if bg else ''
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W:.0f} {H:.0f}">{rect}<g transform="translate({ox:.1f} {oy:.1f})">{body}</g></svg>\n'
open('fbdb-icon.svg', 'w').write(svg(0.12, True, '#ffffff'))      # 正方形・白地（ファビコンやSNSアイコン用）
open('fbdb-logo.svg', 'w').write(svg(0.0, False, None))           # 余白なし・透明（文中やヘッダー用）
print('size', round(w), round(h))
