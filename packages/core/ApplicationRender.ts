/**
 * 创建一个自定义的根容器，用于解决以下几个适配问题：
 * 1、由于游戏是竖屏模式，而某APP在IPAD下是强制横屏的，所以需要一个方式去适配。
 * 创建一个根容器，将容器旋转90度，让游戏画布始终保持一个真正意义上的竖屏，
 * 2、游戏本身需要保持一定的纵横比，而且在不同分辨率的屏幕下都要保证内容显示正常，即需要一个适当的缩放。
 * 以宽度为基础，对容器的高度进行缩放
 * 3、并非游戏内的所有元素都是有绝对位置定位的，有些元素的位置需要根据当前实际的游戏屏幕中的可视范围来确定，比如用户控制按钮必须在屏幕可视区域内置低，计分板必须置顶等，这需要在渲染时动态计算。
 */

import * as PIXI from 'pixi.js'
import { Application, Container } from '../adapter'

export type TScreen = {
  /** 可视区域的宽度,对标画布尺寸 */
  width: number
  /** 可视区域的高度 */
  height: number
  /** 可视区域的宽度,对标设备尺寸 */
  realWidth: number
  /** 可视区域的高度,对标设备尺寸 */
  realHeight: number
  /** 设备宽高比 */
  aspectRatio: number
  /** 宽度缩放比 */
  scaleRatio: number
}

export default class extends Application {
  private options: PIXI.IApplicationOptions // application配置选项
  public root = new Container() // 用于实际操作的根容器对象
  public realScreen: TScreen // 存储游戏实际的可视范围参数

  constructor(options?: PIXI.IApplicationOptions) {
    super(options)
    // 合并初始化选项和传入的配置选项
    options = Object.assign({
      view: document.querySelector('canvas'),
      width: 750,
      height: 1334,
      resolution: 1, // 渲染容器的分辨率
      antialias: true, // 开启抗锯齿
      backgroundAlpha: 0, // 设置透明渲染背景
      transparent: true
    }, options)
    this.options = options

    this.root = new Container()
    this.stage.addChild(this.root)
  }

  public resize = () => {
    const { width, height } = this.options
    const { innerWidth: winWidth, innerHeight: winHeight } = window
    
    // 可视区域的宽高
    let offsetWidth = winWidth
    let offserHeight = winHeight
    
    // 以屏幕宽度比为基准,对高度进行缩放
    const scaleRatio = offsetWidth / width
    this.renderer.resize(winWidth / scaleRatio, height) // 更改画布的大小适配屏幕宽高比

    // 宽高比
    const aspectRatio = offserHeight / offsetWidth
    const newWidth = width * scaleRatio

    // 设置canvas应用容器的缩放属性
    this.options.view.style.transformOrigin = 'top left'
    this.options.view.style.transform = `scale(${scaleRatio})`

    // 监测横竖屏，设置根容器的旋转角度和纵向偏移
    if (window.orientation === 90 || window.orientation === -90) {
      this.root.rotation = -Math.PI / 2 // 旋转90deg
      this.root.y = newWidth
    } else {
      this.root.rotation = 0
      this.root.y = 0
    }

    // 构建真实的可视数据
    this.realScreen = {
      width: offsetWidth / scaleRatio,
      height: offserHeight / scaleRatio,
      realWidth: offsetWidth,
      realHeight: offserHeight,
      aspectRatio,
      scaleRatio
    }
  }
}
