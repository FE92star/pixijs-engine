/**
 * 资源预加载器-利用pixi的loader(加载器)对象，可以用来加载任何类型的图像
 * @param {Array} resource 资源对象列表
 * @return {Promise} 返回一个资源预加载完成的Promise对象
 */

import { Loader } from '../adapter'

export default function (resource: Array<any[]>): Promise<unknown> {
  if (!isArray(resource)) {
    console.error(`请传入一个资源列表`)
    return
  }
  let loaderArr = []
  const nameMapArr = []
  if (isArray(resource[0])) {
    resource.forEach(item => {
      nameMapArr.push(item[0])
      const onComplete = item[2] ? item[2] : null
      const loaderItem = {
        name: item[0], // 资源的别名
        url: item[1], // 资源的地址
        onComplete // 资源完成加载时要调用的函数
      }
      loaderArr.push(loaderItem)
    })
  } else {
    loaderArr = resource
  }
  // 校验资源名称不能重复，否则对应纹理会被覆盖
  if (containsDuplicate(nameMapArr)) {
    console.error(`资源名称不能重复`)
    return
  }
  return new Promise((resolve, reject) => {
    Loader.add(loaderArr)
      .load(resolve)
    Loader.onError.add(reject)
  })
}

/**
 * 数组是否包含重复元素
 */
function containsDuplicate (nums: Array<any>) {
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
 * 是否是数组
 */
function isArray (args: any) {
  return Object.prototype.toString.call(args).indexOf('Array') > -1
}
