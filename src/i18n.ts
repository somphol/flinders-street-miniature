export type Locale = 'en' | 'zh-CN'

export const COPY = {
  en: {
    title: 'Flinders Street',
    tagline: 'Melbourne, in one tray.',
    eyebrow: '37.8183° S · 144.9671° E',
    day: 'Day',
    night: 'Night',
    reset: 'Overview',
    hint: 'drag to orbit · scroll to zoom',
    labels: {
      station: 'Station', stpauls: "St Paul's", fedsquare: 'Fed Square', eureka: 'Eureka',
      spire: 'Spire', youngjackson: 'Young & Jackson', forum: 'Forum', bridge: 'Bridge',
    } as Record<string, string>,
  },
  'zh-CN': {
    title: '弗林德斯街',
    tagline: '一盘中见墨尔本。',
    eyebrow: '南纬 37.8183° · 东经 144.9671°',
    day: '日',
    night: '夜',
    reset: '全景',
    hint: '拖动旋转 · 滚轮缩放',
    labels: {
      station: '车站', stpauls: '圣保罗', fedsquare: '联邦广场', eureka: '尤利卡',
      spire: '尖塔', youngjackson: '酒吧', forum: '论坛', bridge: '王子桥',
    } as Record<string, string>,
  },
}

export type Copy = typeof COPY.en
