# Melbourne Miniature

One interactive Three.js diorama of the Flinders Street corner: the Hoddle Grid at 19 degrees,
the Yarra, four bridges, eight landmarks, trams, day/night and two locales.

Built from scratch against `CITY.md`. The San Francisco asset in the city-miniature skill was used
as a mechanism reference only — no scene code, geography, landmarks or copy were copied.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # plan and geometry invariants, no browser
npm run build      # dist/
```

## Design register

High-key pastel: cream sky, teal water, terracotta roofs, soft ambient light with a low-contrast
sun. The tray is a rounded slab with a contact-shadow plane, framed as a collectible rather than
a street view. UI is editorial: serif headline with a gold italic line, numbered landmark cards,
zoom rail, compass, EN/中文.

## What's in the tray

- **Geography**: the Yarra as a bowed band, both banks, quay walls, three bridges.
- **Plan**: Hoddle Grid rotated 19°, Flinders/Swanston spine, blocks cut from the street lines,
  332 parcels, reserved landmark lots.
- **Buildings**: six districts, five families, one instanced mesh per family with a canvas
  window texture, per-instance colour, plus hip roofs and rooftop plant for variety.
- **Landmarks**: station with dome, clock tower and nine clocks; St Paul's; Federation Square;
  Eureka; Arts Centre spire; Young & Jackson; Forum; Princes Bridge.
- **Life**: trams on Flinders and Swanston, river boats, pedestrians, street trees, tram stops.
- **Camera**: eight landmark flights, orbit, overview reset.
- **Locales**: English and Simplified Chinese.

## Architecture

`src/scene/` in construction order: `constants` (tray, grid angle, districts, landmarks) →
`geography` (river, reserved lots) → `plan` (roads, blocks, parcels, bridges) → `kit` (instancing,
canvas textures) → `buildings` → `landmarks` → `environment` → `traffic` → `scene` (renderer,
lights, flights, day/night). UI is `App.tsx` + `i18n.ts`.

## Known limits

- The station is modelled to silhouette, not survey: 200 m wing, 74 m tower, 22 m parapet, but
  the façade detail is implied rather than built.
- Landmark flights are tuned by eye; no automated envelope checks yet.
- Night is emissive-windows only — no street lamps, no water reflections.
- No LODs; the scene is one draw call per family, which is fine at this scale but does not scale.
