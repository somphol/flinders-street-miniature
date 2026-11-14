export type Locale = 'en' | 'zh-CN'

export const COPY = {
  en: {
    title: 'Flinders Street',
    titleAccent: 'in one tray.',
    lede: 'Ten landmarks, one river bend, four bridges.',
    footer: 'A DIGITAL COLLECTIBLE · VOL. 001',
    tagline: 'The corner where the city introduces itself.',
    eyebrow: '37.8183° S · 144.9671° E',
    day: 'Day',
    night: 'Night',
    reset: 'Overview',
    hint: 'drag to orbit · scroll to zoom',
    labels: {
      station: 'Station', stpauls: "St Paul's", fedsquare: 'Fed Square', eureka: 'Eureka',
      spire: 'Spire', youngjackson: 'Young & Jackson', forum: 'Forum', bridge: 'Bridge',
      exhibition: 'Exhibition', mcg: 'MCG',
    } as Record<string, string>,
  },
  'zh-CN': {
    title: '弗林德斯街',
    titleAccent: '一盘中见墨尔本。',
    lede: '十个地标，一道河湾，四座桥。',
    footer: '数字收藏 · 第一卷',
    tagline: '这座城市自我介绍的那个街角。',
    eyebrow: '南纬 37.8183° · 东经 144.9671°',
    day: '日',
    night: '夜',
    reset: '全景',
    hint: '拖动旋转 · 滚轮缩放',
    labels: {
      station: '车站', stpauls: '圣保罗', fedsquare: '联邦广场', eureka: '尤利卡',
      spire: '尖塔', youngjackson: '酒吧', forum: '论坛', bridge: '王子桥',
      exhibition: '展览馆', mcg: '板球场',
    } as Record<string, string>,
  },
}

export type Copy = typeof COPY.en
