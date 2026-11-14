import { RIVER, DISTRICTS, type District, type DistrictId } from './constants'

export interface Rect { u0: number; u1: number; v0: number; v1: number }

/** The Yarra: a band with a slow bow, widest at the Princes Bridge bend. */
export function riverNorthEdge(u: number): number {
  return RIVER.north + 4 * Math.sin(u / 180) + 2 * Math.cos(u / 90)
}
export function riverSouthEdge(u: number): number {
  return RIVER.south + 5 * Math.sin(u / 200 + 0.6)
}

export function isWater(u: number, v: number): boolean {
  return v > riverNorthEdge(u) && v < riverSouthEdge(u)
}

/** Reserved lots — nothing procedural may be built inside these. */
export const RESERVED: Rect[] = [
  { u0: -204, u1: 4, v0: 2, v1: 40 },      // station + platforms
  { u0: 10, u1: 78, v0: -4, v1: 44 },       // Federation Square
  { u0: 52, u1: 104, v0: -66, v1: -12 },    // St Paul's
  { u0: 96, u1: 142, v0: -84, v1: -34 },    // Forum
  { u0: -18, u1: 4, v0: -30, v1: -6 },      // Young & Jackson
  { u0: -46, u1: 8, v0: 126, v1: 174 },     // Eureka
  { u0: 60, u1: 132, v0: 120, v1: 182 },    // Arts Centre
  { u0: -16, u1: 16, v0: 44, v1: 110 },     // Princes Bridge deck
  { u0: 70, u1: 240, v0: -352, v1: -182 },  // Royal Exhibition Building + Carlton Gardens
  { u0: 236, u1: 450, v0: 92, v1: 262 },    // MCG and Yarra Park
]

export function inReserved(u: number, v: number, pad = 0): boolean {
  return RESERVED.some((r) => u > r.u0 - pad && u < r.u1 + pad && v > r.v0 - pad && v < r.v1 + pad)
}

export function districtAt(u: number, v: number): District | undefined {
  return DISTRICTS.find((d) => u >= d.u0 && u <= d.u1 && v >= d.v0 && v <= d.v1)
}

export function districtOf(id: DistrictId): District {
  return DISTRICTS.find((d) => d.id === id)!
}

/** Land polygon for the tray, so the ground can be extruded as a slab. */
export function trayOutline(): [number, number][] {
  const { w, d } = { w: 720, d: 540 }
  return [[-w / 2, -d / 2], [w / 2, -d / 2], [w / 2, d / 2], [-w / 2, d / 2]]
}
