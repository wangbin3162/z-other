<template>
  <transition name="dialog-fade">
    <div class="dialog" v-show="showFlag" @click.stop>
      <div class="dialog-wrapper">
        <div class="dialog-content">
          <slot>
            <i class="icon" :class="options.icon" v-if="options.icon"></i>
            <i class="icon-close" @click="close" v-if="options.showClose"></i>
            <h3 class="title">{{options.title}}</h3>
            <p class="content">{{options.content}}</p>
          </slot>
          <div class="operate border-top-1px">
            <div @click="cancel" v-if="options.cancelBtn && options.cancelBtn.active"
                 class="operate-btn border-right-1px">
              {{options.cancelBtn.text}}
            </div>
            <div @click="confirm" v-if="options.confirmBtn && options.confirmBtn.active" class="operate-btn confirm">
              {{options.confirmBtn.text}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      options: {
        type: Object,
        default: function () {
          return {
            type: 'alert',
            title: '我是标题',
            content: '我是内容',
            icon: 'icon-warn_fill',
            confirmBtn: {
              text: '确定',
              active: true
            },
            cancelBtn: {
              text: '取消',
              active: false
            },
            showClose: false
          }
        }
      }
    },
    data () {
      return {
        showFlag: false
      }
    },
    methods: {
      show () {
        this.showFlag = true
      },
      hide () {
        this.showFlag = false
      },
      cancel () {
        this.hide()
        if (this.options.type && this.options.type === 'confirm') {
          this.$emit('cancel')
        }
      },
      close () {
        this.hide()
        if (this.options.showClose && this.options.showClose) {
          this.$emit('close')
        }
      },
      confirm () {
        this.hide()
        if (this.options.type && this.options.type === 'confirm') {
          this.$emit('confirm')
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/theme.styl"
  .dialog
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 998
    background-color: $dialog-bgc
    &.dialog-fade-enter-active
      animation: dialog-fadein 0.3s
      .dialog-content
        animation: dialog-zoom 0.3s
    .dialog-wrapper
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      z-index: 999
      .dialog-content
        width: 320px
        border-radius: 4px
        background: $color-text-white
        padding-top: 20px
        .icon
          display: block
          width: 40px
          margin: 0 auto
          padding: 7px
          font-size: 40px
          color: $c-warning
          background-color: $color-gray-dd
          border-radius: 50%
        .icon-close
          position: absolute
          top: 6px
          right: 6px
          font-size 18px
          color: $c-secondary
        .title
          padding: 10px
          line-height: 22px
          text-align: center
          font-size: $font-size-large
          color: $color-text-black
        .content
          padding: 5px
          line-height: 15px
          text-align: center
          font-size: $font-size-medium-x
          color: $c-secondary
        .operate
          display: flex
          align-items: center
          text-align: center
          margin-top: 15px
          font-size: $font-size-medium-x
          .operate-btn
            flex: 1
            line-height: 22px
            padding: 10px 0
            color: $color-text-black
            &.confirm
              color: $color-theme-icon

  @keyframes dialog-fadein
    0%
      opacity: 0
    100%
      opacity: 1

  @keyframes dialog-zoom
    0%
      transform: scale(0)
    50%
      transform: scale(1.1)
    100%
      transform: scale(1)
</style>
