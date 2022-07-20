/**
 * 继承关系: DisplayObject > Container > Sprite
 * 代理底层DisplayObject显示对象原型上的`on`和`off`方法
 */

import * as PIXI from 'pixi.js'
import EventManager from './EventManager'

const on = PIXI.Container.prototype.on
const off = PIXI.Container.prototype.off

/**
 * 代理on监听器
 */
function patchedOn<T extends PIXI.DisplayObject>(
  event: string,
  fn: Function
): T {
  // 针对联合事件单独处理
  switch (event) {
    case EventManager.ALL_CLICK:
      on.call(this, EventManager.TOUCH_CLICK, fn)
      return on.call(this, EventManager.MOUSE_CLICK, fn)
    case EventManager.ALL_START:
      on.call(this, EventManager.TOUCH_START, fn)
      return on.call(this, EventManager.MOUSE_DOWN, fn)
    case EventManager.ALL_MOVE:
      on.call(this, EventManager.TOUCH_MOVE, fn)
      return on.call(this, EventManager.MOUSE_MOVE, fn)
    case EventManager.ALL_END:
      on.call(this, EventManager.TOUCH_END, fn)
      return on.call(this, EventManager.MOUSE_UP, fn)
    case EventManager.ALL_CANCEL:
      on.call(this, EventManager.TOUCH_CANCEL, fn)
      return on.call(this, EventManager.MOUSE_CANCEL, fn)
  }
  return on.apply(this, arguments)
}

/**
 * 代理off取消监听器
 */
 function patchedOff<T extends PIXI.DisplayObject>(
  event: string,
  fn: Function
): T {
  // 针对联合事件单独处理
  switch (event) {
    case EventManager.ALL_CLICK:
      off.call(this, EventManager.TOUCH_CLICK, fn)
      return off.call(this, EventManager.MOUSE_CLICK, fn)
    case EventManager.ALL_START:
      off.call(this, EventManager.TOUCH_START, fn)
      return off.call(this, EventManager.MOUSE_DOWN, fn)
    case EventManager.ALL_MOVE:
      off.call(this, EventManager.TOUCH_MOVE, fn)
      return off.call(this, EventManager.MOUSE_MOVE, fn)
    case EventManager.ALL_END:
      off.call(this, EventManager.TOUCH_END, fn)
      return off.call(this, EventManager.MOUSE_UP, fn)
    case EventManager.ALL_CANCEL:
      off.call(this, EventManager.TOUCH_CANCEL, fn)
      return off.call(this, EventManager.MOUSE_CANCEL, fn)
  }
  return off.apply(this, arguments)
}

// 重新反向赋值
PIXI.Container.prototype.on = patchedOn
// @ts-ignore
PIXI.Container.prototype.off = patchedOff
