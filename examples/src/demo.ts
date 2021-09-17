import { Preloader, CreateSprite, ApplicationRender, CreateMovieClip, EventManager, hitCircleRect } from '@engine'
import * as PIXI from 'pixi.js'

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

  // 初始化事件监听器
  EventManager.on('circle', (data: unknown) => {
    console.log(data)
  })
  // app.stage.sortableChildren = true

  Preloader([
    ['car1', '//yun.tuisnake.com/h5-mami/worldTrip/1.0/gamearea/people/car1.png', loadCount],
    ['car2', '//yun.tuisnake.com/h5-mami/worldTrip/1.0/gamearea/people/car2.png', loadCount],
    ['fire', '//yun.tuisnake.com/h5-mami/worldTrip/1.0/building/blue_fireworks.png', loadCount]
  ]).then(() => {
    const container = new PIXI.Container()
    container.position.set(300, 350)
    // 设置容器内部子元素进行zIndex重排
    container.sortableChildren = true
    container.zIndex = 2

    const sprite1 = CreateSprite('car1')
    sprite1.zIndex = 10

    const sprite2 = CreateSprite('car2')
    sprite2.zIndex = 11

    container.addChild(sprite1)
    container.addChild(sprite2)

    // 设置旋转中心点
    container.pivot.x = container.width / 2
    container.pivot.y = container.height / 2

    // 绘制一个矩形用做精灵的边框
    // let rectangle = new Graphics()
    // rectangle.lineStyle(4, 0xFF3300, 1);
    // rectangle.drawRect(sprite1.x, sprite1.y, sprite1.width, sprite1.height)

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
    animateSprite.zIndex = 1
    animateSprite.play()

    let circle = new PIXI.Graphics()
    circle.beginFill(0x9966FF)
    circle.drawCircle(80, 130, 32)
    circle.endFill()

    // circle添加点击事件
    circle.interactive = true
    // circle.on('tap', () => {
    //   console.log('圆形被点击了')
    // })
    circle.on(EventManager.ALL_CLICK, (e) => {
      // 触发事件
      EventManager.emit('circle', e.type)
    })

    app.stage.addChild(circle)

    // 检测圆形和矩形精灵是否发生碰撞
    const isHit = hitCircleRect({ width: 64, center: { x: 80, y: 130 } }, sprite1)
    console.log(`圆形和矩形精灵是否发生碰撞: ${isHit ? '是' : '否'}`)

    app.stage.addChild(container)
    app.stage.addChild(animateSprite)

    // app.ticker.add((delta) => {
    //   container.rotation -= 0.1 * delta
    // })
  }).catch(() => {
    console.error('预加载失败, 请检查原因')
  })
}

init()
