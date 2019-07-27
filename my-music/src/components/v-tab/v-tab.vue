<template>
  <div class="tab-wrapper">
    <div class="tab">
      <router-link tag="div" class="tab-item" to="/recommend">
        <span class="tab-link">推荐</span>
      </router-link>
      <router-link tag="div" class="tab-item" to="/singer">
        <span class="tab-link">歌手</span>
      </router-link>
      <router-link tag="div" class="tab-item" to="/rank">
        <span class="tab-link">排行</span>
      </router-link>
      <router-link tag="div" class="tab-item" to="/search">
        <span class="tab-link">搜索</span>
      </router-link>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  .tab-wrapper
    position: fixed
    top: 44px
    left: 0
    width: 100%
    .tab
      display: flex
      height: 44px
      line-height: 44px
      font-size: $font-size14
      background: $color-white-d
      .tab-item
        flex: 1
        text-align: center
        .tab-link
          padding-bottom: 5px
          transition: all .3s
          border-bottom: 2px solid $color-d
        &.router-link-active
          .tab-link
            border-bottom: 2px solid $color-theme
            color: $color-theme
</style>

