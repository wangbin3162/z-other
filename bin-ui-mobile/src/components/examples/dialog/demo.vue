<template>
  <transition name="slide">
    <div class="demo">
      <div class="title border-bottom-1px">
        <i class="icon-back" @click="back()"></i>dialog
      </div>
      <div class="container">
        <popup ref="popup" :content="popupText"></popup>
        <div>
          <bin-dialog ref="dialog1"></bin-dialog>
          <button @click="showDialog('dialog1')">dialogb - type</button>
        </div>
        <div>
          <bin-dialog @confirm="confirm" @cancel="cancel" :options="options" ref="dialog2"></bin-dialog>
          <button @click="showDialog('dialog2')">dialog - btn</button>
        </div>
        <div>
          <bin-dialog @close="close" :options="options3" ref="dialog3"></bin-dialog>
          <button @click="showDialog('dialog3')">dialog - with - close</button>
        </div>
        <div class="customer">
          <bin-dialog :options="options4" ref="dialog4">
            <img class="pic" src="../data/pic.jpg"/>
            <h3 class="text">slot插入的标题</h3>
            <p class="text2">副标题</p>
          </bin-dialog>
          <button @click="showDialog('dialog4')">dialog - slot</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import BinDialog from '../../../bin-ui/dialog/dialog.vue'
  import Popup from '../../../bin-ui/popup/popup.vue'

  export default {
    data () {
      return {
        popupText: '',
        options: {
          type: 'confirm',
          title: '我是标题',
          content: '我是内容',
          icon: 'icon-warn_fill',
          confirmBtn: {
            text: '确定',
            active: true
          },
          cancelBtn: {
            text: '取消',
            active: true
          }
        },
        options3: {
          type: 'alert',
          title: '我是标题',
          icon: 'icon-warn_fill',
          confirmBtn: {
            text: '确定',
            active: true
          },
          showClose: true
        },
        options4: {
          type: 'alert',
          confirmBtn: {
            text: '我知道了',
            active: true
          }
        }
      }
    },
    methods: {
      back () {
        this.$router.back()
      },
      showDialog (refId) {
        const component = this.$refs[refId]
        component.show()
      },
      confirm () {
        this.popupText = '点击 [确定] 按钮'
        this.$refs['popup'].show()
      },
      cancel () {
        this.popupText = '点击 [取消] 按钮'
        this.$refs['popup'].show()
      },
      close () {
        this.popupText = '点击 [关闭] 按钮'
        this.$refs['popup'].show()
      }
    },
    components: {
      BinDialog,
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
        background-color: $c-warning
        color: $c-dark
        font-size: 16px
        border-radius: 4px
      .customer
        text-align: center
        .pic
          width: 80%
        .text
          padding: 10px 0
          line-height: 22px
          text-align: center
          font-size: $font-size-medium-x
          color:$c-info
        .text2
          line-height: 20px
          text-align: center
          font-size: $font-size-medium
          color:$c-danger
</style>

