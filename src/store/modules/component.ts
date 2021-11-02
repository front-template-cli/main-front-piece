import { CommonAttrs } from '../../modal/Component'
import { StyleAttrs } from '../../modal/RectShape'
/**
 * 组件持久化
 */
const state = {
  curComponent: new CommonAttrs<StyleAttrs>(
    'rect-shape',
    '矩形',
    '',
    '&nbsp;',
    new StyleAttrs(
      200,
      200,
      14,
      500,
      '1',
      0,
      'center',
      '#333',
      '#000',
      1,
      '#fff',
      'solid',
      'middle',
      0,
      1
    ),
    [],
    {},
    false
  ),
  curComponentIndex: ''
}
const getters = {
  curComponent: (state: any) => {
    return state.curComponent
  },
  curComponentIndex: (state: any) => {
    return state.curComponentIndex
  }
}
const mutations = {
  SET_CUR_COMPONENT: (state: any, { component, index }) => {
    state.curComponent = component
    state.curComponentIndex = index
  }
}
const actions = {
  setCurComponent({ commit }, { component, index }) {
    commit('SET_CUR_COMPONENT', { component, index })
  }
}
export default {
  actions,
  getters,
  mutations,
  state
}
