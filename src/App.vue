<template>
  <a-spin :spinning="loading" tip="加载中...">
    <router-view />
  </a-spin>
</template>
<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { Spin } from 'ant-design-vue'
  import { useStore } from 'vuex'
  export default defineComponent({
    name: 'App',
    components: { aSpin: Spin },
    setup() {
      const store = useStore()
      const loading = computed(() => store.getters.loading)
      return {
        loading
      }
    }
  })
</script>
