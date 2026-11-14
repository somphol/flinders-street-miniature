import * as THREE from 'three'
import { PALETTE } from './constants'
import { riverNorthEdge } from './geography'

interface Tram { mesh: THREE.Group; u: number; dir: number; lane: number }
interface Boat { mesh: THREE.Mesh; u: number; speed: number; v: number }

const lam = (c: number) => new THREE.MeshLambertMaterial({ color: c })

function tramMesh(): THREE.Group {
  const g = new THREE.Group()
  const body = new THREE.Mesh(new THREE.BoxGeometry(18, 3.4, 5.4), lam(PALETTE.tramGreen))
  body.position.y = 2.2
  body.castShadow = true
  g.add(body)
  const stripe = new THREE.Mesh(new THREE.BoxGeometry(18.2, 0.5, 5.6), lam(PALETTE.tramGold))
  stripe.position.y = 2.6
  g.add(stripe)
  const roof = new THREE.Mesh(new THREE.BoxGeometry(17, 0.5, 4.8), lam(0xe7e2d4))
  roof.position.y = 4.1
  g.add(roof)
  const window = new THREE.Mesh(new THREE.BoxGeometry(17.4, 1.1, 5.5), lam(0x2b3a3a))
  window.position.y = 2.9
  g.add(window)
  return g
}

export function buildTraffic(): { group: THREE.Group; update: (dt: number, night: number) => void } {
  const group = new THREE.Group()
  group.name = 'traffic'
  const trams: Tram[] = []

  for (let i = 0; i < 6; i++) {
    const t = tramMesh()
    const dir = i % 2 === 0 ? 1 : -1
    const tram: Tram = { mesh: t, u: -300 + i * 110, dir, lane: dir > 0 ? -9 : 1 }
    t.position.set(tram.u, 0, tram.lane)
    t.rotation.y = dir > 0 ? Math.PI / 2 : -Math.PI / 2
    group.add(t)
    trams.push(tram)
  }

  const boats: Boat[] = []
  for (let i = 0; i < 3; i++) {
    const b = new THREE.Mesh(new THREE.BoxGeometry(12, 1.6, 4), lam(0xe8e4d8))
    const v = riverNorthEdge(0) + 18 + i * 14
    b.position.set(-200 + i * 120, 0.4, v)
    b.castShadow = true
    group.add(b)
    boats.push({ mesh: b, u: b.position.x, speed: 6 + i * 2, v })
  }

  const people: THREE.InstancedMesh = (() => {
    const geo = new THREE.BoxGeometry(0.8, 1.7, 0.8)
    const mesh = new THREE.InstancedMesh(geo, lam(0x2f3a44), 220)
    const m = new THREE.Matrix4()
    let i = 0
    const spots: [number, number][] = []
    for (let k = 0; k < 60; k++) spots.push([-8 + (Math.random() - 0.5) * 20, 2 + Math.random() * 8])
    for (let k = 0; k < 80; k++) spots.push([-180 + Math.random() * 360, -6 + Math.random() * 4])
    for (let k = 0; k < 80; k++) spots.push([-120 + Math.random() * 300, 112 + Math.random() * 6])
    for (const [u, v] of spots) {
      if (i >= 220) break
      m.makeTranslation(u, 0.85, v)
      mesh.setMatrixAt(i++, m)
    }
    mesh.count = i
    mesh.castShadow = true
    return mesh
  })()
  group.add(people)

  const update = (dt: number, night: number) => {
    for (const t of trams) {
      t.u += t.dir * 26 * dt
      if (t.u > 330) t.u = -330
      if (t.u < -330) t.u = 330
      t.mesh.position.x = t.u
    }
    for (const b of boats) {
      b.u += b.speed * dt
      if (b.u > 340) b.u = -340
      b.mesh.position.x = b.u
    }
    void night
  }

  return { group, update }
}
