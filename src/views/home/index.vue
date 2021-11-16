<template>
  <div>
    <a-button type="primary" @click="handleGetApi">调用</a-button>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import { Button } from 'ant-design-vue'
  import { getApi } from '../../api/api-method'
  export default defineComponent({
    name: 'ComponentName',
    components: { AButton: Button },
    setup() {
      const handleGetApi = () => {
        getApi()
      }
      return {
        handleGetApi
      }
    }
  })
</script>
<style lang="less" scoped>
  .page {
  }
</style>
