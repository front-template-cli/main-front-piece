<!-- 矩形容器 -->
<template>
  <div class="rect-shape"></div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'RectShape',
    props: {
      element: {
        type: Object
      },
      value: {
        type: String,
        require: true
      }
    },
    setup() {
      return {}
    }
  })
</script>
<style lang="less" scoped>
  .rect-shape {
    width: 100%;
    height: 100%;
    overflow: auto;
  }
</style>
