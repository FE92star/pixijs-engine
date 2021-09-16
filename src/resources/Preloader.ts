/**
 * 资源预加载器-利用pixi的loader(加载器)对象，可以用来加载任何类型的图像
 * @param {Array} resource 资源对象列表
 * @return {Promise} 返回一个资源预加载完成的Promise对象
 */

import { Loader } from '../adapter'
import { isArray, containsDuplicate } from '../utils'

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
