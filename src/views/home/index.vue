<template>
  <div class="home">
    <main>
      <left></left>
      <editor></editor>
      <right></right>
    </main>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import Editor from '@/components/editor/index.vue'
  import Left from './components/left/index.vue'
  import Right from './components/right/index.vue'
  export default defineComponent({
    name: 'Home',
    components: {
      Editor,
      Left,
      Right
    }
  })
</script>
<style lang="less" scoped>
  @import './index.less';
</style>
