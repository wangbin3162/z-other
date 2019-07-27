<template>
  <div class="song-list">
    <ul>
      <li class="item" v-for="(song, index) in songs" @click="selectItem(song,index)">
        <h1 class="rank">{{index + 1}}</h1>
        <div class="content">
          <h2 class="name">{{song.name}}</h2>
          <p class="desc">{{getDesc(song)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      songs: {
        type: Array,
        default: []
      }
    },
    methods: {
      getDesc(song) {
        return `${song.singer}-${song.album}`;
      },
      selectItem(song, index) {
        this.$emit('select', song, index);
      }
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .song-list
    .item
      display: flex
      align-items: center
      box-sizing: border-box
      height: 60px
      width: 100%
      font-size: $font-size16
      .rank
        flex: 0 0 40px
        width: 40px
        margin: 0 5px
        text-align: center
        color: $color-gray-l
      .content
        flex: 1
        height: 60px
        line-height: 20px
        overflow: hidden
        border-1px($color-gray-ll)
        .name
          no-wrap()
          margin-top: 8px
          color: $color-text
          font-size: $font-size14
        .desc
          no-wrap()
          margin-top: 3px
          font-size: $font-size12
          color: $color-gray
</style>

