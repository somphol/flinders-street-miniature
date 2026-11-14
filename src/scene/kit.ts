import * as THREE from 'three'

export function rng(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a += 0x6d2b79f5
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export interface Instance { u: number; v: number; w: number; d: number; h: number; y?: number; rot?: number; color?: number }

/** One InstancedMesh for a whole family: cheap draw calls, per-instance colour. */
export function instanced(
  geo: THREE.BufferGeometry,
  mat: THREE.Material,
  items: Instance[],
  name: string
): THREE.InstancedMesh {
  const mesh = new THREE.InstancedMesh(geo, mat, Math.max(1, items.length))
  mesh.name = name
  mesh.castShadow = true
  mesh.receiveShadow = true
  const m = new THREE.Matrix4()
  const q = new THREE.Quaternion()
  const s = new THREE.Vector3()
  const p = new THREE.Vector3()
  const c = new THREE.Color()
  items.forEach((it, i) => {
    p.set(it.u, (it.y ?? 0) + it.h / 2, it.v)
    q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), it.rot ?? 0)
    s.set(it.w, it.h, it.d)
    m.compose(p, q, s)
    mesh.setMatrixAt(i, m)
    if (it.color !== undefined) mesh.setColorAt(i, c.setHex(it.color))
  })
  mesh.instanceMatrix.needsUpdate = true
  if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  mesh.count = items.length
  return mesh
}

const cache = new Map<string, THREE.CanvasTexture>()

/** Window grid drawn to a canvas: no external assets, one texture reused everywhere. */
export function facadeTexture(kind: 'office' | 'terrace' | 'warehouse' | 'shophouse' = 'office'): THREE.CanvasTexture {
  const hit = cache.get(kind)
  if (hit) return hit
  const w = 256, h = 256
  const c = document.createElement('canvas')
  c.width = w; c.height = h
  const g = c.getContext('2d')!
  g.fillStyle = '#ffffff'
  g.fillRect(0, 0, w, h)

  const cols = kind === 'office' ? 6 : 4
  const rows = kind === 'warehouse' ? 3 : 5
  const mx = 10, my = 12
  const cw = (w - mx * (cols + 1)) / cols
  const ch = (h - my * (rows + 1)) / rows

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const x = mx + i * (cw + mx)
      const y = my + j * (ch + my)
      g.fillStyle = j === 0 ? '#d9d2c4' : '#7d99a5'
      g.fillRect(x, y, cw, ch)
      if (kind === 'terrace' || kind === 'shophouse') {
        g.fillStyle = '#f2ece0'
        g.fillRect(x, y + ch * 0.45, cw, 3)
      }
    }
  }
  const tex = new THREE.CanvasTexture(c)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 4
  cache.set(kind, tex)
  return tex
}
