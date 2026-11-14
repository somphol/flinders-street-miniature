import { useEffect, useRef, useState } from 'react'
import { createMini, type Mini } from './scene/scene'
import { LANDMARKS, type LandmarkId } from './scene/constants'
import { COPY, type Locale } from './i18n'

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const miniRef = useRef<Mini | null>(null)
  const [locale, setLocale] = useState<Locale>('en')
  const [night, setNight] = useState(0)
  const [active, setActive] = useState<LandmarkId | null>(null)
  const [az, setAz] = useState(0)

  useEffect(() => {
    if (!canvasRef.current) return
    const mini = createMini(canvasRef.current)
    miniRef.current = mini
    ;(window as unknown as { __mini: Mini }).__mini = mini
    const id = setInterval(() => setAz(Math.round(mini.azimuth())), 120)
    return () => {
      clearInterval(id)
      mini.dispose()
    }
  }, [])

  const t = COPY[locale]
  const pick = (id: LandmarkId) => {
    miniRef.current?.focus(id)
    setActive(id)
  }
  const toggleNight = () => {
    const next = night > 0.5 ? 0 : 1
    setNight(next)
    miniRef.current?.setNight(next)
  }

  return (
    <>
      <canvas ref={canvasRef} className="stage" />
      <div className="vignette" />

      <header className="hud">
        <p className="eyebrow">{t.eyebrow}</p>
        <h1>
          {t.title}
          <em>{t.titleAccent}</em>
        </h1>
        <p className="tagline">{t.tagline}</p>
        <span className="rule" />
        <p className="lede">{t.lede}</p>
      </header>

      <div className="controls">
        <div className="seg">
          <button className={night < 0.5 ? 'on' : ''} onClick={() => { setNight(0); miniRef.current?.setNight(0) }}>
            {t.day}
          </button>
          <button className={night > 0.5 ? 'on' : ''} onClick={() => { setNight(1); miniRef.current?.setNight(1) }}>
            {t.night}
          </button>
        </div>
        <button
          className="ghost"
          aria-label={t.reset}
          onClick={() => { miniRef.current?.reset(); setActive(null) }}
        >
          ⟲
        </button>
        <button className="ghost" onClick={() => setLocale(locale === 'en' ? 'zh-CN' : 'en')}>
          {locale === 'en' ? '中文' : 'EN'}
        </button>
      </div>

      <div className="rail">
        <button aria-label="zoom in" onClick={() => miniRef.current?.zoom(0.78)}>+</button>
        <button aria-label="zoom out" onClick={() => miniRef.current?.zoom(1.28)}>−</button>
        <span className="sep" />
        <div className="compass" aria-hidden="true">
          <i style={{ transform: `rotate(${-az}deg)` }} />
          <b>N</b>
        </div>
      </div>

      <nav className="cards">
        {LANDMARKS.map((l, i) => (
          <button
            key={l.id}
            className={active === l.id ? 'card on' : 'card'}
            onClick={() => pick(l.id)}
            title={locale === 'en' ? l.name : l.cn}
          >
            <span className="num">{String(i + 1).padStart(2, '0')}</span>
            <span className="name">{t.labels[l.id] ?? l.short}</span>
            <span className="arrow">↗</span>
          </button>
        ))}
      </nav>

      <footer className="foot">
        <span>{t.hint}</span>
        <span className="vol">{t.footer}</span>
      </footer>
    </>
  )
}
