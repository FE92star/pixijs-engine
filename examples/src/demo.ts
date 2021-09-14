import { Preloader } from '@engine/resources'
import { ApplicationRender, CreateSprite } from '@engine/core'

let count = 0

const loadCount = () => {
  count++
  console.log(`加载资源图片第${count}张, 时间${Date.now()}`)
}

export function init() {
  const app = new ApplicationRender({
    view: document.querySelector('#Game'),
    height: 1334
  })

  app.resize()

  Preloader([
    ['car1', '//yun.tuisnake.com/h5-mami/worldTrip/1.0/gamearea/people/car1.png', loadCount],
    ['car2', '//yun.tuisnake.com/h5-mami/worldTrip/1.0/gamearea/people/car2.png', loadCount],
    ['car3', '//yun.tuisnake.com/h5-mami/worldTrip/1.0/gamearea/people/car3.png', loadCount],
    ['car4', '//yun.tuisnake.com/h5-mami/worldTrip/1.0/gamearea/people/car4.png', loadCount]
  ]).then(() => {
    const sprite1 = CreateSprite('car1')
    app.stage.addChild(sprite1)
  }).catch(() => {
    console.error('预加载失败, 请检查原因')
  })
}

init()
