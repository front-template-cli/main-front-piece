<template>
  <div class="home">
    <main>
      <left></left>
      <div
        class="editor-box"
        @drop="handleDrop"
        @dragover="handleDragOver"
        @mousedown="handleMouseDown"
        @mouseup="deselectCurComponent"
      >
        <editor></editor>
      </div>
      <right></right>
    </main>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useStore } from 'vuex'
  import Editor from '@/components/editor/index.vue'
  import Left from './components/left/index.vue'
  import Right from './components/right/index.vue'
  import { deepCopy, generateID } from '@/utils/utils'
  import { list } from '../../components/custom-list/configuration'
  export default defineComponent({
    name: 'Home',
    components: {
      Editor,
      Left,
      Right
    },
    setup() {
      const store = useStore()
      const handleDrop = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        const index = e.dataTransfer.getData('index')

        const rectInfo = store.getters.editor.getBoundingClientRect()
        if (index) {
          const component = deepCopy(list[index])

          component.style.top = e.clientY - rectInfo.y
          component.style.left = e.clientX - rectInfo.x
          component.id = generateID()
          console.log('component:', component)

          store.dispatch('addComponent', { component })
          store.commit('recordSnapshot')
        }
      }
      const handleDragOver = (e: any) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'copy'
      }
      const handleMouseDown = () => {
        store.dispatch('setComponentStatus', false)
      }
      const deselectCurComponent = (e: any) => {
        console.log('store.getters:', store.getters.isClickComponent)

        if (!store.getters.isClickComponent) {
          store.dispatch('setCurComponent', {
            component: null,
            index: ''
          })
        }

        // 0 左击 1 滚轮 2 右击
        // if (e.button != 2) {
        //   store.dispatch('hideContextMenu')
        // }
      }
      return {
        deselectCurComponent,
        handleDragOver,
        handleDrop,
        handleMouseDown
      }
    }
  })
</script>
<style lang="less" scoped>
  @import './index.less';
</style>
