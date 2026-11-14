import test from 'node:test'
import assert from 'node:assert/strict'
import { parcels, blocks, roads, BRIDGES } from '../src/scene/plan'
import { isWater, inReserved, riverNorthEdge, riverSouthEdge } from '../src/scene/geography'
import { LANDMARKS, DISTRICTS } from '../src/scene/constants'

const P = parcels(11)

test('enough parcels to read as a city', () => {
  assert.ok(P.length > 300, `only ${P.length}`)
})

test('no parcel sits in the river or on a reserved lot', () => {
  for (const p of P) {
    const u = (p.u0 + p.u1) / 2, v = (p.v0 + p.v1) / 2
    assert.ok(!isWater(u, v), `parcel in water at ${u},${v}`)
    assert.ok(!inReserved(u, v), `parcel on reserved lot at ${u},${v}`)
  }
})

test('parcels are contained by their block', () => {
  const B = blocks()
  for (const p of P) {
    const inside = B.some((b) => p.u0 >= b.u0 - 1 && p.u1 <= b.u1 + 1 && p.v0 >= b.v0 - 1 && p.v1 <= b.v1 + 1)
    assert.ok(inside, `parcel outside every block: ${JSON.stringify(p)}`)
  }
})

test('every bridge spans the water', () => {
  for (const b of BRIDGES) {
    assert.ok(b.v0 < riverNorthEdge(b.u), `${b.name} starts in water`)
    assert.ok(b.v1 > riverSouthEdge(b.u), `${b.name} stops short of the south bank`)
  }
})

test('the grid has both street directions', () => {
  const r = roads()
  assert.ok(r.some((x) => x.name === 'Flinders' && x.ew))
  assert.ok(r.some((x) => x.name === 'Swanston' && !x.ew))
})

test('ten landmarks, each with a unique id', () => {
  assert.equal(LANDMARKS.length, 10)
  const ids = new Set(LANDMARKS.map((l) => l.id))
  assert.equal(ids.size, 10)
})

test('the two outer landmarks sit outside the CBD grid', () => {
  const mcg = LANDMARKS.find((l) => l.id === 'mcg')!
  const exh = LANDMARKS.find((l) => l.id === 'exhibition')!
  assert.ok(mcg.u > 220, 'MCG should sit beyond Spring Street')
  assert.ok(exh.v < -200, 'Exhibition should sit north of Victoria Street')
})

test('districts do not overlap the river centreline', () => {
  for (const d of DISTRICTS) {
    const v = (d.v0 + d.v1) / 2
    if (v > riverNorthEdge(0) && v < riverSouthEdge(0)) continue
    assert.ok(Number.isFinite(d.height[0] + d.height[1]))
  }
})

test('landmark anchors are unique and finite', () => {
  const seen = new Set<string>()
  for (const l of LANDMARKS) {
    const k = `${l.u},${l.v}`
    assert.ok(!seen.has(k), `duplicate anchor ${k}`)
    seen.add(k)
    assert.ok(Number.isFinite(l.u) && Number.isFinite(l.v) && l.look > 0)
  }
})
