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

  useEffect(() => {
    if (!canvasRef.current) return
    const mini = createMini(canvasRef.current)
    miniRef.current = mini
    ;(window as unknown as { __mini: Mini }).__mini = mini
    return () => mini.dispose()
  }, [])

  const t = COPY[locale]

  const focus = (id: LandmarkId) => {
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
      <header className="hud">
        <p className="eyebrow">{t.eyebrow}</p>
        <h1>{t.title}</h1>
        <p className="tagline">{t.tagline}</p>
      </header>

      <div className="controls">
        <button className={night > 0.5 ? 'on' : ''} onClick={toggleNight}>
          {night > 0.5 ? t.night : t.day}
        </button>
        <button
          onClick={() => {
            miniRef.current?.reset()
            setActive(null)
          }}
        >
          {t.reset}
        </button>
        <button onClick={() => setLocale(locale === 'en' ? 'zh-CN' : 'en')}>
          {locale === 'en' ? '中文' : 'EN'}
        </button>
      </div>

      <nav className="bar">
        {LANDMARKS.map((l) => (
          <button
            key={l.id}
            className={active === l.id ? 'on' : ''}
            onClick={() => focus(l.id)}
            title={locale === 'en' ? l.name : l.cn}
          >
            {t.labels[l.id] ?? l.short}
          </button>
        ))}
      </nav>

      <p className="hint">{t.hint}</p>
    </>
  )
}
