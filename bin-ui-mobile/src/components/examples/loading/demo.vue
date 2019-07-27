<template>
  <transition name="slide">
    <div class="demo">
      <div class="title border-bottom-1px">
        <i class="icon-back" @click="back()"></i>loading
      </div>
      <div class="container">
        <div class="loading-container">
          <div class="border-bottom-1px">
            <p>默认</p>
            <loading></loading>
          </div>
          <div class="border-bottom-1px">
            <p>自定义文字</p>
            <loading title="自定义加载文字" :w="15" :h="15"></loading>
          </div>
          <div class="border-bottom-1px">
            <p>自定义载入图片和宽高1</p>
            <loading :customer="true">
              <img width="25" height="25" src="./loading0.gif">
            </loading>
          </div>
          <div class="border-bottom-1px">
            <p>自定义载入图片和宽高2</p>
            <loading :customer="true">
              <img width="25" height="25" src="./loading5.gif">
            </loading>
          </div>
          <div class="border-bottom-1px">
            <p>自定义载入图片和宽高3</p>
            <loading :customer="true">
              <img width="220" height="19" src="./loading11.gif">
            </loading>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Loading from '../../../bin-ui/loading/loading.vue'

  export default {
    methods: {
      back () {
        this.$router.back()
      }
    },
    components: {
      Loading
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
      .loading-container
        text-align: center
        p
          padding: 5px
</style>

