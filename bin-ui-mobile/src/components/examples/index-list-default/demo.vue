<template>
  <transition name="slide">
    <div class="demo">
      <div class="title border-bottom-1px">
        <i class="icon-back" @click="back()"></i>index-list-default
      </div>
      <div class="container">
        <div class="index-list-wrapper">
          <index-list
            :data="data"
            :title="title"
            @select="selectItem">
          </index-list>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import IndexList from '../../../bin-ui/index-list/index-list.vue'
  import cityData from '../data/index-list.json'

  export default {
    data () {
      return {
        title: 'Current City: BEIJING',
        cityData: cityData
      }
    },
    computed: {
      data () {
        let ret = []
        this.cityData.forEach((cityGroup) => {
          let group = {}
          group.name = cityGroup.name
          group.items = []
          cityGroup.cities.forEach((city) => {
            let item = {}
            item.name = city.name
            item.value = city.cityid
            group.items.push(item)
          })
          ret.push(group)
        })
        return ret
      }
    },
    methods: {
      back () {
        this.$router.back()
      },
      selectItem (item) {
        console.log(item.name)
      }
    },
    components: {
      IndexList
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
      .index-list-wrapper
        width: 95%
        height: 90%
        margin: 20px auto 0
        border: 1px solid #bbb
        overflow: hidden
</style>

