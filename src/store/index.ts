import { createStore } from 'vuex'
import editor from './modules/editor'
import component from './modules/component'
import recordSnapshot from './modules/recordSnapshot'
export default createStore({
  modules: {
    component,
    editor,
    recordSnapshot
  }
})
