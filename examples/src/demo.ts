import { Preloader } from '@engine/resources'
import { ApplicationRender, CreateSprite, CreateMovieClip } from '@engine/core'
import { TextureCache, Graphics } from '@engine/adapter'
import { hitCircleRect } from '@engine/collision'

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

    // 绘制一个矩形用做精灵的边框
    let rectangle = new Graphics()
    rectangle.lineStyle(4, 0xFF3300, 1);
    rectangle.drawRect(sprite1.x, sprite1.y, sprite1.width, sprite1.height)

    // 创建帧动画播放器
    const animateSprite = new CreateMovieClip({
      name: 'fire',
      rows: 2,
      columns: 12,
      cutnum: 10,
      speed: 0.5,
      loop: true,
      onComplete: () => {
        console.log('动画播放结束')
      }
    })
    animateSprite.position.set(200, 200)
    animateSprite.play()

    let circle = new Graphics()
    circle.beginFill(0x9966FF)
    circle.drawCircle(80, 130, 32)
    circle.endFill()
    app.stage.addChild(circle)

    // 检测圆形和矩形精灵是否发生碰撞
    const isHit = hitCircleRect({ width: 64, center: { x: 80, y: 130 } }, sprite1)
    console.log(`圆形和矩形精灵是否发生碰撞: ${isHit ? '是' : '否'}`)

    app.stage.addChild(sprite1)
    app.stage.addChild(animateSprite)
    app.stage.addChild(rectangle)
  }).catch(() => {
    console.error('预加载失败, 请检查原因')
  })
}

init()
