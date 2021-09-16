/**
 * 是否是数组
 */
export function isArray (args: unknown) {
  return Object.prototype.toString.call(args).indexOf('Array') > -1
}

/**
 * 数组是否包含重复元素
 */
export function containsDuplicate (nums: Array<any>) {
  let hash = new Map
  for (let i of nums) {
    if (hash.has(i)) {
      hash.set(i, hash.get(i) + 1)
    } else {
      hash.set(i, 1)
    }
  }
  for (let i of hash.values()) {
    if (i > 1)
      return true
  }
  return false
}

/**
 * 计算两点距离
 */
export function pointDistance (p1: any, p2: any) {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2))
}
