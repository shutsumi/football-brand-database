from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.transformPen import TransformPen
NAVY, RED = '#011D55', '#D4000D'
f = TTFont('Lato-Black.ttf'); gs = f.getGlyphSet(); cmap = f.getBestCmap(); hmtx = f['hmtx']
upm = f['head'].unitsPerEm; track = -0.01 * upm
def ink(ch):
    g = cmap[ord(ch)]
    bp = BoundsPen(gs); gs[g].draw(bp)
    return g, bp.bounds  # (xmin, ymin, xmax, ymax)

def put(ch, col, x, y, sx=1.0):
    """字の輪郭の左端が x に来るように置く（列をそろえるため）。sx は横方向だけの拡大率"""
    g, (ix, _, _, _) = ink(ch)
    t = (sx, 0, 0, -1, x - ix * sx, y)
    pen = SVGPathPen(gs); gs[g].draw(TransformPen(pen, t))
    bp = BoundsPen(gs); gs[g].draw(TransformPen(bp, t))
    return (pen.getCommands(), col), bp.bounds

cap = 1451; gap = cap * 0.16
# 1列目（F・D）と2列目（B・B）の左端をそろえる。列の間隔はフォントの字間から決める
_, (fx0, _, fx1, _) = ink('F'); _, (dx0, _, dx1, _) = ink('D'); _, (bx0, _, _, _) = ink('B')
# F・D は横幅を B に合わせる（B の幅は F と D のちょうど中間なので、変形が最小で済む）
_, (_, _, bx1, _) = ink('B'); bw = bx1 - bx0
sx_f = bw / (fx1 - fx0); sx_d = bw / (dx1 - dx0)
col2 = bw + gap  # 2列目の左端。列の間隔は行の間隔（gap）と同じにする
p1, bb1 = put('F', NAVY, 0, 0, sx_f)
p2, bb2 = put('B', RED, col2, 0)
p3, bb3 = put('D', NAVY, 0, cap + gap, sx_d)
p4, bb4 = put('B', NAVY, col2, cap + gap)
l1 = [p1, p2]; l2 = [p3, p4]
bbs = [bb1, bb2, bb3, bb4]
xmin = min(b[0] for b in bbs); xmax = max(b[2] for b in bbs)
ymin = min(b[1] for b in bbs); ymax = max(b[3] for b in bbs)
w, h = xmax - xmin, ymax - ymin
S_ = max(w, h) * 1.28
ox, oy = (S_ - w) / 2 - xmin, (S_ - h) / 2 - ymin
body = ''.join(f'<path fill="{c}" d="{d}"/>' for d, c in l1 + l2)
open('fbdb-icon-stacked.svg', 'w').write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {S_:.0f} {S_:.0f}"><rect width="{S_:.0f}" height="{S_:.0f}" fill="#ffffff"/><g transform="translate({ox:.1f} {oy:.1f})">{body}</g></svg>\n')
print(round(w), round(h))
