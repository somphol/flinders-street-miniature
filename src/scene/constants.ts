// Melbourne CBD miniature — shared constants.
// Local city space: +x east, +z south, y up. The whole city group is rotated by
// GRID_ANGLE so the Hoddle Grid sits 19 degrees off true north, as it does.

export const TRAY = { w: 900, d: 720 }
export const GRID_ANGLE = (-19 * Math.PI) / 180
export const NORTH = -1 // -z is north

export const RIVER = { north: 46, south: 108, width: 62 }

export const PALETTE = {
  day: { sky: 0xefe7d8, fog: 0xefe7d8, sun: 0xfff6e6, water: 0x5aa39b, land: 0xe7dfcc },
  night: { sky: 0x0b1220, fog: 0x0d141d, water: 0x0e1518, land: 0x1a1c1d },
  copper: 0x4e8f7d,
  ochre: 0xc9b08a,
  brick: 0x8f4b3a,
  bluestone: 0x4a5259,
  tramGold: 0xc9a227,
  tramGreen: 0x2f6b4f,
  ui: { ink: 0xefe9dd, panel: 0x141a1f, accent: 0xc9a227 },
} as const

// Street lines in local units. Flinders runs east-west at v = -4.
export const EW_STREETS = [
  { v: -4, name: 'Flinders', width: 22 },
  { v: -62, name: 'Collins', width: 20 },
  { v: -120, name: 'Bourke', width: 20 },
  { v: -178, name: 'Lonsdale', width: 18 },
  { v: -236, name: 'Victoria', width: 18 },
]
export const NS_STREETS = [
  { u: 0, name: 'Swanston', width: 24 },
  { u: -76, name: 'Elizabeth', width: 20 },
  { u: -152, name: 'Queen', width: 20 },
  { u: -212, name: 'King', width: 20 },
  { u: 76, name: 'Russell', width: 20 },
  { u: 148, name: 'Exhibition', width: 18 },
  { u: 220, name: 'Spring', width: 18 },
]

export type DistrictId =
  | 'station' | 'cathedral' | 'collins' | 'chinatown' | 'riverside' | 'southbank'
  | 'carlton' | 'richmond'

export interface District {
  id: DistrictId
  label: string
  u0: number; u1: number; v0: number; v1: number
  height: [number, number]
  families: string[]
}

export const DISTRICTS: District[] = [
  { id: 'station', label: 'Station Corner', u0: -212, u1: 8, v0: -46, v1: 44, height: [8, 16], families: ['terrace', 'institution'] },
  { id: 'cathedral', label: 'Cathedral Hill', u0: 8, u1: 200, v0: -140, v1: 44, height: [10, 26], families: ['terrace', 'institution'] },
  { id: 'collins', label: 'Collins Financial', u0: -212, u1: 40, v0: -200, v1: -62, height: [24, 68], families: ['office', 'glass'] },
  { id: 'chinatown', label: 'Chinatown Laneways', u0: -40, u1: 200, v0: -200, v1: -120, height: [7, 12], families: ['shophouse'] },
  { id: 'riverside', label: 'Riverside West', u0: -212, u1: -150, v0: -60, v1: 44, height: [9, 15], families: ['warehouse'] },
  { id: 'southbank', label: 'Southbank', u0: -120, u1: 160, v0: 112, v1: 260, height: [16, 58], families: ['slab'] },
  { id: 'carlton', label: 'Carlton Gardens', u0: 40, u1: 320, v0: -360, v1: -190, height: [8, 16], families: ['terrace', 'institution'] },
  { id: 'richmond', label: 'Yarra Park', u0: 240, u1: 450, v0: -70, v1: 260, height: [8, 14], families: ['terrace', 'warehouse'] },
]

export const LANDMARKS = [
  { id: 'station', name: 'Flinders Street Station', cn: '弗林德斯街车站', short: 'Station', u: -6, v: 8, look: 26, view: [120, 70] },
  { id: 'stpauls', name: "St Paul's Cathedral", cn: '圣保罗大教堂', short: "St Paul's", u: 78, v: -30, look: 30, view: [90, 60] },
  { id: 'fedsquare', name: 'Federation Square', cn: '联邦广场', short: 'Fed Square', u: 44, v: 14, look: 16, view: [70, 55] },
  { id: 'eureka', name: 'Eureka Tower', cn: '尤利卡大厦', short: 'Eureka', u: -18, v: 150, look: 90, view: [110, 80] },
  { id: 'spire', name: 'Arts Centre Spire', cn: '艺术中心尖塔', short: 'Spire', u: 96, v: 150, look: 80, view: [120, 90] },
  { id: 'youngjackson', name: 'Young & Jackson', cn: '青年与杰克逊酒馆', short: 'Young & Jackson', u: -6, v: -18, look: 10, view: [45, 35] },
  { id: 'forum', name: 'Forum Theatre', cn: '论坛剧院', short: 'Forum', u: 118, v: -60, look: 25, view: [70, 50] },
  { id: 'bridge', name: 'Princes Bridge', cn: '王子桥', short: 'Bridge', u: 0, v: 76, look: 8, view: [60, 45] },
  { id: 'exhibition', name: 'Royal Exhibition Building', cn: '皇家展览馆', short: 'Exhibition', u: 150, v: -268, look: 46, view: [90, 70], dist: 3.4 },
  { id: 'mcg', name: 'Melbourne Cricket Ground', cn: '墨尔本板球场', short: 'MCG', u: 340, v: 172, look: 34, view: [110, 85], dist: 3.6 },
] as const

export type LandmarkId = (typeof LANDMARKS)[number]['id']
