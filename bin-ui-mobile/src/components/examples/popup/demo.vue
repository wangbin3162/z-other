<template>
  <transition name="slide">
    <div class="demo">
      <div class="title border-bottom-1px">
        <i class="icon-back" @click="back()"></i>popup
      </div>
      <div class="container">
        <div>
          <popup ref="myPopup" :content="'default popup'"></popup>
          <button @click="showPopup('myPopup')">default Popup</button>
        </div>
        <div>
          <popup ref="myPopup2" :mask="false" :content="'no mask popup'"></popup>
          <button @click="showPopup('myPopup2')">no mask Popup</button>
        </div>
        <div>
          <popup ref="myPopup3">
            <div class="customer-popup">customer Popup</div>
          </popup>
          <button @click="showPopup('myPopup3')">customer Popup</button>
        </div>
        <div>
          <popup ref="myPopup4" :autoHide="false">
            <div @click="hidePopup('myPopup4')" class="click-popup">
              click me to hide
            </div>
          </popup>
          <button @click="showPopup('myPopup4')">click to hide popup</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Popup from '../../../bin-ui/popup/popup.vue'

  export default {
    data () {
      return {
        mask: true
      }
    },
    methods: {
      showPopup (refId) {
        const component = this.$refs[refId]
        component.show()
      },
      hidePopup (refId) {
        const component = this.$refs[refId]
        component.hide()
      },
      back () {
        this.$router.back()
      }
    },
    components: {
      Popup
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
      text-align: center
      button
        width: 90%
        margin: 10px auto 0
        height: 50px
        line-height: 50px
        border: none
        background-color: $c-primary
        color: #fff
        font-size: 16px
        border-radius: 4px
      .customer-popup
        position: absolute
        top: 300px
        left: 0
        width: 100%
        height: 100px
        line-height: 100px
        padding: 15px 0
        text-align: center
        background: $c-warning
        color: #1712c8
      .click-popup
        position: absolute
        top: 400px
        left: 0
        width: 100%
        height: 50px
        line-height: 50px
        padding: 15px 0
        text-align: center
        background: $c-info
        color: #1712c8
</style>

