# スポーツブランド図鑑

世界のスポーツブランドを紹介する静的サイト（Astro）。個人名は出さない一般向け。

```
npm install
npm run dev     # http://localhost:4321
npm run build   # dist/ に出力
```

## ブランドを追加する

1. ロゴを Wikimedia Commons から `public/logos/<id>.svg` に保存する（ファイルページのURL・ライセンス・作者を控える）
2. `src/content/brands/<id>.md` を作る。ファイル名がURLになる（`nike.md` → `/brands/nike/`）。項目は既存の `nike.md` を写す
3. 国・競技は `src/lib/taxonomy.ts` にあるIDだけ使える。足りなければそこに追加する
4. `npm run build` が通ればOK（項目の抜けやIDの誤りはビルドで落ちる）

## データのルール

- **出典URLを必ず残す。** `sources` に記事・公式ページ、契約選手は1人ずつ `source` に契約を報じた記事
- **確認できないことは書かない。** 「〜とされる」で済ませず、出典で裏が取れない記述は削る
- 契約選手は移籍・契約終了が起きやすい。生涯契約など長期の裏付けがある選手を優先し、直したら `updated` を更新する
- ロゴは商標。フッターの商標表記は消さない
