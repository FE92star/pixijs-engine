/**
 * 帧动画播放, 根据AnimatedSprite来实现帧动画播放效果
 * @param {String} name-帧动画资源的纹理名称
 * @param {Number} rows-行数
 * @param {Number} columns-列数
 * @param {Number} cutnum-最后一行空白的帧数
 * @param {Number} speed-动画播放速度
 * @param {Boolean} loop-动画是否循环播放
 * @param {Function} onComplete-动画播放结束回调(loop为false才会触发)
 */
import { AnimatedSprite, TextureCache, Rectangle, Texture } from '../adapter'

type voidFn = () => void

interface animateParams {
  /** 帧动画资源的纹理名称 */
  name: string
  /** 行数 */
  rows: number
  /** 列数 */
  columns: number
  /** 最后一行空白的帧数 */
  cutnum?: number
  /** 动画播放速度 */
  speed?: number
  /** 动画是否循环播放 */
  loop?: boolean
  /** 动画播放结束回调(loop为false才会触发) */
  onComplete?: voidFn
}

export default class extends AnimatedSprite {
  constructor(option: animateParams) {
    const { name, columns, rows, cutnum = 0, speed = 1, loop = true, onComplete } = option
    const texture = TextureCache[name]
    const width = Math.floor(texture.width / columns)
    const height = Math.floor(texture.height / rows)
    const framesList = []
    // 遍历帧动画图片源创建一个动画纹理数组
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        // 空白区域不绘制
        if (cutnum && i === rows - 1 && j > cutnum) {
          break
        }
        // 创建一帧的矩形区域
        const recttangle = new Rectangle(j * width, i * height, width, height)
        const frame = new Texture(texture.baseTexture, recttangle)
        framesList.push(frame)
      }
    }
    super(framesList)
    this.animationSpeed = speed
    this.loop = loop
    this.onComplete = onComplete
  }
}
