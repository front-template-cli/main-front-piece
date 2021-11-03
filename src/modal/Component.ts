/**
 * 组件的基础样式
 */
export class CommonStyleAttts {
  constructor(
    rotate: number,
    opacity: number,
    width: number,
    height: number,
    left: number,
    top: number
  ) {
    this.rotate = rotate
    this.opacity = opacity
    this.width = width
    this.height = height
    this.left = left
    this.top = top
  }
  rotate: number // 旋转角度
  opacity: number // 透明度
  width: number // 宽度
  height: number // 高度
  left: number // 左边距离
  top: number // 上边距离
}

/**
 * 组件的公共属性
 */
export class CommonAttrs<T> {
  constructor(
    component: string,
    label: string,
    icon: string,
    id: number,
    propValue: string,
    style: T,
    animations: string[],
    events: any,
    isLock: boolean
  ) {
    this.component = component
    this.label = label
    this.icon = icon
    this.propValue = propValue
    this.style = style
    this.animations = animations
    this.events = events
    this.isLock = isLock
    this.id = id
  }
  component: string // 组件
  label: string // 名称
  icon: string // 图标
  id: number
  propValue: string // 默认值
  style: T // 样式集合
  animations?: string[] // 动画集合
  events?: any // 触发事件
  isLock: boolean // 是否锁定
}
