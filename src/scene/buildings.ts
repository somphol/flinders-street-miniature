import * as THREE from 'three'
import { districtAt } from './geography'
import type { Parcel } from './plan'
import { facadeTexture, instanced, rng, type Instance } from './kit'
import { PALETTE } from './constants'

interface FamilySpec {
  kind: 'office' | 'terrace' | 'warehouse' | 'shophouse'
  color: number
  roof: number
  hMul: number
}

const FAMILIES: Record<string, FamilySpec> = {
  terrace: { kind: 'terrace', color: 0xd8cbb2, roof: 0x6b4a3a, hMul: 1 },
  institution: { kind: 'terrace', color: 0xcfc2a8, roof: 0x5a5f63, hMul: 1.3 },
  office: { kind: 'office', color: 0xb9bcc0, roof: 0x5c6167, hMul: 1 },
  glass: { kind: 'office', color: 0x8fa4b4, roof: 0x7d8b96, hMul: 1.15 },
  shophouse: { kind: 'shophouse', color: 0xc79a72, roof: 0x6a4a3c, hMul: 1 },
  warehouse: { kind: 'warehouse', color: 0x8d9298, roof: 0x4a5259, hMul: 1 },
  slab: { kind: 'office', color: 0xc3c8c9, roof: 0x8b9296, hMul: 1 },
}

export function buildCity(parcelList: Parcel[], seed = 11): THREE.Group {
  const rand = rng(seed)
  const group = new THREE.Group()
  group.name = 'city'

  const buckets = new Map<string, Instance[]>()
  const roofs: Instance[] = []

  for (const p of parcelList) {
    const mu = (p.u0 + p.u1) / 2
    const mv = (p.v0 + p.v1) / 2
    const d = districtAt(mu, mv)
    const familyName = d ? d.families[Math.floor(rand() * d.families.length)] : 'terrace'
    const spec = FAMILIES[familyName] ?? FAMILIES.terrace
    const [lo, hi] = d ? d.height : [8, 16]
    const h = (lo + rand() * (hi - lo)) * spec.hMul
    const w = (p.u1 - p.u0) * 0.92
    const dep = (p.v1 - p.v0) * 0.92
    const jitter = 0.94 + rand() * 0.12

    const inst: Instance = {
      u: mu, v: mv, w, d: dep, h,
      color: new THREE.Color(spec.color).multiplyScalar(jitter).getHex(),
    }
    const key = familyName
    if (!buckets.has(key)) buckets.set(key, [])
    buckets.get(key)!.push(inst)

    roofs.push({ u: mu, v: mv, w: w * 1.03, d: dep * 1.03, h: 0.7, y: h, color: spec.roof })
  }

  const box = new THREE.BoxGeometry(1, 1, 1)
  for (const [family, items] of buckets) {
    const spec = FAMILIES[family] ?? FAMILIES.terrace
    const tex = facadeTexture(spec.kind)
    const mat = new THREE.MeshLambertMaterial({ map: tex, color: 0xffffff })
    const mesh = instanced(box, mat, items, `buildings_${family}`)
    // facade UVs repeat with height, so tall towers get more floors
    group.add(mesh)
  }

  const roofMat = new THREE.MeshLambertMaterial({ color: 0xffffff })
  group.add(instanced(box, roofMat, roofs, 'roofs'))
  return group
}
