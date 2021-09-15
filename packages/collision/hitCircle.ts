/**
 * 用于检测两个圆形是否碰撞
 * 原理：比较两个圆形的圆心之间的距离和半径之和的距离大小
 * @param {circleOption} r1-圆形1相关数据
 * @param {circleOption} r2-圆形2相关数据
 * @return {Boolean} 是否发生碰撞
 */

export interface circleOption {
  /** 圆的直径 */
  width: number
  /** 圆心坐标 */
  center: {
    x: number,
    y: number
  }
}

export default function (r1: circleOption, r2: circleOption): boolean {
  // 半径
  const radius1 = r1.width / 2
  const radius2 = r2.width / 2

  // 计算两个圆心之间的距离(勾股定理)
  const distance = pointDistance(r1.center, r2.center)
  
  // 比较半径之和与圆心距离
  const hit = distance > (radius1 + radius2) ? false : true
  return hit
}

export function pointDistance (p1: any, p2: any) {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2))
}
