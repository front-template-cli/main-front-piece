import { CommonStyleAttts } from './Component'

/**
 * 矩形框
 */
export class StyleAttrs extends CommonStyleAttts {
  constructor(
    width: number,
    height: number,
    fontSize: number,
    fontWeight: number,
    lineHeight: string,
    left: number,
    letterSpacing: number,
    textAlign: string,
    top: 0,
    color: string,
    borderColor: string,
    borderWidth: number,
    backgroundColor: string,
    borderStyle: string,
    verticalAlign: string,
    rotate: number,
    opacity: number
  ) {
    super(rotate, opacity, width, height, left, top)
    this.width = width
    this.height = height
    this.fontSize = fontSize
    this.fontWeight = fontWeight
    this.lineHeight = lineHeight
    this.letterSpacing = letterSpacing
    this.textAlign = textAlign
    this.color = color
    this.borderColor = borderColor
    this.borderStyle = borderStyle
    this.borderWidth = borderWidth
    this.backgroundColor = backgroundColor
    this.verticalAlign = verticalAlign
    this.left = left
    this.top = top
  }
  fontSize: number // 字体大小
  fontWeight: number // 字重
  lineHeight: string // 行高
  letterSpacing: number // 行间距
  textAlign: string // 水平位置
  color: string // 字体颜色
  borderColor: string // 边框颜色
  borderWidth: number // 边框宽度
  borderStyle: string // 边框类型
  backgroundColor: string // 背景色
  verticalAlign: string // 垂直位置
}
