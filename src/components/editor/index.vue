<!-- 画布编辑区域 -->
<template>
  <div id="editor" class="editor-wrapper">
    <!-- 网格线 -->
    <GridLine />
    <Shape
      v-for="(item, index) in componentData"
      :key="index"
      :active="item.id === (curComponent || {}).id"
      :default-style="item.style"
      :element="item"
      :index="index"
      :class="{ lock: item.isLock }"
      :style="getShapeStyle(item.style)"
    >
      <component
        :is="item.component"
        :id="'component_' + item.id"
        :element="item"
        :prop-value="item.propValue"
        :style="getComponentStyle(item.style)"
        class="component"
      />
    </Shape>
  </div>
</template>
<script lang="ts">
  import { CommonStyleAttts } from '@/modal/Component'
  import { defineComponent, onMounted, computed } from 'vue'
  import { useStore } from 'vuex'
  import GridLine from './grid-line.vue'
  import Shape from './shape.vue'
  const { getStyle, getComponentRotatedStyle } = require('@/utils/style')
  export default defineComponent({
    name: 'ComponentWrapper',
    components: {
      GridLine,
      Shape
    },
    setup() {
      const store = useStore()
      // 获取组件列表
      const componentData = computed(() => {
        return store.getters.componentData
      })
      // 获取当前组件
      const curComponent = computed(() => {
        return store.getters.curComponent
      })
      const getShapeStyle = (style: CommonStyleAttts) => {
        const result: any = {}
        ;['width', 'height', 'top', 'left', 'rotate'].forEach((attr) => {
          if (attr != 'rotate') {
            result[attr] = style[attr] + 'px'
          } else {
            result.transform = 'rotate(' + style[attr] + 'deg)'
          }
        })

        return result
      }
      const getComponentStyle = (style: CommonStyleAttts) => {
        // console.log('style:', style)

        return getStyle(style, ['top', 'left', 'width', 'height', 'rotate'])
      }
      onMounted(() => {
        store.dispatch('getEditor')
      })
      return {
        componentData,
        curComponent,
        getComponentStyle,
        getShapeStyle
      }
    }
  })
</script>
<style lang="less" scoped>
  .editor-wrapper {
    position: relative;
    background-color: #fff;
    margin: auto;
    height: 100%;
    width: 100%;
    .component {
      outline: none;
      width: 100%;
      height: 100%;
    }
  }
</style>
