# Flinders Street miniature — working notes

## What it is

One interactive Three.js diorama of Melbourne's Flinders Street corner: the Hoddle Grid at 19
degrees, the Yarra with three crossings, 332 parcels, eight landmarks, trams, day/night and two
locales. Everything is generated in code at runtime — no model files, no textures on disk.

It is a stylised miniature, not a survey. Geography is compressed; buildings are instanced boxes
with a canvas window texture.

## Commands

```sh
npm install
npm run dev          # http://localhost:5173
npm test             # plan/geometry invariants, no browser
npm run typecheck
npm run build        # dist/
```

Deploy is automatic: pushing to `main` runs `.github/workflows/pages.yml`, which tests, builds and
publishes `dist/` to GitHub Pages.

## Architecture

Construction order in `src/scene/`:

1. `constants.ts` — tray size, grid angle, palette, street lines, districts, landmark table.
2. `geography.ts` — river edges, reserved lots, district lookup.
3. `plan.ts` — roads, blocks, parcels, bridges.
4. `kit.ts` — instancing helper, canvas facade textures, seeded RNG.
5. `buildings.ts` — family specs, per-parcel instances, hip roofs, plant, balconies, awnings.
6. `landmarks.ts` — eight hand-built models in local city space.
7. `environment.ts` — rounded tray slab, contact shadow, water, quay walls, trees, stops, roads.
8. `traffic.ts` — trams, boats, pedestrians; `update(dt)`.
9. `scene.ts` — renderer, gradient sky, sun/hemi, camera flights, zoom, compass, day/night.

`App.tsx` is the overlay only: it never touches Three.js except through the `Mini` interface.
`i18n.ts` holds both locales.

## Decisions and constraints

- **Coordinates**: local city space is +x east, +z south, y up. The whole city group is rotated by
  `GRID_ANGLE` (−19°) so the grid sits off true north. Landmark anchors are in local space and are
  converted by `localToWorld`.
- **Palette is the design**: high-key pastel. Cream sky `#efe7d8`, teal water, terracotta roofs.
  Changing the sun or ambient without retuning the palette makes it grey.
- **Order of construction matters**: districts and reserved lots are defined before parcels, so
  landmarks never collide with procedural buildings.
- **Instancing**: one `InstancedMesh` per building family plus roofs/hips/plant/balconies/awnings.
  Adding per-building meshes would blow the draw-call budget.
- **`CITY.md` is the contract.** Landmark anchors, view offsets and envelopes live there and in
  `constants.ts`; tests repeat them.
- Do not copy the San Francisco asset's files, constants, names or copy. It is a mechanism
  reference only.

## Known issues

- Buildings are boxes with a repeating window texture; no true balconies on the facade plane.
- The station is modelled to silhouette. The wing's window texture reads better than before but
  the entry, clocks and cornice are still implied.
- Night is emissive windows only — no street lamps, no water reflections.
- The tray is 720 × 540 so the MCG and Royal Exhibition Building fall outside it; adding them
  needs a tray and street-grid extension.
- No LODs; fine at this scale, would not scale to a larger city.

## Continuity

- Repo: https://github.com/somphol/flinders-street-miniature
- Live: https://somphol.github.io/flinders-street-miniature/
- Screenshots: `screenshots/overview-day.png`, `station-flight.png`, `night.png`
