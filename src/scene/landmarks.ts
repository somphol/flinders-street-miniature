import * as THREE from 'three'
import { PALETTE } from './constants'
import { facadeTexture } from './kit'

const lambert = (c: number) => new THREE.MeshLambertMaterial({ color: c })

function box(w: number, h: number, d: number, c: number, x = 0, y = 0, z = 0): THREE.Mesh {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), lambert(c))
  m.position.set(x, y + h / 2, z)
  m.castShadow = true
  m.receiveShadow = true
  return m
}

function lathe(points: [number, number][], c: number, seg = 24): THREE.Mesh {
  const geo = new THREE.LatheGeometry(points.map(([x, y]) => new THREE.Vector2(x, y)), seg)
  const m = new THREE.Mesh(geo, lambert(c))
  m.castShadow = true
  m.receiveShadow = true
  return m
}

/** Flinders Street Station: the hero. Long wing, corner dome, west clock tower. */
function station(): THREE.Group {
  const g = new THREE.Group()
  const ochre = 0xc9b08a
  const brick = 0x9c5b45
  const copper = PALETTE.copper

  // main wing, 200 m of frontage, dressed with a window texture
  const wingTex = facadeTexture('office')
  const wingTex2 = wingTex.clone()
  wingTex2.needsUpdate = true
  wingTex2.repeat.set(14, 2)
  const wingMat = new THREE.MeshLambertMaterial({ map: wingTex2, color: 0xffffff })
  const wing = new THREE.Mesh(new THREE.BoxGeometry(200, 20, 32), wingMat)
  wing.position.set(-100, 10, 20)
  wing.castShadow = true
  wing.receiveShadow = true
  g.add(wing)
  g.add(box(200, 2.4, 32.4, ochre, -100, 13, 20))
  // parapet ring, not a slab over the roof
  g.add(box(201, 1.4, 1.6, brick, -100, 21.2, 4))
  g.add(box(201, 1.4, 1.6, brick, -100, 21.2, 36))
  g.add(box(1.6, 1.4, 33, brick, -200, 21.2, 20))
  g.add(box(201, 0.8, 33.4, 0xe2d6bd, -100, 20.2, 20))

  // corner pavilion + dome, at the Swanston end
  g.add(box(24, 27, 24, ochre, -6, 0, 14))
  const drum = new THREE.Mesh(new THREE.CylinderGeometry(7.4, 7.4, 7, 28), lambert(0xd8cdb6))
  drum.position.set(-6, 30.5, 14)
  drum.castShadow = true
  g.add(drum)
  const dome = lathe([[7.4, 0], [7.2, 1.4], [6.2, 3.3], [4.2, 5.1], [1.6, 6.6], [1.5, 9.6], [0, 11.2]], copper)
  dome.position.set(-6, 34, 14)
  g.add(dome)

  // clock tower at the Elizabeth end
  const tx = -186
  g.add(box(13, 52, 13, brick, tx, 0, 10))
  g.add(box(13.6, 3, 13.6, 0xe2d6bd, tx, 52, 10))
  g.add(box(13.2, 12, 13.2, 0xd8cdb6, tx, 55, 10))
  g.add(box(13.8, 1, 13.8, 0xe2d6bd, tx, 67, 10))
  const cap = lathe([[6.7, 0], [6.4, 1.2], [4.6, 3.2], [2.2, 4.6], [0, 5.4]], copper)
  cap.position.set(tx, 68, 10)
  g.add(cap)

  // four clock dials
  for (const [dx, dz, ry] of [[0, 6.7, 0], [0, -6.7, Math.PI], [6.7, 0, Math.PI / 2], [-6.7, 0, -Math.PI / 2]] as const) {
    const dial = new THREE.Mesh(new THREE.CylinderGeometry(1.7, 1.7, 0.3, 20), lambert(0xf1ebdc))
    dial.rotation.z = Math.PI / 2
    dial.rotation.y = ry
    dial.position.set(tx + dx, 61, 10 + dz)
    g.add(dial)
  }

  // the row of nine clocks under the dome
  for (let i = 0; i < 9; i++) {
    const dial = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.2, 12), lambert(0xf6f1e4))
    dial.rotation.x = Math.PI / 2
    dial.position.set(-16 + i * 2.5, 11, 2.2)
    g.add(dial)
  }

  // arched entry, facing north
  const arch = new THREE.Mesh(
    new THREE.CylinderGeometry(4.2, 4.2, 3.2, 16, 1, false, 0, Math.PI),
    lambert(0x4b4239)
  )
  arch.rotation.z = Math.PI / 2
  arch.rotation.y = Math.PI / 2
  arch.position.set(-6, 9, 1.9)
  g.add(arch)
  g.add(box(8.4, 6.5, 2.4, 0x4b4239, -6, 0, 1.9))

  // steps
  for (let i = 0; i < 3; i++) g.add(box(14 - i * 1.2, 0.5, 1.6 + i * 1.1, 0xbfb39c, -6, 0, -1 - i * 0.9))
  return g
}

function stPauls(): THREE.Group {
  const g = new THREE.Group()
  const stone = 0xd5cdb9
  g.add(box(34, 16, 52, stone, 78, 0, -40))
  g.add(box(34.6, 1.2, 52.6, 0x8d8a80, 78, 16, -40))
  const spire = new THREE.Mesh(new THREE.ConeGeometry(3.2, 26, 8), lambert(0xc9c1ad))
  spire.position.set(78, 16 + 13, -62)
  spire.castShadow = true
  g.add(spire)
  for (const dz of [-18, -40, -62]) {
    const p = new THREE.Mesh(new THREE.ConeGeometry(6, 9, 6), lambert(0xbdb5a1))
    p.position.set(78, 16 + 4.5, dz)
    g.add(p)
  }
  return g
}

function fedSquare(): THREE.Group {
  const g = new THREE.Group()
  const zinc = 0x9aa0a3
  const glass = 0x7f8f99
  const shards: [number, number, number, number, number, number][] = [
    [34, 14, 10, 34, -6, 22], [30, 12, 22, 52, 2, 16], [26, 9, 16, 66, -2, 26], [22, 11, 14, 40, 34, 14],
  ]
  shards.forEach(([w, h, d, x, z, tilt], i) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), lambert(i % 2 ? glass : zinc))
    m.position.set(x, h / 2, z)
    m.rotation.z = tilt * 0.004
    m.rotation.x = 0.06
    m.castShadow = true
    m.receiveShadow = true
    g.add(m)
  })
  return g
}

function eureka(): THREE.Group {
  const g = new THREE.Group()
  g.add(box(42, 8, 42, 0x9aa0a4, -18, 0, 150))
  g.add(box(30, 78, 30, 0xa8b2b8, -18, 8, 150))
  g.add(box(30.6, 4, 30.6, 0xc9a227, -18, 86, 150))
  g.add(box(8, 5, 3, 0xc9a227, -18, 90, 150))
  return g
}

function artsCentre(): THREE.Group {
  const g = new THREE.Group()
  g.add(box(46, 12, 46, 0xb6bcc0, 96, 0, 150))
  const body = new THREE.Mesh(new THREE.CylinderGeometry(9, 12, 26, 10), lambert(0xc6ccd0))
  body.position.set(96, 25, 150)
  g.add(body)
  const spire = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 5.4, 44, 10), lambert(0xd8dde0))
  spire.position.set(96, 60, 150)
  spire.castShadow = true
  g.add(spire)
  const tip = new THREE.Mesh(new THREE.ConeGeometry(1.2, 10, 8), lambert(0xe6eaec))
  tip.position.set(96, 87, 150)
  g.add(tip)
  return g
}

function youngJackson(): THREE.Group {
  const g = new THREE.Group()
  g.add(box(22, 12, 20, 0x8f4b3a, -6, 0, -18))
  g.add(box(22.4, 1, 20.4, 0xd8cbb2, -6, 12, -18))
  g.add(box(3, 4, 3, 0x8f4b3a, -14, 12, -26))
  return g
}

function forum(): THREE.Group {
  const g = new THREE.Group()
  g.add(box(34, 16, 40, 0xd9d3c6, 118, 0, -60))
  const tower = new THREE.Mesh(new THREE.CylinderGeometry(6, 6, 12, 12), lambert(0xe4ded2))
  tower.position.set(118, 22, -70)
  g.add(tower)
  const dome = lathe([[6, 0], [5.6, 1.6], [3.6, 3.4], [0, 4.6]], 0x6b7f6e, 12)
  dome.position.set(118, 28, -70)
  g.add(dome)
  return g
}

function princesBridge(): THREE.Group {
  const g = new THREE.Group()
  const stone = 0x8b8f93
  g.add(box(30, 1.6, 70, stone, 0, 0, 76))
  for (let i = 0; i < 3; i++) {
    const span = new THREE.Mesh(
      new THREE.CylinderGeometry(7.4, 7.4, 26, 14, 1, false, 0, Math.PI),
      lambert(0x7c8085)
    )
    span.rotation.x = Math.PI / 2
    span.rotation.z = Math.PI / 2
    span.position.set(0, 6, 52 + i * 20)
    g.add(span)
  }
  for (const u of [-13, 13]) {
    for (let i = 0; i < 4; i++) g.add(box(0.5, 3, 0.5, 0x3f4448, u, 1.6, 50 + i * 16))
  }
  return g
}

export function buildLandmarks(): THREE.Group {
  const g = new THREE.Group()
  g.name = 'landmarks'
  g.add(station(), stPauls(), fedSquare(), eureka(), artsCentre(), youngJackson(), forum(), princesBridge())
  return g
}
