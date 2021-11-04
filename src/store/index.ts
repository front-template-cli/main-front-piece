import { createStore } from 'vuex'
import editor from './modules/editor'
import component from './modules/component'
import recordSnapshot from './modules/recordSnapshot'
import contextMenu from './modules/contextMenu'
export default createStore({
  modules: {
    component,
    contextMenu,
    editor,
    recordSnapshot
  }
})
