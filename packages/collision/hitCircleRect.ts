/**
 * 用于检测圆形和矩形是否碰撞, 坐标系左上角为原点
 * 原理：矩形和圆形相切时只有一个交点，这个交点就是矩形上距离圆心最近的点，再判断这个点距离圆心和半径的大小即可
 * @param {circleOption} r-圆形相关数据(半径、圆心的坐标)
 * @param {Sprite} s-矩形精灵
 * @return {Boolean} 是否发生碰撞
 */

import { pointDistance } from './hitCircle'
import type { circleOption } from './hitCircle'

export default function (r: circleOption, s: any): boolean {
  const center = r.center
  const radius = r.width / 2
  let cx: number
  let cy: number
  // x坐标
  if (center.x < s.x) { // 圆心在左侧
    cx = s.x
  } else if (center.x > s.x + s.width) { // 在右侧
    cx = s.x + s.width
  } else {
    cx = center.x
  }

  // y坐标
  if (center.y < s.y) { // 圆心在上方
    cy = s.y
  } else if (center.y > s.y + s.height) { // 在下方
    cy = s.y + s.height
  } else {
    cy = center.y
  }

  // 计算最近点和圆心之间的距离
  const distance = pointDistance({ x: cx, y: cy }, center)

  // 比较最近点和圆心之间的距离与半径大小
  const hit = distance < radius ? true : false
  return hit
}
