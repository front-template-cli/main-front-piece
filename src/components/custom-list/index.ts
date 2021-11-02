/**
 * 声明组件
 */
import { list } from './configuration'
import { CommonAttrs } from '../../modal/Component'
import { defineCustomElement } from '@vue/runtime-dom'
list.forEach((key: CommonAttrs<any>) => {
  customElements.define(
    key.component,
    defineCustomElement(() => import(`./${key.component}/index.vue`))
  )
})
