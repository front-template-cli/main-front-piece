export class CanvasStyle {
  constructor(width: number, height: number, scale: number) {
    this.width = width
    this.height = height
    this.scale = scale
  }
  width: number
  height: number
  scale: number
}
/**
 * 组件持久化
 */
const state = {
  canvasStyleData: new CanvasStyle(1200, 740, 200)
}
const getters = {
  canvasStyleData: (state: any) => {
    return state.canvasStyleData
  }
}
const mutations = {
  SET_COURSE_STYLE(state: any, style: CanvasStyle) {
    state.canvasStyleData = style
  }
}
const actions = {
  /**
   *设置画布样式
   * @param param
   * @param style
   */
  setCanvasStyle({ commit }, style: CanvasStyle) {
    if (style) {
      commit('SET_COURSE_STYLE', style)
    }
  }
}

export default {
  actions,
  getters,
  mutations,
  state
}
