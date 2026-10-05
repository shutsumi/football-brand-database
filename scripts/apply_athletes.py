#!/usr/bin/env python3
"""契約選手の変更案（athletes/proposals/YYYY-MM.json）をブランドのデータに反映する。

使い方:  python3 scripts/apply_athletes.py athletes/proposals/2026-11.json

JSON の形:
{
  "month": "2026-11",
  "brands": {
    "nike": [ {"name": "...", "sport": "football", "country": "...", "club": "...", "source": "https://..."} ],
    "asics": []                       ← 空配列は「契約選手なし」にする
  }
}
brands に書いたブランドだけを、書いた内容で丸ごと置き換える（書かなかったブランドは触らない）。
"""
import json, re, sys, datetime, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
BRANDS = ROOT / 'src/content/brands'
J = lambda v: json.dumps(v, ensure_ascii=False)

def block(players):
    if not players:
        return ''
    out = ['athletes:']
    for p in players:
        assert p['sport'] in ('football', 'futsal'), p
        assert p['source'].startswith('http'), p
        out.append(f"  - name: {J(p['name'])}")
        out.append(f"    sport: {p['sport']}")
        out.append(f"    country: {J(p['country'])}")
        if p.get('club'):
            out.append(f"    club: {J(p['club'])}")
        out.append(f"    source: {J(p['source'])}")
    return '\n'.join(out) + '\n'

def main(path):
    data = json.load(open(path))
    today = datetime.date.today().isoformat()
    for bid, players in data['brands'].items():
        if len(players) > 5:
            sys.exit(f'{bid}: 選手は最大5人まで（{len(players)}人）')
        f = BRANDS / f'{bid}.md'
        s = f.read_text()
        head, body = s.split('\n---\n', 1) if s.startswith('---\n') else (None, None)
        fm = s[4:s.index('\n---', 4) + 1]
        rest = s[s.index('\n---', 4) + 1:]
        # 既存の athletes ブロックを取り除き、officialUrl/sources の前に入れ直す
        fm = re.sub(r'^athletes:\n(?:  .*\n|    .*\n)*', '', fm, flags=re.M)
        anchor = re.search(r'^(officialUrl|sources):', fm, re.M)
        fm = fm[:anchor.start()] + block(players) + fm[anchor.start():]
        fm = re.sub(r'^updated: .*$', f'updated: {today}', fm, flags=re.M)
        f.write_text('---\n' + fm + rest)
        print(f'{bid}: {len(players)}人')

if __name__ == '__main__':
    main(sys.argv[1])
