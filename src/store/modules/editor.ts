import { ActionContext } from 'vuex'
import { $ } from '../../utils/utils'

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
interface EditorState {
  canvasStyleData: CanvasStyle
  editor: any
}
const state: EditorState = {
  canvasStyleData: new CanvasStyle(1200, 740, 200),
  editor: null
}
const getters = {
  canvasStyleData: (state: EditorState) => {
    return state.canvasStyleData
  },
  editor: (state: EditorState) => {
    return state.editor
  }
}
const mutations = {
  GET_EDITOR(state: EditorState) {
    state.editor = $('#editor')
  },
  SET_COURSE_STYLE(state: EditorState, style: CanvasStyle) {
    state.canvasStyleData = style
  }
}
const actions = {
  getEditor({ commit }: ActionContext<EditorState, any>) {
    commit('GET_EDITOR')
  },
  /**
   *设置画布样式
   * @param param
   * @param style
   */
  setCanvasStyle(
    { commit }: ActionContext<EditorState, any>,
    style: CanvasStyle
  ) {
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
