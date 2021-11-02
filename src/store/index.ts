import { createStore } from 'vuex'
import editor from './modules/editor'
import component from './modules/component'
export default createStore({
  modules: {
    component,
    editor
  }
})
