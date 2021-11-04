import { ActionContext } from 'vuex'

interface ContextMenuState {
  menuLeft: number
  menuTop: number
  menuShow: boolean
}
const state: ContextMenuState = {
  menuLeft: 0,
  menuShow: false,
  menuTop: 0
}
const getters = {
  menuLeft(state: ContextMenuState) {
    return state.menuLeft
  },
  menuShow(state: ContextMenuState) {
    return state.menuShow
  },
  menuTop(state: ContextMenuState) {
    return state.menuTop
  }
}
const mutations = {
  HIDE_CONTEXT_MENU(state: ContextMenuState) {
    state.menuShow = false
  },
  SHOW_CONTEXT_MENU(state: ContextMenuState, { left, top }: any) {
    state.menuShow = true
    state.menuTop = top
    state.menuLeft = left
  }
}
const actions = {
  hideContextMenu({ commit }: ActionContext<ContextMenuState, any>) {
    commit('HIDE_CONTEXT_MENU')
  },
  showContextMenu(
    { commit }: ActionContext<ContextMenuState, any>,
    { top, left }: any
  ) {
    commit('SHOW_CONTEXT_MENU', { left, top })
  }
}

export default {
  actions,
  getters,
  mutations,
  state
}
