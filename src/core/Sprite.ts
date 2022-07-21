/**
 * PIXI使用webgl在gpu上渲染图像，图像需要转换为gpu可以处理的东西，这个东西就是texture(纹理)。为了保证快速高效，pixi使用texture cache（纹理缓存）来存储和引用你的精灵需要的所有纹理。
 * texture（纹理）的名称就是引用图像的文件的路径。通过loader加载器加载图像资源，所有加载完成的图像纹理都统一被存储到纹理缓存中
 */

import { Sprite, TextureCache } from '../adapter'

export default function (
  name: string,
  width?: number,
  height?: number,
  x = 0,
  y = 0
) {
  // 从纹理缓存对象中取得对应名称的纹理，再创建精灵对象
  const sprite = new Sprite(TextureCache[name])
  // 设置精灵纹理对象的缩放比例
  sprite.texture.baseTexture.scaleMode = 1
  // 判断纹理缓存对象中是否包含对应名称的纹理
  if (sprite.width === 1) {
    console.error(`请确保加载正确的纹理名称: ${name}`)
    return
  }

  // 设置属性
  sprite.width = width || sprite.width
  sprite.height = height || sprite.height
  sprite.x = x
  sprite.y = y
  return sprite
}
