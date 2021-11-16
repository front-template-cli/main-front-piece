import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { createStorage } from '@/utils/storage'
import global, { GlobalState } from './modules/global'
const Storage = createStorage({ storage: localStorage })
export interface IStore {
  global: GlobalState
}
const plugins = [
  createPersistedState({
    paths: [''],
    storage: {
      getItem: (key: any) => Storage.get(key),
      removeItem: (key: any) => Storage.remove(key),
      setItem: (key: any, value: any) => Storage.set(key, value)
    }
  })
]

export default createStore({
  modules: {
    global
  }
})
