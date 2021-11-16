import { ActionContext } from 'vuex'

class GlobalState {
  public loading?: boolean = false
  public loadingText?: string = 'Loading...'
}

/**
 * 组件持久化
 */
const state: GlobalState = {
  loading: false, // 加载状态
  loadingText: 'Loading...' // 加载文案
}
const getters = {
  loading: (state: GlobalState) => {
    return state.loading
  },
  loadingText: (state: GlobalState) => {
    return state.loadingText
  }
}
const mutations = {
  SET_LOADING: (state: GlobalState, { loading, loadingText }: GlobalState) => {
    state.loading = loading
    if (!state.loadingText) {
      state.loadingText = loadingText || 'Loading...'
    }
  },
  SET_LOADING_TEXT: (state: GlobalState, value: string) => {
    if (value) {
      state.loadingText = value
    }
  }
}
const actions = {
  /**
   * 设置loading状态
   * @param param
   * @param value
   */
  setLoading: ({ commit }: ActionContext<GlobalState, any>, value: boolean) => {
    commit('SET_LOADING', value)
  },
  /**
   * 设置loading提示文案
   * @param param
   * @param text
   */
  setLoadingText: (
    { commit }: ActionContext<GlobalState, any>,
    text: string
  ) => {
    commit('SET_LOADING_TEXT', text)
  }
}

export default {
  actions,
  getters,
  mutations,
  state
}
