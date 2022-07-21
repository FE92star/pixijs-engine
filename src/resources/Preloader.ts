/**
 * 资源预加载器-利用pixi的loader(加载器)对象，可以用来加载任何类型的图像
 * @param {Array} resource 资源对象列表
 * @return {Promise} 返回一个资源预加载完成的Promise对象
 */

import { Loader } from '../adapter'
import { containsDuplicate, EmptyFn } from '../utils'

interface LoaderItemType {
  name: string
  url: string
  onComplete: EmptyFn
}

export default function (resource: Array<any[]>): Promise<unknown> {
  if (!resource.length) {
    return Promise.reject('请至少传入一个资源列表')
  }

  let loaderArr: LoaderItemType[] = []
  const nameMapArr: any[] = []
  // 处理资源
  resource.forEach(item => {
    nameMapArr.push(item[0])
    const onComplete = item[2] ? item[2] : null
    const loaderItem: LoaderItemType = {
      name: item[0], // 资源的别名
      url: item[1], // 资源的地址
      onComplete // 资源完成加载时要调用的函数
    }
    loaderArr.push(loaderItem)
  })

  // 校验资源名称不能重复，否则对应纹理会被覆盖
  if (containsDuplicate(nameMapArr)) {
    return Promise.reject('资源名称不能重复')
  }

  return new Promise((resolve, reject) => {
    Loader.add(loaderArr)
      .load(resolve)
    Loader.onError.add(reject)
  })
}
