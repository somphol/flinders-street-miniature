import { EW_STREETS, NS_STREETS, TRAY } from './constants'
import { isWater, riverNorthEdge, riverSouthEdge, inReserved, type Rect } from './geography'
import { rng } from './kit'

export interface Road { u0: number; u1: number; v0: number; v1: number; name: string; ew: boolean }
export interface Parcel extends Rect { districtHint: string }

const HALF_W = TRAY.w / 2
const HALF_D = TRAY.d / 2

export function roads(): Road[] {
  const out: Road[] = []
  for (const s of EW_STREETS) {
    out.push({ u0: -HALF_W, u1: HALF_W, v0: s.v - s.width / 2, v1: s.v + s.width / 2, name: s.name, ew: true })
  }
  for (const s of NS_STREETS) {
    out.push({ u0: s.u - s.width / 2, u1: s.u + s.width / 2, v0: -HALF_D, v1: HALF_D, name: s.name, ew: false })
  }
  return out
}

/** Blocks are the cells between consecutive streets, clipped to land. */
export function blocks(): Rect[] {
  const us = [-HALF_W, ...NS_STREETS.map((s) => s.u), HALF_W].sort((a, b) => a - b)
  const vs = [-HALF_D, ...EW_STREETS.map((s) => s.v), HALF_D].sort((a, b) => a - b)
  const out: Rect[] = []
  for (let i = 0; i < us.length - 1; i++) {
    for (let j = 0; j < vs.length - 1; j++) {
      const u0 = us[i] + 12, u1 = us[i + 1] - 12
      const v0 = vs[j] + 12, v1 = vs[j + 1] - 12
      if (u1 - u0 < 20 || v1 - v0 < 20) continue
      const mu = (u0 + u1) / 2, mv = (v0 + v1) / 2
      if (isWater(mu, mv)) continue
      out.push({ u0, u1, v0, v1 })
    }
  }
  return out
}

/** Subdivide a block into parcels, then drop the ones that fall in water or a reserved lot. */
export function parcels(seed = 7): Parcel[] {
  const rand = rng(seed)
  const out: Parcel[] = []
  for (const b of blocks()) {
    const w = b.u1 - b.u0
    const d = b.v1 - b.v0
    const cols = Math.max(2, Math.round(w / 26))
    const rows = Math.max(2, Math.round(d / 24))
    const cw = w / cols
    const cd = d / rows
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const gap = 1.8
        const u0 = b.u0 + i * cw + gap
        const u1 = b.u0 + (i + 1) * cw - gap
        const v0 = b.v0 + j * cd + gap
        const v1 = b.v0 + (j + 1) * cd - gap
        const mu = (u0 + u1) / 2, mv = (v0 + v1) / 2
        // a parcel must sit wholly on one bank: testing only the centre let
        // buildings straddle the water and stand in the Yarra
        const bankN = Math.max(riverNorthEdge(u0), riverNorthEdge(u1))
        const bankS = Math.min(riverSouthEdge(u0), riverSouthEdge(u1))
        const dry = v1 <= bankN - 1.5 || v0 >= bankS + 1.5
        if (!dry || inReserved(mu, mv, 2)) continue
        if (rand() < 0.03) continue
        out.push({ u0, u1, v0, v1, districtHint: '' })
      }
    }
  }
  return out
}

export interface Bridge { u: number; v0: number; v1: number; width: number; name: string; arches: number }

export const BRIDGES: Bridge[] = [
  { u: 0, v0: 36, v1: 118, width: 30, name: 'Princes Bridge', arches: 3 },
  { u: -152, v0: 36, v1: 118, width: 24, name: 'Queens Bridge', arches: 3 },
  { u: 44, v0: 36, v1: 118, width: 8, name: 'Evan Walker Bridge', arches: 1 },
]
