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
  import { defineComponent, computed, Ref, nextTick } from 'vue'
  import { useStore } from 'vuex'
  // import runAnimation from '@/utils/runAnimation'
  import bus from '@/utils/bus'
  const calculateComponentPositonAndSize = require('@/utils/calculateComponentPositonAndSize')
  const { mod360 } = require('@/utils/translate')
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
          cursor: cursors.value && cursors.value[point],
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
      const handleMouseDownOnShape = (e: any) => {
        store.dispatch('setComponentStatus')
        if (
          props.element &&
          props.element.component != 'v-text' &&
          props.element.component != 'rect-shape'
        ) {
          e.preventDefault()
        }
        e.stopPropagation()
        store.dispatch('setCurComponent', {
          component: props.element,
          index: props.index
        })
        if (props.element?.isLock) {
          return
        }
        cursors.value = getCursor()
        const pos = { ...props.defaultStyle }
        const startY = e.clientY
        const startX = e.clientX
        // 如果直接修改属性，值的类型会变为字符串，所以要转为数值型
        const startTop = Number(pos.top)
        const startLeft = Number(pos.left)
        // 如果元素没有移动，则不保存快照
        let hasMove = false
        const move = (moveEvent: any) => {
          hasMove = true
          const curX = moveEvent.clientX
          const curY = moveEvent.clientY
          pos.top = curY - startY + startTop
          pos.left = curX - startX + startLeft

          // 修改当前组件样式
          store.dispatch('setShapeStyle', pos)
          // 等更新完当前组件的样式并绘制到屏幕后再判断是否需要吸附
          // 如果不使用 $nextTick，吸附后将无法移动
          nextTick().then(() => {
            // 触发元素移动事件，用于显示标线、吸附功能
            // 后面两个参数代表鼠标移动方向
            // curY - startY > 0 true 表示向下移动 false 表示向上移动
            // curX - startX > 0 true 表示向右移动 false 表示向左移动
            bus.$emit('move', curY - startY > 0, curX - startX > 0)
          })
        }
        const up = () => {
          hasMove && store.commit('recordSnapshot')
          // 触发元素停止移动事件，用于隐藏标线
          bus.$emit('unmove')
          document.removeEventListener('mousemove', move)
          document.removeEventListener('mouseup', up)
        }

        document.addEventListener('mousemove', move)
        document.addEventListener('mouseup', up)
      }
      /**
       *
       */
      const handleMouseDownOnPoint = (point: string, e: any) => {
        store.dispatch('setIsComponentStatus', true)
        e.stopPropagation()
        e.preventDefault()
        const style = { ...props.defaultStyle }
        // 组件的宽高比
        let proportion = 1
        if (style.width && style.height) {
          proportion = style.width / style.height
        }
        // 组件的中心点
        let center: { x: number; y: number } = {
          x: 0,
          y: 0
        }
        if (style.left && style.top && style.width && style.height) {
          center = {
            x: style.left + style.width / 2,
            y: style.top + style.height / 2
          }
        }
        // 获取画布的位移信息
        const editorRectInfo = store.getters.editor.getBoundingClientRect()
        // 获取 point 与实际拖动基准点的差值 @justJokee
        const pointRect = e.target.getBoundingClientRect()
        // 当前点击圆点相对于画布的中心坐标
        const curPoint: { x: number; y: number } = {
          x: Math.round(
            pointRect.left - editorRectInfo.left + e.target.offsetWidth / 2
          ),
          y: Math.round(
            pointRect.top - editorRectInfo.top + e.target.offsetHeight / 2
          )
        }
        // 获取对称点的坐标
        const symmetricPoint = {
          x: center.x - (curPoint.x - center.x),
          y: center.y - (curPoint.y - center.y)
        }
        // 是否需要保存快照
        let needSave = false
        let isFirst = true
        const needLockProportion = isNeedLockProportion()
        const move = (moveEvent: any) => {
          // 第一次点击时也会触发 move，所以会有“刚点击组件但未移动，组件的大小却改变了”的情况发生
          // 因此第一次点击时不触发 move 事件
          if (isFirst) {
            isFirst = false
            return
          }

          needSave = true
          const curPositon = {
            x: moveEvent.clientX - editorRectInfo.left,
            y: moveEvent.clientY - editorRectInfo.top
          }

          calculateComponentPositonAndSize(
            point,
            style,
            curPositon,
            proportion,
            needLockProportion,
            {
              center,
              curPoint,
              symmetricPoint
            }
          )

          store.commit('setShapeStyle', style)
        }
        const up = () => {
          document.removeEventListener('mousemove', move)
          document.removeEventListener('mouseup', up)
          needSave && store.commit('recordSnapshot')
        }

        document.addEventListener('mousemove', move)
        document.addEventListener('mouseup', up)
      }
      const isNeedLockProportion = () => {
        if (props.element && props.element.component != 'Group') return false
        // const ratates = [0, 90, 180, 360]
        // if (props.element) {
        //   for (const component of props.element.propValue) {
        //     if (!ratates.includes(mod360(parseInt(component.style.rotate)))) {
        //       return true
        //     }
        //   }
        // }

        return false
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
        const rotate = store.getters.curComponent
          ? mod360(store.getters.curComponent.style.rotate)
          : 0 // 取余 360
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
      const cursors: Ref<any> = getCursor()
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
