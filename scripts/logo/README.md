# FBDB ロゴの作り直し方

`public/brand/` のロゴ・アイコンは、Lato Black（Google Fonts、OFL）の文字の形をそのまま図形にしたもの。
色は紺 #011D55、BRANDの頭文字「B」だけ赤 #D4000D。

```
python3 -m venv venv && ./venv/bin/pip install fonttools pillow
curl -sL -o Lato-Black.ttf https://github.com/google/fonts/raw/main/ofl/lato/Lato-Black.ttf
./venv/bin/python make_logo_horizontal.py   # fbdb-logo.svg（横並び）
./venv/bin/python make_icon_stacked.py      # fbdb-icon-stacked.svg（2段・正方形）→ fbdb-icon.svg に改名
qlmanage -t -s 512 -o . fbdb-icon-stacked.svg  # PNG化（macOS）。180pxは512pxから縮小
```

| ファイル | 用途 |
|---|---|
| `fbdb-icon.svg` | ブラウザのタブ（2段・正方形） |
| `fbdb-icon-512.png` / `fbdb-icon-180.png` | SNSアイコン ／ iPhoneのホーム画面 |
| `fbdb-logo.svg` | 横並びロゴ（透過・余白なし） |
| `fbdb-logo.png` | 横並びロゴ（白地） |
