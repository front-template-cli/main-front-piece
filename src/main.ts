import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'ant-design-vue/dist/antd.css'
// import './components/custom-list'
// import bus from './utils/bus'

const app = createApp(App)

// require context 注册自定义组件
const requireContext = require.context(
  './components/custom-list',
  true,
  /index.vue$/
)
const customComponentList = requireContext.keys().filter((item: any) => true)

customComponentList.forEach((item: any) => {
  const componentConfig = requireContext(item)
  const name = item.split('/')[1]
  app.component(name, componentConfig.default || componentConfig)
})

// app.config.globalProperties.$bus = bus
app.use(store).use(router).mount('#app')
