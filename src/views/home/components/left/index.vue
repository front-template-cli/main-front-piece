<template>
  <div class="left">
    <div class="component-list">
      <div
        v-for="(comp, index) in componentList"
        :key="index"
        :data-index="index"
        class="comp-item"
        :draggable="true"
        @dragstart="handleDragStart"
      >
        <span>{{ comp.label }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import { list } from '../../../../components/custom-list/configuration'
  export default defineComponent({
    name: 'ComponentName',
    setup() {
      // 组件列表
      const componentList = list
      /**
       * 组件拖拽
       */
      const handleDragStart = (e: DragEvent) => {
        const __index: string =
          (e.target && (e.target as HTMLElement).dataset.index) || '0'
        e.dataTransfer && e.dataTransfer.setData('index', __index)
      }
      return {
        componentList,
        handleDragStart
      }
    }
  })
</script>
<style lang="less" scoped>
  .left {
    flex: 0 0 200px;
    .component-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 10px;
      .comp-item {
        border: 1px solid #ddd;
        cursor: grab;
        width: 45%;
        margin-bottom: 10px;
        text-align: center;
        color: #333;
        padding: 2px 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        &:active {
          cursor: grabbing;
        }
      }
    }
  }
</style>
