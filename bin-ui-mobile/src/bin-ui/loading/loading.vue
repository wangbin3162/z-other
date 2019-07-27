<template>
  <div class="loading">
    <img v-if="!customer" :width="w" :height="h" src="./loading.gif">
    <slot></slot>
    <p v-if="!hideLebel" class="desc">{{title}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      hideLebel: { // 是否为用户自定义
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: '正在载入...'
      },
      w: {
        type: Number,
        default: 30
      },
      h: {
        type: Number,
        default: 30
      },
      customer: { // 是否为用户自定义
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/theme.styl"
  .loading
    width: 100%
    text-align: center
    .desc
      line-height: 20px
      padding: 5px
      font-size: $font-size14
      color: $color-theme
</style>

