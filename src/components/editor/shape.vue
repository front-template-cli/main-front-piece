<template>
  <div
    class="shape"
    :class="active"
    @click="selectCurComponent"
    @mousedown="handleMouseDownOnShape"
  >
    <span
      v-show="isActive"
      class="icon-xiangyouxuanzhuan iconfont"
      @mousedown="handleRotate"
    ></span>
    <span v-show="element?.isLock" class="icon-suo iconfont"></span>
    <div
      v-for="item in isActive ? pointList : []"
      :key="item"
      :style="getPointStyle(item)"
      class="shape-point"
      @mousedown="handleMouseDownOnPoint(item, $event)"
    ></div>
    <slot></slot>
  </div>
</template>
<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { useStore } from 'vuex'
  // import runAnimation from '@/utils/runAnimation'
  // import calculateComponentPositonAndSize from '@/utils/calculateComponentPositonAndSize'
  import { mod360 } from '@/utils/translate'
  import { CommonAttrs, CommonStyleAttts } from '@/modal/Component'
  interface AngleCursor {
    start: number
    end: number
    cursor: string
  }
  export default defineComponent({
    name: 'Shape',
    props: {
      active: {
        type: Boolean,
        default: false
      },
      defaultStyle: {
        require: true,
        type: Object as () => CommonStyleAttts
      },
      element: {
        require: true,
        type: Object as () => CommonAttrs<any>
      },
      index: {
        require: true,
        type: [Number, String]
      }
    },
    setup(props) {
      const store = useStore()
      const getPointStyle = (point: string) => {
        const width = props.defaultStyle?.width || 0
        const height = props.defaultStyle?.height || 0
        const hasT = /t/.test(point)
        const hasB = /b/.test(point)
        const hasL = /l/.test(point)
        const hasR = /r/.test(point)
        let newLeft = 0
        let newTop = 0

        // 四个角的点
        if (point.length === 2) {
          newLeft = hasL ? 0 : width
          newTop = hasT ? 0 : height
        } else {
          // 上下两点的点，宽度居中
          if (hasT || hasB) {
            newLeft = width / 2
            newTop = hasT ? 0 : height
          }

          // 左右两边的点，高度居中
          if (hasL || hasR) {
            newLeft = hasL ? 0 : width
            newTop = Math.floor(height / 2)
          }
        }

        const style = {
          cursor: cursors[point],
          left: `${newLeft}px`,
          marginLeft: hasR ? '-4px' : '-4px',
          marginTop: '-4px',
          top: `${newTop}px`
        }

        return style
      }
      /**
       * 选中当前组件
       */
      const selectCurComponent = (e: Event) => {
        // 阻止向父组件冒泡
        e.stopPropagation()
        e.preventDefault()
        // this.$store.commit('hideContextMenu')
      }
      /**
       * 鼠标点击
       */
      const handleMouseDownOnShape = (e: Event) => {
        console.log(e)
      }
      /**
       *
       */
      const handleMouseDownOnPoint = (point: string, e: MouseEvent) => {
        console.log(e)
        console.log(point)
      }
      const isActive = computed(() => {
        return props.active || !props.element?.isLock
      })
      const pointList: string[] = ['b', 'lb', 'l', 'lt', 't', 'rt', 'r', 'rb'] // 八个方向
      const initialAngle: { [key: string]: number } = {
        b: 225,
        l: 315,
        lb: 270,
        lt: 0,
        r: 135,
        rb: 180,
        rt: 90,
        t: 45
      } // 每个点对应的初始角度
      const angleToCursor: AngleCursor[] = [
        { cursor: 'nw', end: 23, start: 338 },
        { cursor: 'n', end: 68, start: 23 },
        { cursor: 'ne', end: 113, start: 68 },
        { cursor: 'e', end: 158, start: 113 },
        { cursor: 'se', end: 203, start: 158 },
        { cursor: 's', end: 248, start: 203 },
        { cursor: 'sw', end: 293, start: 248 },
        { cursor: 'w', end: 338, start: 293 }
      ] // 每个范围的角度对应的光标
      /**
       * 旋转
       */
      const handleRotate = (e: Event) => {
        console.log(e)
      }
      /**
       * 光点的样式
       */
      const getCursor = () => {
        const rotate = mod360(store.getters.curComponent.style.rotate) // 取余 360
        const result: any = {}
        let lastMatchIndex = -1 // 从上一个命中的角度的索引开始匹配下一个，降低时间复杂度

        pointList.forEach((point: string) => {
          const angle = mod360(initialAngle[point] + rotate)
          const len = angleToCursor.length
          while (typeof null === 'object') {
            lastMatchIndex = (lastMatchIndex + 1) % len
            const angleLimit = angleToCursor[lastMatchIndex]
            if (angle < 23 || angle >= 338) {
              result[point] = 'nw-resize'
              return
            }

            if (angleLimit.start <= angle && angle < angleLimit.end) {
              result[point] = angleLimit.cursor + '-resize'

              return
            }
          }
        })

        return result
      }
      const cursors = getCursor()
      return {
        getPointStyle,
        handleMouseDownOnPoint,
        handleMouseDownOnShape,
        handleRotate,
        isActive,
        pointList,
        selectCurComponent
      }
    }
  })
</script>
<style lang="less" scoped>
  .shape {
    width: auto;
    height: auto;
  }
</style>
