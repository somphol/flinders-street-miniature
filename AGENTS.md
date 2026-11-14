# melbourne-miniature — working notes

## What it is

A city miniature built from scratch. Fill this in after CITY.md: the target city, the tray, the
landmarks, the street pattern and what the scene is not.

## Commands

~~~sh
npm install
npm run dev
npm run typecheck
npm run build
~~~

Add test, verify and single-file scripts as they are written.

## Architecture

Write the target city's module map here. Do not copy another city's modules.

## Decisions and constraints

- Coordinates: north/east/up, tray size, water/land levels.
- Landmarks: one anchor/view/envelope table; tests and verification repeat the targets.
- Road graph: connected, bridges cross water, parcels clear of roads and reserved sites.
- Seeded placement and virtual time; no Math.random in scene construction.
- One offline file, strict CSP, no external requests or fonts.
- Tests and verification use this city's values, not another city's.

## Known issues

## Continuity
