<template>
  <transition name="slide">
    <div class="demo">
      <div class="title border-bottom-1px">
        <i class="icon-back" @click="back()"></i>scroll
      </div>
      <div class="container">
        <p class="flag">1.基本滚动</p>
        <div class="scroll-wrapper">
          <bin-scroll :data="items" :options="options"></bin-scroll>
        </div>
        <p class="flag">2.自定义item</p>
        <div class="scroll-wrapper">
          <bin-scroll :data="items">
            <ul>
              <li v-for="item in foods" class="item  border-bottom-1px">
                <img class="icon" :src="item.image"/>
                <span class="name">{{item.name}}</span>
              </li>
            </ul>
          </bin-scroll>
        </div>
        <p class="flag">3.上拉加载</p>
        <div class="scroll-wrapper">
          <bin-scroll ref="scroll" :data="items" :options="options"
                      :pullUpLoad="true" @pulling-up="onPullingUp"></bin-scroll>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import BinScroll from '../../../bin-ui/scroll/scroll.vue'
  import goodsData from '../data/goods-list.json'

  export default {
    data () {
      return {
        items: [1, 2, 3, 4, 5, 6],
        options: {
          scrollbar: {
            fade: true
          }
        },
        foods: []
      }
    },
    created () {
      this._initCustomerList()
    },
    methods: {
      _initCustomerList () {
        let _foods = []
        goodsData.goods.forEach((item) => {
          _foods = _foods.concat(item.foods)
        })
        this.foods = _foods
      },
      back () {
        this.$router.back()
      },
      onPullingUp () {
        if (this.pulluptimer) {
          clearTimeout(this.pulluptimer)
        }
        this.pulluptimer = setTimeout(() => {
          if (Math.random() > 0.5) {
            // 如果有新数据
            let newPage = [
              'I am line new 1',
              'I am line new 2'
            ]
            this.items = this.items.concat(newPage)
          } else {
            this.$refs.scroll.forceUpdate()
          }
        }, 1000)
      }
    },
    components: {
      BinScroll
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/theme.styl"
  @import "../../../common/stylus/mixin.styl"
  .demo
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 100
    background: $color-background
    &.slide-enter-active, &.slide-leave-active
      transition: all .4s
    &.slide-enter, &.slide-leave-to
      transform: translateX(100%)
    .title
      position: relative
      width: 100%
      height: 50px
      line-height: 50px
      background: $color-gray-dd
      color: $color-theme
      text-align: center
      font-weight: 700
      font-size: $font-size-large-x
      .icon-back
        position: absolute
        top: 15px
        left: 10px
        font-size: 20px
        color: $color-theme-icon
    .container
      position: fixed
      top: 50px
      width: 100%
      bottom: 0
      overflow: scroll
      .flag
        padding: 15px
        text-align: center
      .scroll-wrapper
        margin: 0 auto
        height: 200px
        width: 90%
        border: 1px solid #bbb
        border-radius: 5px
        overflow: hidden
        .item
          display: flex
          height: 50px
          line-height: 50px
          padding: 0 15px
          .icon
            flex: 0 0 40px
            width: 40px
            height: 40px
            margin-top: 5px
          .name
            flex: 1
            padding-left: 20px
</style>

