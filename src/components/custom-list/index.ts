/**
 * 声明组件
 */
import { list } from './configuration'
import { CommonAttrs } from '../../modal/Component'
import Vue, { defineComponent } from 'vue'
console.log('list:', list)

list.forEach((key: CommonAttrs<any>) => {
  defineComponent(() => import(`./${key.component}/index.vue`))
})
