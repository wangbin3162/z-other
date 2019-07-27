<template>
  <transition name="show">
    <div class="bin-popup" v-show="isVisible">
      <div class="bin-popup-mask" v-show="mask" @click="maskClick">
        <slot name="mask"></slot>
      </div>
      <slot>
        <div class="bin-popup-content">
          {{content}}
        </div>
      </slot>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'bin-popup'
  const EVENT_MASK_CLICK = 'mask-click'

  const animTime = 400
  export default {
    name: COMPONENT_NAME,
    data () {
      return {
        isVisible: false
      }
    },
    props: {
      autoHide: {// 是否自动关闭
        type: Boolean,
        default: true
      },
      hideTime: {
        type: Number,
        default: 1000
      },
      mask: {
        type: Boolean,
        default: true
      },
      content: {
        type: String,
        default: 'default popup'
      }
    },
    methods: {
      show () {
        this.isVisible = true
        if (this.autoHide) {
          if (this.timer) {
            clearTimeout(this.timer)
          }
          this.timer = setTimeout(() => {
            this.hide()
          }, this.hideTime + animTime)
        }
      },
      hide () {
        this.isVisible = false
      },
      maskClick (e) {
        this.$emit(EVENT_MASK_CLICK, e)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/theme.styl"
  .bin-popup
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 100
    &.show-enter-active, &.show-leave-active
      transition: opacity .2s
    &.show-enter, &.show-leave-to
      opacity: 0

  .bin-popup-mask
    position: absolute
    width: 100%
    height: 100%

  .bin-popup-mask
    overflow: hidden
    background-color: $popup-mask-bgc
    opacity: $popup-mask-opacity

  .bin-popup-content
    position: absolute
    top: 50%
    left: 50%
    width: auto
    transform: translate(-50%, -50%)
    padding: 15px
    background: $c-info
    color: $color-text-white
</style>
