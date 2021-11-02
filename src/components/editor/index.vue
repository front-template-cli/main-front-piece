<!-- 画布编辑区域 -->
<template>
  <div id="editor" class="editor-wrapper">
    <!-- 网格线 -->
    <GridLine />
    <Shape></Shape>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import GridLine from './grid-line.vue'
  import Shape from './shape.vue'
  export default defineComponent({
    name: 'ComponentWrapper',
    components: {
      GridLine,
      Shape
    },
    setup() {
      return {}
    }
  })
</script>
<style lang="less" scoped>
  .editor-wrapper {
    position: relative;
    background-color: #fff;
    margin: auto;
    height: 100%;
    flex: 1;
  }
</style>
