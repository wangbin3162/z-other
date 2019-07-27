<template>
  <transition name="slide">
    <div class="demo">
      <div class="title border-bottom-1px">
        <i class="icon-back" @click="back()"></i>full-pages-demo
      </div>
      <div class="pages">
        <full-pages :pagesColor="pagesColor" ref="fullPage"
                    :isPullDown="true">
          <div class="full-page-wrapper"><img src="../data/1.jpg"/></div>
          <div class="full-page-wrapper"><img src="../data/2.jpg"/></div>
          <div class="full-page-wrapper"><img src="../data/3.jpg"/></div>
          <div class="full-page-wrapper">
            <img src="../data/4.jpg"/>
            <div class="button-wrapper">
              <span class="button" @click="back()">back</span>
            </div>
          </div>
        </full-pages>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import FullPages from '../../../bin-ui/full-pages/full-pages.vue'

  export default {
    data () {
      return {
        pagesColor: [
          '#7805d0',
          '#d06b7e',
          '#7aad20',
          '#e46339'],
        isPullDown: false // true开启单项滑动,只能往上滑动并提示后期根据需求再扩展
      }
    },
    methods: {
      back () {
        this.$router.back()
      }
    },
    components: {
      FullPages
    }

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/theme.styl"
  @import "../../../common/stylus/mixin.styl"
  .demo
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
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
    .pages
      .full-page-wrapper
        position: relative
        height: 100%
        img
          width: 100%
          height: 100%
      .button-wrapper
        position: fixed
        bottom: 85px
        display: block
        width: 100%
        overflow: hidden
        .button
          display: inline-block
          width: 130px
          padding: 15px 0
          border: 4px solid rgba(255, 255, 255, 0.7)
          border-radius: 4px
          color: rgba(255, 255, 255, 0.7)
          font-size: $font-size-large-x
</style>

