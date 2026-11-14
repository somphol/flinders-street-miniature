# City brief: Melbourne — Flinders Street corner

Fill this before writing scene code. The brief is the design contract: geography, landmarks, street
pattern, architecture, transport, palette, copy and verification targets. If the brief is vague, the
scene will be a generic city with the target's labels. Targets for this project are **Melbourne CBD,
the Yarra bend at Princes Bridge, and Southbank**.

## 1. Identity

- City / district: Melbourne, Victoria — the Hoddle Grid between Elizabeth and Russell Streets,
  both banks of the Yarra at Princes Bridge.
- One-line pitch: the corner where Melbourne introduces itself — a green copper dome, a clock tower,
  a cathedral spire and the river, in one tray.
- What makes it instantly recognisable in a 3-second overview: a long ochre-and-red station wall
  running along a brown-green river, a green dome at the corner, a pale spire opposite, and a gold
  tower across the water.
- Languages / locales: English (en), Simplified Chinese (zh-CN) — Chinatown is two blocks north.
- What the city is *not*: not Sydney (no harbour bridge, no Opera House sails, no sandstone
  headlands), not a generic waterfront, not a tram-only toy.

## 2. Geography (compressed)

- Orientation: north up. Flinders Street runs east–west along the north bank; the grid is rotated
  **19°** clockwise from true north, following the river — this angle is the single strongest cue.
- Water: the Yarra, ~60 units wide, entering west, bowing south around the station, exiting east.
  One wide bend at Princes Bridge. Brown-green, slow, with a stone embankment wall on both banks.
- Land shape: flat north bank (the grid), a low south bank (Southbank promenade) with three towers.
- Green: the Domain/Queen Victoria Gardens hinted at the south-east edge; plane trees along
  St Kilda Road; a strip of park at the river's east end.
- Tray aspect 4:3, ~720 × 540 units. 1 unit ≈ 1 m at the station; everything else compressed.
- Why the compression reads as Melbourne: the grid angle, the river hugging the station's south
  side, the bridge at the end of Swanston, and the ochre/red/copper palette.

## 3. Districts

| District | Where | Character | Building families | Landmarks |
| --- | --- | --- | --- | --- |
| Station Corner | Flinders × Swanston, NW of bridge | civic, low, crowded | station, pub, low Victorian | 01, 06, 07 |
| Cathedral Hill | Flinders × Russell, east | stone, spires, quiet | cathedral, terrace, institution | 02, 05 |
| Collins Financial | Collins × Queen–Swanston, west | tall, glass, canyons | 70s office, glass tower | 08 |
| Chinatown Laneways | Little Bourke, north | narrow, brick, signs | shophouse, warehouse | — |
| Riverside West | Flinders × King, west | bluestone, low, rail | warehouse, shed | — |
| Southbank | south of the river | promenade, towers, crowd | apartment slab, podium | 03, 04 |

Aim: distinct height and colour per district — station low and ochre, cathedral mid and pale,
Collins tall and blue-grey, Southbank taller still.

## 4. Landmarks (6–8)

| # | Landmark | District | Silhouette / must-read features | Anchor (x, z) | Lot (w × d) | Look | View offset |
| - | --- | --- | --- | --- | --- | --- | --- |
| 01 | Flinders Street Station | Station Corner | 200 m ochre wall, green copper dome, 74 m clock tower at the west end, nine clocks | -40, 10 | 210 × 34 | 26 | 120, 70 |
| 02 | St Paul's Cathedral | Cathedral Hill | pale gothic spire, three portals, dark roof | 95, 12 | 48 × 70 | 30 | 90, 60 |
| 03 | Federation Square | Station Corner | angular shards, grey zinc, irregular glass | 30, -6 | 80 × 60 | 20 | 70, 55 |
| 04 | Eureka Tower | Southbank | tall gold-capped glass slab, 90 storeys | -30, -120 | 45 × 45 | 90 | 110, 80 |
| 05 | Arts Centre Spire | Southbank | tall lattice spire, 162 m, thin | 60, -130 | 60 × 60 | 80 | 120, 90 |
| 06 | Young & Jackson | Station Corner | two-storey brick corner pub, parapet | -8, 14 | 24 × 22 | 10 | 45, 35 |
| 07 | Forum Theatre | Cathedral Hill | white tower, moorish dome, arched windows | 60, 8 | 40 × 45 | 25 | 70, 50 |
| 08 | Princes Bridge | Station Corner | three bluestone arches, lamp posts, spine of Swanston | 8, -28 | 30 × 70 | 8 | 60, 45 |

Every silhouette must survive at 1–5 units tall. View offsets are world-axis from the look point,
not metres.

## 5. Street pattern

- Dominant pattern: Hoddle Grid, **rotated 19°**, long north–south blocks and short east–west ones.
- Spine: **Flinders Street** (east–west, along the river), crossed by **Swanston Street** which runs
  straight onto Princes Bridge. Secondary: Collins, Bourke, Little Collins, Elizabeth, Russell.
- Bridges: Princes Bridge (Swanston, three arches), Queens Bridge (west, road), Sandridge
  (pedestrian, disused rail), Evan Walker (pedestrian, slender).
- Transit: W-class trams, green and gold, on Flinders and Swanston; City Circle loop.
- Pedestrian: the station steps under the clocks, the Southbank promenade, Princes Bridge deck.
- Connectivity: every bank needs at least one crossing; the grid must close across the river via
  Princes Bridge and Queens Bridge.

## 6. Architecture

| Family | Where | Height | Materials / colours | Roof / details |
| --- | --- | --- | --- | --- |
| Station wing | Station Corner | 22 | ochre render + red brick | parapet, arched windows, copper |
| Victorian terrace | Cathedral Hill | 12 | cream stucco, iron lace | parapet, shopfront |
| Bluestone warehouse | Riverside West | 14 | blue-grey stone | gable, loading doors |
| 1970s office | Collins Financial | 45 | precast concrete, grey | flat, plant room |
| Glass tower | Collins Financial | 90 | blue-grey glass | curtain wall, crown |
| Shophouse | Chinatown | 9 | brick, painted render | awning, signage |
| Apartment slab | Southbank | 70 | pale concrete, balconies | podium, roof plant |
| Institution | Cathedral Hill | 25 | pale stone | pediment, colonnade |

## 7. Transport and city life

- Signature vehicles: W-class trams (green body, gold stripe, cream roof) on rails; yellow taxis;
  a few cars, all right-hand drive.
- Boats: a river cruise boat, two rowing sculls at dawn, a ferry at the Southbank landing.
- Pedestrians: clusters on the station steps, along the promenade, on the bridge.
- Street furniture: tram stops with shelters, plane trees, banner poles, a newsstand, bollards.
- At night: tram headlights, lit station clocks, window grids, the Arts Centre spire glowing,
  reflections in the Yarra.

## 8. Palette and light

- Day: sky #9fc0d8, fog #cfd8dc, sun warm 4200 K from the north-west, water #4a5b52, land #6b6357.
- Night: sky #0b1220, windows #ffd9a0, tram #ffcf7a, water near-black with vertical streaks.
- UI: ink #efe9dd, panel #141a1f, accent #c9a227 (tram gold), secondary #7c8b93.
- Remember: copper green, tram gold, ochre stone.

## 9. Copy and locales

- Title: Flinders Street
- Tagline: Melbourne, in one tray.
- Eyebrow: 37.8183° S, 144.9671° E
- Landmark texts: 1–2 sentences each, factual, no marketing.
- Compact bar labels: Station, St Paul's, Fed Square, Eureka, Spire, Young & Jackson, Forum, Bridge.
- zh-CN labels kept short: 车站, 圣保罗, 联邦广场, 尤利卡, 尖塔, 酒吧, 论坛, 王子桥.
- Tone: dry, local, no exclamation marks.

## 10. Technical targets

- Tray 720 × 540 units, overview camera ~620 units back, 35° elevation.
- Landmark look heights 8–90 per the table; flight durations 1.4 s ease.
- Budget: ≤ 90k triangles, ≤ 60 draw calls, ~1200 instanced boxes, 40 landmarks/buildings max.
- DPR cap 2, 2048 shadow map, water a single low-poly plane with a scrolling normal trick.
- Single-file build, strict CSP, no external requests, system fonts only.

## 11. Verification targets

- Camera targets per landmark (x, look, z) from the table above.
- Envelopes: station (210 × 34 × 22), tower (14 × 14 × 74), St Paul's (48 × 70 × 30),
  Eureka (45 × 45 × 90), Spire (60 × 60 × 80), Bridge (30 × 70 × 8).
- Facts: 8 landmarks, 4 bridges, 6 districts, ≥ 900 buildings, ≥ 24 trams/vehicles.
- Locales: en + zh-CN; every landmark has both.
- Embed: 345 × 345 must not clip the landmark bar.

## 12. Definition of done

- [ ] The city brief is filled and reviewed.
- [ ] Geography, plan, buildings, landmarks, environment, traffic and copy are all target-specific.
- [ ] The road graph is connected across the river; parcels contained and non-overlapping.
- [ ] Every landmark flight, day/night, both locales and the embed pass.
- [ ] One file, offline, no external requests.
- [ ] README, AGENTS.md and screenshots updated.

## 13. Do-not-copy checklist

- [ ] No San Francisco files, outline, 33° grid, street names or parcel lattice.
- [ ] No SF landmark models, anchors, view offsets or envelopes.
- [ ] No SF building families, palette or i18n strings.
- [ ] No SF test targets.
- [ ] The overview reads as Melbourne before the title is read.
