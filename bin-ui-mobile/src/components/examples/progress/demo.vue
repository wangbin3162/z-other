<template>
  <transition name="slide">
    <div class="demo">
      <div class="title border-bottom-1px">
        <i class="icon-back" @click="back()"></i>progress
      </div>
      <div class="container">
        <h3 class="percent">{{percentLabel}}%</h3>
        <div class="progress-wrapper">
          <progress-bar @percentChange="onProgressBarChange" :allTime="true"></progress-bar>
        </div>
        <div class="progress-circle-wrapper">
          <h3 class="percent2">{{percentLabel}}%</h3>
          <progress-circle :radius="50" :percent="barPercent"></progress-circle>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import ProgressBar from '../../../bin-ui/progress/progress-bar.vue'
  import ProgressCircle from '../../../bin-ui/progress/progress-circle.vue'

  export default {
    data () {
      return {
        barPercent: 0
      }
    },
    methods: {
      back () {
        this.$router.back()
      },
      onProgressBarChange (per) {
        this.barPercent = per
      }
    },
    components: {
      ProgressBar,
      ProgressCircle
    },
    computed: {
      percentLabel () {
        return this.barPercent * 100 | 0
      }
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
      .percent
        text-align: center
        padding: 20px
      .progress-wrapper
        width: 90%
        margin: 0px auto
        padding: 10px 0
      .progress-circle-wrapper
        position: relative
        width: 50px
        height: 50px
        margin: 15px auto
        .percent2
          position: absolute
          display: inline-block
          top: 20px
          left: 0
          width: 100%
          text-align: center
</style>

