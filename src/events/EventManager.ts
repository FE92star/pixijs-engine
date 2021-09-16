/**
 * 基于eventemitter3发布-订阅者模式，代替pixi自带的EventEmitter
 */

 import { EventEmitter } from 'eventemitter3'
 import * as PIXI from 'pixi.js'
 
 // 定义一个新的事件变量代理pixi的事件对象
 let PIXIInteractionEvent = PIXI.InteractionEvent
 
 if ((<any>PIXI).interaction !== undefined) {
   PIXIInteractionEvent = (<any>PIXI).interaction.InteractionEvent
 }
 
 // 导出一个pixi事件对象
 export class InteractionEvent extends PIXIInteractionEvent {}
 
 export default class EventManager {
   private static event = new EventEmitter() // 定义一个事件监听对象
 
   // 定义枚举各种事件类型
   // 网络事件类型
   public static NET_ERROR: string = 'net_error'
   public static NET_RECOVER: string = 'net_recover'
 
   // 资源加载事件类型
   public static LOADING_ERROR: string = 'loadingError'
 
   // 用户交互事件类型
   // mobile touch类型
   public static TOUCH_CLICK: string = 'tap'
   public static TOUCH_START: string = 'touchstart'
   public static TOUCH_MOVE: string = 'touchmove'
   public static TOUCH_END: string = 'touchend'
   // 区域外松开
   public static TOUCH_CANCEL: string = 'touchendoutside'
 
   // pc click类型
   public static MOUSE_CLICK: string = 'click'
   public static MOUSE_DOWN: string = 'mousedown'
   public static MOUSE_MOVE: string = 'mousemove'
   public static MOUSE_UP: string = 'mouseup'
   // 区域外松开鼠标
   public static MOUSE_CANCEL: string = 'mouseupoutside'
 
   // pc+mobile
   public static ALL_CLICK: string = 'tap+click'
   public static ALL_START: string = 'touchstart+mousedown'
   public static ALL_MOVE: string = 'touchmove+mousemove'
   // 区域内结束
   public static ALL_END: string = 'touchend+mouseup'
   // 区域外结束
   public static ALL_CANCEL: string = 'touchendoutside+mouseupoutside'
 
   /**
    * 事件监听-静态方法，不需要实例化调用，直接通过类来调用
    * @param {String} name-事件名称
    * @param {Function} fn-事件触发回调
    * @param {Object} context-上下文对象
    */
   public static on(
     name: string,
     fn: Function,
     context?: any
   ) {
     EventManager.event.on(name, <any>fn, context)
   }
 
   /**
    * 一次性监听器，参数同on方法相同
    */
   public static once(
     name: string,
     fn: Function,
     context?: any
   ) {
     EventManager.event.once(name, <any>fn, context)
   }
 
   /**
    * 事件触发
    * @param {String} name-事件名称
    */
   public static emit(name: string, ...args: Array<any>) {
     EventManager.event.emit(name, ...args)
   }
 
   /**
    * 移除某个事件监听器，参数同on方法一致
    */
   public static off(
     name: string,
     fn: Function,
     context?: any
   ) {
     EventManager.event.off(name, <any>fn, context)
   }
 
   /**
    * 移除全部的事件监听器
    */
   public static offAll() {
     const names = EventManager.event.eventNames()
     if (Array.isArray(names)) {
       names.forEach(name => {
         EventManager.event.removeListener(name)
       })
     }
   }
 }
 