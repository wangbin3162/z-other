<template>
  <transition name="slide">
    <div class="demo">
      <div class="title border-bottom-1px">
        <i class="icon-back" @click="back()"></i>slide
      </div>
      <div class="container">
        <!--需要确保插槽有值再进行渲染-->
        <div class="slider-wrapper" v-if="recommends.length">
          <div class="slider-content">
            <slider>
              <div v-for="item in recommends">
                <a :href="item.linkUrl">
                  <img :src="item.picUrl"/>
                </a>
              </div>
            </slider>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Slider from '../../../bin-ui/slide/slide.vue'
  import { getRecommend } from '../../../api/recommend'
  import { ERR_OK } from '../../../api/config'

  export default {
    data () {
      return {
        recommends: []
      }
    },
    created () {
      this._getRecommend()// 获取推荐slider
    },
    methods: {
      _getRecommend () {
        getRecommend().then(res => {
          if (res.code === ERR_OK) {
            this.recommends = res.data.slider
          }
        })
      },
      back () {
        this.$router.back()
      }
    },
    components: {
      Slider
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
      .slider-wrapper
        position: relative
        width: 100%
        padding-top: 40%
        overflow: hidden
        .slider-content
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
</style>

