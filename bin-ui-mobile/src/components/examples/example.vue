<template>
  <div class="example">
    <div class="title border-bottom-1px">bin-ui
    </div>
    <div class="container">
      <ul>
        <li v-for="item in routers" class="item border-bottom-1px">
          <router-link :to="item.to" tag="div">
            <span class="label">{{item.label}}</span>
            <i class="icon-right"></i>
          </router-link>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        routers: [
          {to: '/scroll', label: 'scroll'},
          {to: '/slide', label: 'slide'},
          {to: '/fullPageSlide', label: 'full-page-slide'},
          {to: '/fullPages', label: 'full-pages'},
          {to: '/indexListDefault', label: 'index-list-default'},
          {to: '/indexListCustomer', label: 'index-list-customer'},
          {to: '/popup', label: 'popup'},
          {to: '/dialog', label: 'dialog'},
          {to: '/progress', label: 'progress'},
          {to: '/loading', label: 'loading'}
        ]
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/theme.styl"
  .example
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: 0
    background: $color-background
    .title
      width: 100%
      height: 50px
      line-height: 50px
      background: $color-gray-dd
      color: $color-theme
      text-align: center
      font-weight: 700
      font-size: $font-size-large-x
    .container
      position: fixed
      top: 50px
      width: 100%
      bottom: 0
      ul
        .item
          width: 100%
          font-size: $font-size-large
          div
            display: flex
            padding: 15px
            .label
              flex: 1
              display: inline-block
              vertical-align: top
              line-height: 20px
            .icon-right
              flex: 0 0 20px
              width: 20px
              display: inline-block
              vertical-align: top
              font-size: 20px
              font-weight: 700
              color: $color-gray-d

</style>

