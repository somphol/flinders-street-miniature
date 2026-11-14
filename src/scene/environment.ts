import * as THREE from 'three'
import { PALETTE, TRAY } from './constants'
import { riverNorthEdge, riverSouthEdge } from './geography'
import { instanced, rng, type Instance } from './kit'
import { roads } from './plan'

export function buildEnvironment(): { group: THREE.Group; water: THREE.Mesh; ground: THREE.Mesh } {
  const group = new THREE.Group()
  group.name = 'environment'
  const rand = rng(3)

  // land slab
  const ground = new THREE.Mesh(
    new THREE.BoxGeometry(TRAY.w, 4, TRAY.d),
    new THREE.MeshLambertMaterial({ color: PALETTE.day.land })
  )
  ground.position.y = -2
  ground.receiveShadow = true
  group.add(ground)

  // water band, a bowed strip following the Yarra
  const u0 = -TRAY.w / 2, u1 = TRAY.w / 2
  const steps = 48
  const shape = new THREE.Shape()
  // shape is authored in (u, -v) so that rotating -90 deg about X lands it
  // face-up at +v; rotating the other way leaves the normal pointing down
  for (let i = 0; i <= steps; i++) {
    const u = u0 + ((u1 - u0) * i) / steps
    if (i === 0) shape.moveTo(u, -riverNorthEdge(u))
    else shape.lineTo(u, -riverNorthEdge(u))
  }
  for (let i = steps; i >= 0; i--) {
    const u = u0 + ((u1 - u0) * i) / steps
    shape.lineTo(u, -riverSouthEdge(u))
  }
  const waterGeo = new THREE.ShapeGeometry(shape, 24)
  waterGeo.rotateX(-Math.PI / 2)
  const water = new THREE.Mesh(
    waterGeo,
    new THREE.MeshPhongMaterial({ color: PALETTE.day.water, shininess: 90, specular: 0x9fb6c0 })
  )
  water.position.y = 0.22
  water.receiveShadow = true
  group.add(water)

  // road surfaces
  const asphalt = new THREE.MeshLambertMaterial({ color: 0x8d8b84 })
  for (const r of roads()) {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(r.u1 - r.u0, r.v1 - r.v0), asphalt)
    m.rotation.x = -Math.PI / 2
    m.position.set((r.u0 + r.u1) / 2, 0.07, (r.v0 + r.v1) / 2)
    m.receiveShadow = true
    group.add(m)
    if (r.name === 'Flinders' || r.name === 'Swanston') {
      const lane = new THREE.Mesh(
        new THREE.PlaneGeometry(r.ew ? r.u1 - r.u0 : 0.5, r.ew ? 0.5 : r.v1 - r.v0),
        new THREE.MeshLambertMaterial({ color: 0xf2ead4 })
      )
      lane.rotation.x = -Math.PI / 2
      lane.position.set((r.u0 + r.u1) / 2, 0.09, (r.v0 + r.v1) / 2)
      group.add(lane)
    }
  }

  // quay walls
  for (const edge of [riverNorthEdge, riverSouthEdge]) {
    const n = 24
    for (let i = 0; i < n; i++) {
      const ua = u0 + ((u1 - u0) * i) / n
      const ub = u0 + ((u1 - u0) * (i + 1)) / n
      const va = edge(ua), vb = edge(ub)
      const len = Math.hypot(ub - ua, vb - va)
      const wall = new THREE.Mesh(
        new THREE.BoxGeometry(len, 2.4, 2),
        new THREE.MeshLambertMaterial({ color: 0xd8d2c2 })
      )
      wall.position.set((ua + ub) / 2, 0.4, (va + vb) / 2)
      wall.rotation.y = Math.atan2(vb - va, ub - ua)
      wall.receiveShadow = true
      group.add(wall)
    }
  }

  // street trees along Flinders and the promenade
  const trunks: Instance[] = []
  const crowns: Instance[] = []
  for (let u = -330; u < 330; u += 26) {
    for (const v of [-14, 118]) {
      if (rand() < 0.2) continue
      trunks.push({ u, v, w: 1.1, d: 1.1, h: 4 })
      crowns.push({ u, v, w: 6, d: 6, h: 7, y: 4, color: 0x86b06a })
    }
  }
  group.add(instanced(new THREE.CylinderGeometry(0.5, 0.7, 1, 6), new THREE.MeshLambertMaterial({ color: 0x5a4634 }), trunks, 'trunks'))
  group.add(instanced(new THREE.SphereGeometry(1, 8, 6), new THREE.MeshLambertMaterial({ color: 0xffffff }), crowns, 'crowns'))

  // tram stops on Flinders
  for (const u of [-140, -40, 60]) {
    const stop = new THREE.Mesh(new THREE.BoxGeometry(16, 0.4, 6), new THREE.MeshLambertMaterial({ color: 0x8d9296 }))
    stop.position.set(u, 0.2, -12)
    stop.receiveShadow = true
    group.add(stop)
    const shelter = new THREE.Mesh(new THREE.BoxGeometry(10, 3, 0.5), new THREE.MeshLambertMaterial({ color: 0x3c4a44 }))
    shelter.position.set(u, 1.8, -13.6)
    group.add(shelter)
  }

  return { group, water, ground }
}
