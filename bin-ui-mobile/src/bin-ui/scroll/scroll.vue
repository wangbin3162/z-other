<template>
  <div ref="wrapper" class="bin-scroll-wrapper">
    <div class="bin-scroll-content">
      <div ref="listWrapper" class="bin-scroll-list-wrapper">
        <slot>
          <ul class="bin-scroll-list">
            <li
              v-for="item in data"
              @click="clickItem(item)"
              class="bin-scroll-item border-bottom-1px">
              {{item}}
            </li>
          </ul>
        </slot>
      </div>
      <slot name="pullup">
        <div class="bin-pullup-wrapper" v-if="pullUpLoad">
          <div class="after-trigger" v-if="isPullUpLoad">
            <loading :hideLebel="true"></loading>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import Loading from '../loading/loading.vue'

  const EVENT_SCROLL = 'scroll'
  const EVENT_BEFORE_SCROLL_START = 'before-scroll-start'
  const EVENT_CLICK = 'click'
  // const EVENT_PULLING_DOWN = 'pulling-down'
  const EVENT_PULLING_UP = 'pulling-up'
  const DEFAULT_OPTIONS = {
    observeDOM: true,
    click: true,
    probeType: 1,
    scrollbar: false,
    pullDownRefresh: false,
    pullUpLoad: false
  }

  export default {
    props: {
      options: {
        type: Object,
        default () {
          return {}
        }
      },
      data: {
        type: Array,
        default: null
      },
      // 是否监听滚动事件
      listenScroll: {
        type: Boolean,
        default: false
      },
      // 是否上拉刷新
      pullUpLoad: {
        type: Boolean,
        default: false
      },
      // 解决移动端开始滚动后
      listenBeforeScroll: {
        type: Boolean,
        default: false
      },
      refreshDelay: {
        type: Number,
        default: 20
      }
    },
    data () {
      return {
        isPullUpLoad: false
      }
    },
    mounted () {
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    methods: {
      _initScroll () {
        if (!this.$refs.wrapper) {
          return
        }
        // 准备参数
        let options = Object.assign({}, DEFAULT_OPTIONS, this.options)
        // 初始化滚动
        this.scroll = new BScroll(this.$refs.wrapper, options)
        // 如果监听了滚动事件
        if (this.listenScroll) {
          let me = this// 保留vue对象this
          // 监听滚动事件
          this.scroll.on('scroll', (pos) => {
            me.$emit(EVENT_SCROLL, pos)
          })
        }
        // 如果监听滚动开始事件
        if (this.listenBeforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit(EVENT_BEFORE_SCROLL_START)
          })
        }
        // 如果可以上拉加载
        if (this.pullUpLoad) {
          this.scroll.on('scrollEnd', () => {
            if (this.scroll.y < this.scroll.maxScrollY + 50) {
              this.isPullUpLoad = true
              this.$emit(EVENT_PULLING_UP)
            }
          })
        }
      },
      forceUpdate () {
        if (this.pullUpLoad && this.isPullUpLoad) {
          this.isPullUpLoad = false
          this.refresh()
        }
        this.refresh()
      },
      enable () {
        this.scroll && this.scroll.enable()
      },
      disable () {
        this.scroll && this.scroll.disable()
      },
      refresh () {
        this.scroll && this.scroll.refresh()
      },
      clickItem (item) {
        this.$emit(EVENT_CLICK, item)
      },
      // 滚动到某个位置
      scrollTo () {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      // 滚动到某个element
      scrollToElement () {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    watch: {
      data () {
        setTimeout(() => {
          this.refresh()
        }, this.refreshDelay)
      }
    },
    components: {
      Loading
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/theme.styl"
  .bin-scroll-wrapper
    position: relative
    height: 100%
    overflow: hidden

  .bin-pulldown-wrapper
    position: absolute
    width: 100%
    left: 0
    display: flex
    justify-content: center
    align-items: center
    transition: all
    .after-trigger
      margin-top: 5px

  .bin-pullup-wrapper
    width: 100%
    display: flex
    justify-content: center
    align-items: center
    .before-trigger
      padding: 22px 0
      min-height: 1em
    .after-trigger
      padding: 19px 0

  .bin-scroll-content
    position: relative
    z-index: 1

  .bin-scroll-item
    height: 50px
    line-height: 50px
    font-size: $fontsize-large-x
    padding-left: 20px
</style>
