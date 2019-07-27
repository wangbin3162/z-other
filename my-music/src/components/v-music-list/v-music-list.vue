<template>
  <div class="music-list">
    <div class="top">
      <div class="back" @click="back()">
        <i class="icon-back"></i>
      </div>
      <h1 class="title" v-html="title"></h1>
    </div>
    <scroll :data="songs"
            :probe-type="probeType"
            :listen-scroll="listenScroll"
            @scroll="scroll"
            class="list" ref="list">
      <div>
        <div class="bg-image" :style="bgStyle" ref="bgImage"></div>
        <div @click="random" class="play-wrapper" v-show="songs.length>0" ref="playBtn">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
        <song-list @select="selectItem" :songs="songs"></song-list>
      </div>
    </scroll>
    <div v-show="showFiexd" class="fiexd" ref="fiexd">
      <div class="bg-image" :style="bgStyle"></div>
      <div @click="random" class="play-wrapper" v-show="songs.length>0">
        <i class="icon-play"></i>
        <span class="text">随机播放全部</span>
      </div>
    </div>
    <div class="loading-container" v-show="!songs.length">
      <loading></loading>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import SongList from '../v-song-list/v-song-list.vue';
  import Scroll from '../base/scroll/scroll.vue';
  import Loading from '../base/loading/loading.vue';
  import { prefixStyle } from '../../common/util/dom';
  import { mapActions } from 'vuex';

  const RESERVED_HEIGHT = 44;// 上方标题栏高度
  const transform = prefixStyle('transform');

  export default {
    props: {
      bgImage: {
        type: String,
        default: ''
      },
      songs: {
        type: Array,
        default: []
      },
      title: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        scrollY: 0,
        showFiexd: false
      };
    },
    created () {
      this.probeType = 3;// 监听快速滚动
      this.listenScroll = true;
    },
    mounted () {
      // 初始化时获取顶部背景高度，设置最小移动距离
      this.imageHeight = this.$refs.bgImage.clientHeight;
      this.minTranslateY = -this.imageHeight + RESERVED_HEIGHT;
      this.$refs.fiexd.style[transform] = `translate3d(0,${this.minTranslateY}px,0)`;
    },
    methods: {
      scroll (pos) {
        this.scrollY = pos.y;
      },
      back () {
        this.$router.back();
      },
      // 随机播放所有
      random () {
        this.randomPlay(this.songs);
      },
      selectItem (song, index) {
        this.selectPlay({
          list: this.songs,
          index: index
        });
      },
      ...mapActions([
        'selectPlay',
        'randomPlay'
      ])
    },
    computed: {
      bgStyle () {
        return `background-image:url(${this.bgImage})`;
      }
    },
    watch: {
      //  监听滚动的Y来确定顶部背景层的效果
      scrollY (newY) {
        if (newY <= this.minTranslateY) {
          this.showFiexd = true;
        } else {
          this.showFiexd = false;
        }
      }
    },
    components: {
      SongList,
      Scroll,
      Loading
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"
  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .top
      position absolute
      top: 0
      left: 0
      width: 100%
      height: 44px
      background: $color-background-d
      z-index: 100
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: 24px
        color: $color-white-d
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 44px
      font-size: $font-size16
      color: $color-white
    .list
      height: 100%
      overflow: hidden
      .bg-image
        position: relative
        width: 100%
        height: 0
        padding-top: 70%
        transform-origin: top
        background-size: cover
      .play-wrapper
        width: 100
        height: 40px
        line-height: 40px
        background: $color-white
        border-1px($color-gray-ll)
        padding-left: 10px
        font-size: $font-size16
        .icon-play
          display: inline-block
        .text-align
          display: inline-block
    .fiexd
      position: absolute
      width: 100%
      top: 0
      left: 0
      .bg-image
        position: relative
        width: 100%
        height: 0
        padding-top: 70%
        transform-origin: top
        background-size: cover
      .play-wrapper
        width: 100
        height: 40px
        line-height: 40px
        background: $color-white
        border-1px($color-gray-ll)
        padding-left: 10px
        font-size: $font-size16
        .icon-play
          display: inline-block
        .text-align
          display: inline-block
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>

