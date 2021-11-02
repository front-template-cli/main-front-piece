import { ActionContext } from 'vuex'
import { CommonAttrs } from '../../modal/Component'
import { StyleAttrs } from '../../modal/RectShape'

interface ComponentState {
  curComponent?: CommonAttrs<StyleAttrs>
  curComponentIndex?: string
}
/**
 * 组件持久化
 */
const state: ComponentState = {
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
  curComponent: (state: ComponentState) => {
    return state.curComponent
  },
  curComponentIndex: (state: ComponentState) => {
    return state.curComponentIndex
  }
}
const mutations = {
  SET_CUR_COMPONENT: (state: ComponentState, { component, index }: any) => {
    state.curComponent = component
    state.curComponentIndex = index
  }
}
const actions = {
  setCurComponent(
    { commit }: ActionContext<ComponentState, any>,
    { component, index }: any
  ) {
    commit('SET_CUR_COMPONENT', { component, index })
  }
}
export default {
  actions,
  getters,
  mutations,
  state
}
