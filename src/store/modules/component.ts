import { ActionContext } from 'vuex'
import { CommonAttrs } from '../../modal/Component'
import { StyleAttrs } from '../../modal/RectShape'

interface ComponentState {
  curComponent?: CommonAttrs<StyleAttrs>
  curComponentIndex?: string
  isClickComponent?: boolean
  componentData: CommonAttrs<StyleAttrs>[] // 画布的组件数据
}
/**
 * 组件持久化
 */
const state: ComponentState = {
  componentData: [],
  curComponent: new CommonAttrs<StyleAttrs>(
    'rect-shape',
    '矩形',
    '',
    -1,
    '&nbsp;',
    new StyleAttrs(
      200,
      200,
      14,
      500,
      '1',
      0,
      0,
      'center',
      0,
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
  curComponentIndex: '',
  isClickComponent: false
}
const getters = {
  componentData: (state: ComponentState) => {
    return state.componentData
  },
  curComponent: (state: ComponentState) => {
    return state.curComponent
  },
  curComponentIndex: (state: ComponentState) => {
    return state.curComponentIndex
  },
  isClickComponent: (state: ComponentState) => {
    return state.isClickComponent
  }
}
const mutations = {
  ADD_COMPONENT: (state: ComponentState, { component, index }: any) => {
    if (index !== undefined && state.componentData) {
      state.componentData.splice(index, 0, component)
    } else {
      state.componentData.push(component)
    }
  },
  SET_CLICK_COMPONENT_STATUS: (state: ComponentState, status: boolean) => {
    state.isClickComponent = status
  },
  SET_CUR_COMPONENT: (state: ComponentState, { component, index }: any) => {
    state.curComponent = component
    state.curComponentIndex = index
  },
  SET_SHAPE_STYLE: (
    { curComponent }: ComponentState,
    { top, left, width, height, rotate }: any
  ) => {
    if (curComponent) {
      if (top) curComponent.style.top = top
      if (left) curComponent.style.left = left
      if (width) curComponent.style.width = width
      if (height) curComponent.style.height = height
      if (rotate) curComponent.style.rotate = rotate
    }
  }
}
const actions = {
  addComponent(
    { commit }: ActionContext<ComponentState, any>,
    { component, index }: any
  ) {
    commit('ADD_COMPONENT', { component, index })
  },
  setComponentStatus(
    { commit }: ActionContext<ComponentState, any>,
    status: boolean
  ) {
    commit('SET_CLICK_COMPONENT_STATUS', status)
  },
  setCurComponent(
    { commit }: ActionContext<ComponentState, any>,
    { component, index }: any
  ) {
    commit('SET_CUR_COMPONENT', { component, index })
  },
  setShapeStyle(
    { commit }: ActionContext<ComponentState, any>,
    { top, left, width, height, rotate }: any
  ) {
    commit('SET_SHAPE_STYLE', { height, left, rotate, top, width })
  }
}
export default {
  actions,
  getters,
  mutations,
  state
}
