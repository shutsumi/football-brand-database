# FBDB ロゴの作り直し方

`public/brand/` のロゴ・アイコンは、Lato Black（Google Fonts、OFL）の文字の形をそのまま図形にしたもの。
色は紺 #011D55、BRANDの頭文字「B」だけ赤 #D4000D。
アイコンは2列（F・D／B・B）で、4文字とも横幅を B にそろえ（F は広げ、D は縮める）、列の間隔は行の間隔と同じにしている。

```
python3 -m venv venv && ./venv/bin/pip install fonttools pillow
curl -sL -o Lato-Black.ttf https://github.com/google/fonts/raw/main/ofl/lato/Lato-Black.ttf
./venv/bin/python make_logo_horizontal.py   # fbdb-logo.svg（横並び）
./venv/bin/python make_icon_stacked.py      # fbdb-icon-stacked.svg（2段・正方形）→ fbdb-icon.svg に改名
# PNG化：ヘッドレスChromeで512pxに描画し、180pxはそこから縮小
'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' --headless --disable-gpu \
  --hide-scrollbars --screenshot=fbdb-icon-512.png --window-size=512,512 \
  --default-background-color=FFFFFF "file://$PWD/fbdb-icon.svg"
```

| ファイル | 用途 |
|---|---|
| `fbdb-icon.svg` | ブラウザのタブ（2段・正方形） |
| `fbdb-icon-512.png` / `fbdb-icon-180.png` | SNSアイコン ／ iPhoneのホーム画面 |
| `fbdb-logo.svg` | 横並びロゴ（透過・余白なし） |
| `fbdb-logo.png` | 横並びロゴ（白地） |
