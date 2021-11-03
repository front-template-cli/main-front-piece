import { deepCopy } from '../../utils/utils'
import store from '../index'
interface RecordSnapshotState {
  snapshotData: any
  snapshotIndex: number
}
const state: RecordSnapshotState = {
  snapshotData: [],
  snapshotIndex: -1
}
const getters = {
  snapshotData(state: RecordSnapshotState) {
    return state.snapshotData
  },
  snapshotIndex(state: RecordSnapshotState) {
    return state.snapshotIndex
  }
}
const mutations = {
  recordSnapshot(state: RecordSnapshotState) {
    // 添加新的快照
    state.snapshotData[++state.snapshotIndex] = deepCopy(
      store.state.componentData
    )
    // 在 undo 过程中，添加新的快照时，要将它后面的快照清理掉
    if (state.snapshotIndex < state.snapshotData.length - 1) {
      state.snapshotData = state.snapshotData.slice(0, state.snapshotIndex + 1)
    }
  },
  redo(state: RecordSnapshotState) {
    if (state.snapshotIndex < state.snapshotData.length - 1) {
      state.snapshotIndex++
      store.commit(
        'setComponentData',
        deepCopy(state.snapshotData[state.snapshotIndex])
      )
    }
  },
  undo(state: RecordSnapshotState) {
    if (state.snapshotIndex >= 0) {
      state.snapshotIndex--
      const componentData =
        deepCopy(state.snapshotData[state.snapshotIndex]) || []
      if (store.state.getters.curComponent) {
        // 如果当前组件不在 componentData 中，则置空
        console.log('进来了')

        const needClean = !componentData.find(
          (component: any) => store.state.curComponent.id === component.id
        )

        if (needClean) {
          store.commit('setCurComponent', {
            component: null,
            index: null
          })
        }
      }
      store.commit('setComponentData', componentData)
    }
  }
}
const actions = {}
export default {
  actions,
  getters,
  mutations,
  state
}
