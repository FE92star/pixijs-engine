import { Preloader } from '@engine/resources'
import { ApplicationRender, CreateSprite, CreateMovieClip } from '@engine/core'
import { TextureCache } from '@engine/adapter'

let count = 0

const loadCount = () => {
  count++
  console.log(`加载资源图片第${count}张, 时间${Date.now()}`)
}

export function init() {
  const app = new ApplicationRender({
    view: document.querySelector('#Game'),
    height: 1624,
    transparent: true
  })

  app.resize()

  Preloader([
    ['car1', '//yun.tuisnake.com/h5-mami/worldTrip/1.0/gamearea/people/car1.png', loadCount],
    ['car2', '//yun.tuisnake.com/h5-mami/worldTrip/1.0/gamearea/people/car2.png', loadCount],
    ['fire', '//yun.tuisnake.com/h5-mami/worldTrip/1.0/building/blue_fireworks.png', loadCount]
  ]).then(() => {
    const sprite1 = CreateSprite('car1')
    const nextTexture = TextureCache['car2']
    sprite1.texture = nextTexture

    sprite1.position.set(100, 100)

    // 创建帧动画播放器
    const animateSprite = new CreateMovieClip({
      name: 'fire',
      rows: 2,
      columns: 12,
      cutnum: 10,
      speed: 0.5,
      loop: false,
      onComplete: () => {
        console.log('动画播放结束')
      }
    })
    animateSprite.play()

    app.stage.addChild(sprite1)
    app.stage.addChild(animateSprite)
  }).catch(() => {
    console.error('预加载失败, 请检查原因')
  })
}

init()
