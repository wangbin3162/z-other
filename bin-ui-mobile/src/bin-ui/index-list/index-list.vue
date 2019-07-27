<template>
  <div class="index-list">
    <scroll ref="listView"
            :data="data"
            :options="options"
            :listenScroll="listenScroll"
            @scroll="scroll">
      <!--左侧列表区块-->
      <slot>
        <ul>
          <!--先循环分组 热门 a-z -->
          <li v-for="group in data" class="list-group">
            <h2 class="list-group-title">{{group.name}}</h2>
            <!--每个分组的列表-->
            <ul>
              <li v-for="item in group.items" @click="selectItem(item)"
                  class="list-group-item border-bottom-1px">
                <span class="name">{{item.name}}</span>
              </li>
            </ul>
          </li>
        </ul>
      </slot>
    </scroll>
    <!--右侧锚点区块-->
    <div class="list-shortcut"
         @touchstart="_onShortcutTouchStart"
         @touchmove.stop.prevent="_onShortcutTouchMove">
      <ul>
        <li v-for="(item,index) in shortcutList"
            class="item" :class="{'current':currentIndex===index}"
            :data-index="index">
          {{item}}
        </li>
      </ul>
    </div>
    <!--固定标题区块-->
    <div class="list-fixed" v-show="setTitle" ref="fiexd">
      <h1 class="fixed-title">{{setTitle}}</h1>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from '../scroll/scroll.vue'
  import { prefixStyle, getData } from '../../common/util/dom'

  const ANCHOR_HEIGHT = 18// 定义右侧锚点的高度
  const TITLE_HEIGHT = 30// 定义标题栏高度
  const transform = prefixStyle('transform')// 自定义浏览器前缀
  export default {
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    data () {
      return {
        scrollY: -1,
        currentIndex: 0,
        options: {
          probeType: 3
        }
      }
    },
    created () {
      // 不需要放置再data中，因为不需要监听其变化去绑定dom
      this.touch = {}
      this.listenScroll = true
      this.listHeight = []// 记录每个group的高度
      this.fixedTop = 0// 当前记录固定标题栏距离顶部的高度
    },
    mounted () {
      this.$nextTick(() => {
        this._calculateHeight()
      })
    },
    methods: {
      // 计算每个group的高度
      _calculateHeight () {
        this.groupList = this.$el.getElementsByClassName('list-group')
        this.listHeight = []
        if (!this.groupList) {
          return
        }
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < this.groupList.length; i++) {
          let item = this.groupList[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      // 触摸右侧标签开始
      _onShortcutTouchStart (e) {
        let anchorIndex = getData(e.target, 'index')
        let firstTouch = e.touches[0]// 获取第一个触摸点的位置
        this.touch.y1 = firstTouch.pageY// 记录触摸点的pageY
        this.touch.anchorIndex = anchorIndex// 记录点击的时候的索引
        this._scrollTo(anchorIndex)// 滚动到对应位置
      },
      _onShortcutTouchMove (e) {
        let firstTouch = e.touches[0]// 获取第一个触摸点的位置
        this.touch.y2 = firstTouch.pageY// 记录触摸点的pageY
        // 获取触摸点y轴的偏移量 并向下取整
        let delta = Math.floor((this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT)
        let anchorIndex = parseInt(this.touch.anchorIndex) + delta
        this._scrollTo(anchorIndex)
      },
      _scrollTo (index) {
        if (!index && index !== 0) {
          return
        }
        if (index < 0) {
          index = 0
        } else if (index > this.listHeight.length - 2) {
          index = this.listHeight.length - 2
        }
        this.scrollY = -this.listHeight[index]
        this.$refs.listView.scrollToElement(this.groupList[index], 0)
      },
      // 调整固定标题栏的位置
      _fixedTitle (diff) {
        let fiexdTop = 0

        if (diff > 0 && diff < TITLE_HEIGHT) { // 高度差在固定高度之间,则为往上挤
          fiexdTop = diff - TITLE_HEIGHT
        }
        if (this.fixedTop !== fiexdTop) {
          this.fixedTop = fiexdTop
          // 设置顶部标题栏偏移
          this.$refs.fiexd.style[transform] = `translate3d(0,${fiexdTop}px,0)`
        }
      },
      // 点击
      selectItem (item) {
        this.$emit('select', item)
      },
      refresh () {
        this.$refs.listView.refresh()
      },
      // 接收子组件相应的scroll事件
      scroll (pos) {
        this.scrollY = pos.y
      }
    },
    computed: {
      // 获取右侧标签集合数组
      shortcutList () {
        // 右侧标签集合即获取当前数据的title属性并截取第一个字符并生成数组
        return this.data.map((group) => {
          return group.name.substr(0, 1)
        })
      },
      // 根据滚动位置设置绝对定位的标题栏
      setTitle () {
        if (this.scrollY > 0) { // 如果是往下拽则清空标题栏
          return ''
        }
        return this.data[this.currentIndex] ? this.data[this.currentIndex].name : ''
      }
    },
    watch: {
      data () {
        setTimeout(() => {
          this._calculateHeight()
        }, 20)
      },
      // 监听滚动变化更新右侧标识
      scrollY (newY) {
        const listHeight = this.listHeight
        if (newY > 0) { // 表示往下拽
          this.currentIndex = 0
          return
        }
        // 中间部分滚动
        for (let i = 0; i < listHeight.length - 1; i++) {
          let h1 = listHeight[i]
          let h2 = listHeight[i + 1]
          // 判断区间
          if (-newY >= h1 && -newY < h2) {
            this.currentIndex = i
            let diff = h2 + newY
            this._fixedTitle(diff)
            return
          }
        }
        // 如果都不满足则是滚动到最下方
        this.currentIndex = this.listHeight.length - 2
      }
    },
    components: {
      Scroll
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/theme.styl"
  @import "../../common/stylus/mixin.styl"
  .index-list
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    .list-group
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-medium
        color: $color-text-black
        background: $color-gray-title
      .list-group-item
        display: flex
        align-items: center
        padding: 6px 0 6px 10px
        .name
          flex: 1
          padding-left: 15px
          line-height: 35px
          color: $color-text-black
          font-size: $font-size-medium-x
        &:last-child
          border-none()
    .list-shortcut
      position: absolute
      z-index: 30
      right: 3px
      top: 50%
      transform: translateY(-50%)
      width: 20px
      text-align: center
      font-family: Helvetica
      .item
        width: 18px
        height: 18px
        line-height: 18px
        color: $color-text-black
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      z-index: 500
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-medium
        color: $color-text-black
        background: $color-gray-title
</style>
