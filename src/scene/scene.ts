import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GRID_ANGLE, LANDMARKS, PALETTE, TRAY, type LandmarkId } from './constants'
import { parcels } from './plan'
import { buildCity } from './buildings'
import { buildLandmarks } from './landmarks'
import { buildEnvironment } from './environment'
import { buildTraffic } from './traffic'

export interface Mini {
  focus: (id: LandmarkId) => void
  setNight: (v: number) => void
  reset: () => void
  state: () => { night: number; landmark: LandmarkId | null; fps: number }
  dispose: () => void
}

export function localToWorld(u: number, v: number, y = 0): THREE.Vector3 {
  const c = Math.cos(GRID_ANGLE), s = Math.sin(GRID_ANGLE)
  return new THREE.Vector3(u * c - v * s, y, u * s + v * c)
}

export function createMini(canvas: HTMLCanvasElement): Mini {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.25
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap

  const scene = new THREE.Scene()
  scene.fog = new THREE.Fog(PALETTE.day.fog, 700, 1900)

  const camera = new THREE.PerspectiveCamera(38, 1, 1, 2600)

  const cityGroup = new THREE.Group()
  cityGroup.rotation.y = GRID_ANGLE
  scene.add(cityGroup)

  const env = buildEnvironment()
  cityGroup.add(env.group)
  cityGroup.add(buildCity(parcels(11)))
  cityGroup.add(buildLandmarks())
  const traffic = buildTraffic()
  cityGroup.add(traffic.group)

  const hemi = new THREE.HemisphereLight(0xfff4e2, 0xcfc3ad, 1.5)
  scene.add(hemi)

  const sun = new THREE.DirectionalLight(0xfff6e6, 1.7)
  sun.position.set(180, 320, -240)
  sun.castShadow = true
  sun.shadow.mapSize.set(2048, 2048)
  const sc = sun.shadow.camera as THREE.OrthographicCamera
  sc.left = -420; sc.right = 420; sc.top = 340; sc.bottom = -340
  sc.near = 20; sc.far = 1200
  sun.shadow.radius = 2.5
  sun.shadow.bias = -0.0008
  sun.shadow.normalBias = 0.8
  scene.add(sun)
  scene.add(sun.target)

  const controls = new OrbitControls(camera, canvas)
  controls.enableDamping = true
  controls.dampingFactor = 0.07
  controls.minDistance = 40
  controls.maxDistance = 1200
  controls.maxPolarAngle = Math.PI * 0.48

  const overview = () => {
    const target = localToWorld(10, 56, 0)
    camera.position.copy(localToWorld(-270, -430, 470))
    controls.target.copy(target)
    controls.update()
  }

  let night = 0
  let active: LandmarkId | null = null
  let flight: { from: THREE.Vector3; to: THREE.Vector3; tFrom: THREE.Vector3; tTo: THREE.Vector3; t: number } | null = null

  const focus = (id: LandmarkId) => {
    const lm = LANDMARKS.find((l) => l.id === id)
    if (!lm) return
    active = id
    const k = 2.4
    const target = localToWorld(lm.u, lm.v, lm.look * 0.5)
    const pos = localToWorld(lm.u + lm.view[0] * k, lm.v + lm.view[1] * k, lm.look * 1.3 + 55)
    flight = { from: camera.position.clone(), to: pos, tFrom: controls.target.clone(), tTo: target, t: 0 }
  }

  const reset = () => {
    active = null
    overview()
  }

  const setNight = (v: number) => {
    night = THREE.MathUtils.clamp(v, 0, 1)
  }

  const resize = () => {
    const w = canvas.clientWidth || innerWidth
    const h = canvas.clientHeight || innerHeight
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  }
  resize()
  overview()
  addEventListener('resize', resize)

  let last = performance.now()
  let fps = 60
  let raf = 0

  const applyLight = () => {
    const sky = new THREE.Color(PALETTE.day.sky).lerp(new THREE.Color(PALETTE.night.sky), night)
    scene.background = sky
    scene.fog!.color.lerpColors(new THREE.Color(PALETTE.day.fog), new THREE.Color(PALETTE.night.fog), night)
    sun.intensity = THREE.MathUtils.lerp(1.7, 0.3, night)
    hemi.intensity = THREE.MathUtils.lerp(1.5, 0.3, night)
    hemi.color.lerpColors(new THREE.Color(0xcfe0f0), new THREE.Color(0x1b2a3a), night)
    const water = env.water.material as THREE.MeshPhongMaterial
    water.color.lerpColors(new THREE.Color(PALETTE.day.water), new THREE.Color(PALETTE.night.water), night)
    cityGroup.traverse((o) => {
      const mesh = o as THREE.Mesh
      const mat = mesh.material as THREE.MeshLambertMaterial | undefined
      if (!mat || !('emissive' in mat)) return
      if (mesh.name.startsWith('buildings') || mesh.name.startsWith('landmarks')) {
        mat.emissive = new THREE.Color(0xffcf8a)
        mat.emissiveIntensity = night * 0.55
        if (mat.map) mat.emissiveMap = mat.map
      }
    })
  }

  const loop = (now: number) => {
    const dt = Math.min(0.05, (now - last) / 1000)
    last = now
    fps = fps * 0.9 + (1 / Math.max(dt, 1e-4)) * 0.1

    if (flight) {
      flight.t = Math.min(1, flight.t + dt / 1.1)
      const e = 1 - Math.pow(1 - flight.t, 3)
      camera.position.lerpVectors(flight.from, flight.to, e)
      controls.target.lerpVectors(flight.tFrom, flight.tTo, e)
      if (flight.t >= 1) flight = null
    }

    traffic.update(dt, night)
    applyLight()
    controls.update()
    renderer.render(scene, camera)
    raf = requestAnimationFrame(loop)
  }
  raf = requestAnimationFrame(loop)

  return {
    focus,
    setNight,
    reset,
    state: () => ({ night, landmark: active, fps: Math.round(fps) }),
    dispose: () => {
      cancelAnimationFrame(raf)
      removeEventListener('resize', resize)
      renderer.dispose()
    },
  }
}

export const TRAY_SIZE = TRAY
