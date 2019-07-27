<template>
  <transition name="slide">
    <div class="demo">
      <div class="title border-bottom-1px">
        <i class="icon-back" @click="back()"></i>index-list-customer
      </div>
      <div class="container">
        <div class="index-list-wrapper">
          <index-list
            :data="singers"
            :title="title"
            @select="selectItem">
            <ul>
              <!--先循环分组 热门 a-z -->
              <li v-for="group in singers" class="list-group" ref="listGroup">
                <h2 class="list-group-title">{{group.name}}</h2>
                <!--每个分组的歌手列表-->
                <ul>
                  <li v-for="item in group.items" @click="selectItem(item)"
                      class="list-group-item border-bottom-1px">
                    <img class="avatar" :src="item.avatar"/>
                    <span class="name">{{item.name}}</span>
                  </li>
                </ul>
              </li>
            </ul>
          </index-list>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import IndexList from '../../../bin-ui/index-list/index-list.vue'
  import singerData from '../data/singer.json'

  export default {
    data () {
      return {
        title: 'Current City: BEIJING',
        singers: singerData
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
        .list-group
          .list-group-title
            height: 30px
            line-height: 30px
            padding-left: 20px
            font-size: $font-size-medium
            color: $color-text-black
            background: $color-gray-title
          .list-group-item
            display: flex
            align-items: center
            padding: 6px 0 6px 10px
            .avatar
              width: 60px
              height: 60px
            .name
              flex: 1
              padding-left: 15px
              line-height: 60px
              color: $color-text-black
              font-size: $font-size-medium-x
            &:last-child
              border-none()
</style>

