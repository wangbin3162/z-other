<template>
  <div class="v-header">
    <div class="logo">
      <div class="icon">
        <img src="../../assets/icon/chicken.png" height="30" width="30"/>
      </div>
    </div>
    <h1 class="title">ChickenMusic</h1>
    <router-link tag="div" class="mine" to="/user">
      <i class="icon-mine"></i>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"
  .v-header
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 44px
    text-align: center
    background: $color-theme
    color: $color-text-w
    .logo
      display: inline-block
      vertical-align: top
      background: $color-white
      border-radius: 6px
      box-shadow: inset 0 0 5px #2462a6
      margin: 7px 10px 0 0
      .icon
        width: 30px
        height: 30px
        font-size: 0
    .title
      display: inline-block
      line-height: 44px
      font-size: $font-size18
      vertical-align: top
    .mine
      position: absolute
      top: 0
      left: 0
      .icon-mine
        display: block
        padding: 10px
        font-size: 24px
        color: $color-text-w
</style>

