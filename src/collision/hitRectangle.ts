/**
 * 用于检测两个矩形是否碰撞
 * 原理：比较两个矩形中心点的横纵距离和矩形宽高一半之和的大小
 * @param {Sprite} s1-矩形精灵实例1
 * @param {Sprite} s2-矩形精灵实例2
 * @return {Boolean} 是否发生碰撞
 */

export default function (s1: any, s2: any): boolean {
  let hit = false // 碰撞结果
  let combinedHalfWidths: number // 两个矩形宽的一半的总和
  let combinedHalfHeights: number // 两个矩形高的一半的总和
  let vx: number // 矩形中心点的x距离
  let vy: number // 中心点的y距离

  // 找到中心点
  s1.centerX = s1.x + s1.width / 2
  s1.centerY = s1.y + s1.height / 2
  s2.centerX = s2.x + s2.width / 2
  s2.centerY = s2.y + s2.height / 2

  // 矩形宽高的一半
  s1.halfWidth = s1.width / 2
  s1.halfHeight = s1.height / 2
  s2.halfWidth = s2.width / 2
  s2.halfHeight = s2.height / 2

  // 计算中心点的距离
  vx = s1.centerX - s2.centerX
  vy = s1.centerY - s2.centerY

  // 计算宽高一半之和的距离
  combinedHalfWidths = s1.halfWidth + s2.halfWidth
  combinedHalfHeights = s1.halfHeight + s2.halfHeight

  // 当中心点的距离分别小于宽高一半之和的距离时，发生碰撞
  if (Math.abs(vx) < combinedHalfWidths && Math.abs(vy) < combinedHalfHeights) {
    hit = true
  }
  return hit
}
