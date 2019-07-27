<template>
  <div class="player" v-show="playlist.length>0">
    <!--cd全屏播放器-->
    <transition name="slide">
      <div class="normal-player" v-show="fullScreen">
        <!--背景-->
        <div class="background">
          <img width="100%" height="100%" :src="currentSong.image">
          <div class="mask"></div>
        </div>
        <!--标题-->
        <div class="top">
          <div class="back" @click.stop="back">
            <i class="icon-back"></i>
          </div>
          <div class="title">
            <h1 class="song-name" v-html="currentSong.name"></h1>
            <h2 class="song-singer" v-html="currentSong.singer"></h2>
          </div>
        </div>
        <!--中间cd-->
        <div class="middle" @click.stop
             @touchstart.prevent="middleTouchStart"
             @touchmove.prevent="middleTouchMove"
             @touchend.prevent="middleTouchEnd">
          <div class="middle-l" ref="CD">
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd" :class="cdClass">
                <img class="image" :src="currentSong.image">
              </div>
            </div>
            <!--cd下面的歌词-->
            <div class="playing-lyric-wrapper">
              <div class="playing-lyric">{{playingLyric}}</div>
            </div>
          </div>
          <!--中间右侧歌词组件-->
          <scroll class="middle-r" ref="lyricList"
                  :data="currentLyric&&currentLyric.lines">
            <div class="lyric-wrapper">
              <div v-if="currentLyric">
                <p ref="lyricLine" class="text"
                   :class="{'current':currentLineNum===index}"
                   v-for="(line,index) in currentLyric.lines">{{line.txt}}</p>
              </div>
            </div>
          </scroll>
        </div>
        <!--下方控制-->
        <div class="bottom">
          <!--dot表示左右滑动歌词显示-->
          <div class="dot-wrapper">
            <span class="dot" :class="{'active':currentShow==='cd'}"></span>
            <span class="dot" :class="{'active':currentShow==='lyric'}"></span>
          </div>
          <!--进度条-->
          <div class="progress-wrapper">
            <span class="time time-l">{{format(currentTime)}}</span>
            <div class="progress-bar-wrapper">
              <progress-bar
                @percentChange="onProgressBarChange"
                :percent="playPercent"></progress-bar>
            </div>
            <span class="time time-r">{{format(currentSong.duration)}}</span>
          </div>
          <!--控制播放 列表,上一曲,播放,下一曲,收藏-->
          <div class="operators">
            <div class="left">
              <i :class="iconMode" @click="changeMode"></i>
            </div>
            <div class="center" :class="disableCls">
              <i class="icon-prev" @click="prev"></i>
              <i class="play" :class="playIcon" @click="togglePlaying"></i>
              <i class="icon-next" @click="next"></i>
            </div>
            <div class="right">
              <i @click.stop.prevent="showPlaylist" class="icon-playlist"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!--mini播放器-->
    <transition name="mini">
      <div class="mini-player" @click.stop="open" v-show="!fullScreen">
        <div class="icon" v-show="!playing">
          <img src="../../../static/loading/audio-static.svg" width="25" height="35"/>
        </div>
        <div class="icon" v-show="playing">
          <img src="../../../static/loading/audio.svg" width="25" height="35"/>
        </div>
      </div>
    </transition>
    <play-list ref="playlist"></play-list>
    <audio ref="audio"
           @play="ready"
           @error="error"
           @timeupdate="updateTime"
           @ended="audioEnd"
           @pause="paused">
    </audio>
  </div>
</template>

<script type="text/ecmascript-6">
  import progressBar from '../base/progress-bar/progress-bar.vue';
  import Scroll from '../base/scroll/scroll.vue';
  import PlayList from '../../components/v-play-list/v-play-list.vue';
  import { mapGetters, mapMutations, mapActions } from 'vuex';
  import { playMode } from '../../common/js/playMode';
  import * as mTypes from '../../store/mutations-types';
  import Lyric from 'lyric-parser';

  import { prefixStyle } from '../../common/util/dom';
  import { playerMixin } from '../../common/js/mixin';

  const transform = prefixStyle('transform');
  const transition = prefixStyle('transition');
  export default {
    mixins: [playerMixin],
    data () {
      return {
        songReady: false,
        currentTime: 0,
        currentLyric: null,
        currentLineNum: 0, // 当前歌词所在行
        currentShow: 'cd',
        playingLyric: ''
      };
    },
    created () {
      this.touch = {};
    },
    methods: {
      // congtrol控制播放事件
      togglePlaying () {
        if (!this.songReady) {
          return;
        }
        this.setPlayingState(!this.playing);
      },
      prev () {
        if (!this.songReady) {
          return;
        }
        if (this.playlist.length === 1) {
          this.loop();
        } else {
          let index = this.currentIndex - 1;
          if (index === -1) {
            index = this.playlist.length - 1;
          }
          this.setCurrentIndex(index);
          if (!this.playing) {
            this.togglePlaying();
          }
        }
      },
      next () {
        if (!this.songReady) {
          return;
        }
        if (this.playlist.length === 1) {
          this.loop();
        } else {
          let index = this.currentIndex + 1;
          if (index === this.playlist.length) {
            index = 0;
          }
          this.setCurrentIndex(index);
          if (!this.playing) {
            this.togglePlaying();
          }
        }
      },
      showPlaylist () {
        this.$refs.playlist.show();
      },
      // audio的事件
      ready () {
        // 延时避免快速切换歌曲导致 DOM 会报错
        setTimeout(() => {
          this.songReady = true;
          this.savePlayHistory(this.currentSong);
        }, 500);
      },
      paused () {
//        this.setPlayingState(false);
        if (this.currentLyric) {
          this.currentLyric.stop();
        }
      },
      error () {
        this.songReady = true;
      },
      audioEnd () {
        if (this.mode === playMode.loop) {
          this.loop();
        } else {
          this.next();
        }
      },
      // 单曲循环
      loop () {
        this.$refs.audio.currentTime = 0;
        this.$refs.audio.play();
        if (this.currentLyric) {
          this.currentLyric.seek(0);// 重置开始歌词位置
        }
      },
      // 进度条相关方法
      updateTime (e) {
        this.currentTime = e.target.currentTime;
      },
      format (interval) {
        interval = Math.floor(interval);
        const minute = Math.floor(interval / 60);
        const second = this._pad(interval % 60);
        return `${minute}:${second}`;
      },
      _pad (num, n = 2) {
        let len = num.toString().length;
        while (len < n) {
          num = '0' + num;
          len++;
        }
        return num;
      },
      onProgressBarChange (per) {
        const currentTime = per * this.currentSong.duration;
        this.$refs.audio.currentTime = currentTime;
        if (!this.playing) {
          this.togglePlaying();
        }
        if (this.currentLyric) {
          this.currentLyric.seek(currentTime * 1000);// 重置开始歌词位置
        }
      },
      // 播放器关闭打开事件
      back () {
        this.setFullScreen(false);
      },
      open () {
        this.setFullScreen(true);
      },
      // 获取歌词
      getLyric () {
        this.currentSong.getLyric().then((lyric) => {
          if (this.currentSong.lyric !== lyric) {
            return;
          }
          this.currentLyric = new Lyric(lyric, this.handleLyric);
          if (this.playing) {
            this.currentLyric.play();
          }
          // console.log(this.currentLyric);
        }).catch(() => {
          this.currentLyric = null;
          this.playingLyric = '';
          this.currentLineNum = 0;
        });
      },
      // 歌词执行函数
      handleLyric ({lineNum, txt}) {
        this.currentLineNum = lineNum;
        if (lineNum > 5) {
          let lineEl = this.$refs.lyricLine[lineNum - 5];
          this.$refs.lyricList.scrollToElement(lineEl, 1000);
        } else {
          this.$refs.lyricList.scrollTo(0, 0, 1000);
        }
        this.playingLyric = txt;
      },
      // middle滑动事件
      middleTouchStart (e) {
        this.touch.initaiated = true;
        const touch = e.touches[0];// 第一个手指
        this.touch.startX = touch.pageX;
        this.touch.startY = touch.pageY;
        this.touch.deltaX = 0;
        this.touch.deltaY = 0;
      },
      middleTouchMove (e) {
        if (!this.touch.initaiated) {
          return;
        }
        const touch = e.touches[0];// 第一个手指
        const deltaX = touch.pageX - this.touch.startX;
        const deltaY = touch.pageY - this.touch.startY;
        this.touch.deltaX = deltaX;
        this.touch.deltaY = deltaY;
        // 如果竖向滚动比横向滚动小则表示上下滚动
        if (Math.abs(deltaY) > Math.abs(deltaX)) {
          return;
        }
        const left = this.currentShow === 'cd' ? 0 : -window.innerWidth;
        const offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + deltaX));
        this.touch.percent = Math.abs(offsetWidth / window.innerWidth);
        // 设置cd页动画
        this.$refs.CD.style.opacity = 1 - this.touch.percent;
        this.$refs.CD.style[transition] = '';
        // 设置右侧偏移
        this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`;
        this.$refs.lyricList.$el.style[transition] = '';
      },
      middleTouchEnd (e) {
        const deltaX = Math.abs(this.touch.deltaX);
        const deltaY = Math.abs(this.touch.deltaY);
        if (deltaX === 0 && deltaY === 0) {
          return;
        }
        if (deltaX < deltaY) {
          return;
        }
        let offsetWidth = 0;
        let opacity = 1;
        if (this.currentShow === 'cd') {
          if (this.touch.percent > 0.1) {
            offsetWidth = -window.innerWidth;
            opacity = 0;
            this.currentShow = 'lyric';
          } else {
            opacity = 1;
            offsetWidth = 0;
          }
        } else {
          if (this.touch.percent < 0.9) {
            offsetWidth = 0;
            opacity = 1;
            this.currentShow = 'cd';
          } else {
            opacity = 0;
            offsetWidth = -window.innerWidth;
          }
        }
        // 设置cd页动画
        this.$refs.CD.style.opacity = opacity;
        this.$refs.CD.style[transition] = 'all .5s ease-in-out';
        // 设置右侧偏移
        this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`;
        this.$refs.lyricList.$el.style[transition] = 'all .5s ease-in-out';
      },
      // 映射一个修改方法
      ...mapMutations({
        setFullScreen: mTypes.SET_FULL_SCREEN
      }),
      ...mapActions([
        'savePlayHistory'
      ])
    },
    computed: {
      playIcon () {
        return this.playing ? 'icon-pause' : 'icon-play';
      },
      // cd唱片的class样式
      cdClass () {
        return this.playing ? 'play' : 'play pause';
      },
      // 按钮的禁用样式
      disableCls () {
        return this.songReady ? '' : 'disable';
      },
      // 播放进度百分比
      playPercent () {
        return this.currentTime / this.currentSong.duration;
      },
      ...mapGetters([
        'fullScreen',
        'currentIndex',
        'playing'
      ])
    },
    watch: {
      // 监听currentSong的变化
      currentSong (newSong, oldSong) {
        if (!newSong.id || !newSong.url || newSong.id === oldSong.id) {
          return;
        }
        this.songReady = false;
        if (this.currentLyric) {
          this.currentLyric.stop();
          // 重置为null
          this.currentLyric = null;
          this.currentTime = 0;
          this.playingLyric = '';
          this.currentLineNum = 0;
        }
        this.$refs.audio.src = newSong.url;
        this.$refs.audio.play();
        this.getLyric();
      },
      playing (newPlaying) {
        if (!this.songReady) {
          return;
        }
        const audio = this.$refs.audio;
        this.$nextTick(() => {
          newPlaying ? audio.play() : audio.pause();
        });
      }
    },
    components: {
      progressBar, Scroll, PlayList
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .player
    .normal-player
      position: fixed
      left: 0
      right: 0
      top: 0
      bottom: 0
      z-index: 150
      background: $color-background
      &.slide-enter-active, &.slide-leave-active
        transition: all .3s
      &.slide-enter, &.slide-leave-to
        transform: translate3d(100%, 0, 0)
      .background
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
        z-index: -1
        img
          filter: blur(20px)
        .mask
          position: absolute
          left: 0
          top: 0
          width: 100%
          height: 100%
          opacity: 0.5
          background: #000000
      .top
        position: relative
        margin-bottom: 25px
        height: 44px
        border-1px($color-gray-line)
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
          display: inline-block
          width: 100%
          margin: 0 auto
          text-align: center
          color: $color-white
          .song-name
            font-size: $font-size14
            line-height: 26px
          .song-singer
            line-height: 18x
            font-size: $font-size12
            color: $color-gray-l
        .playlist
          position: absolute
          top: 2px
          right: 5px
          font-size: 30px
          color: $color-white-d
          line-height: 44px
      .middle
        position: fixed
        width: 100%
        top: 80px
        bottom: 170px
        white-space: nowrap
        font-size: 0
        .middle-l
          display: inline-block
          vertical-align: top
          position: relative
          top: 50%
          width: 100%
          height: 0
          transform: translateY(-50%)
          padding-top: 74%
          margin-top: -30px
          .cd-wrapper
            position: absolute
            left: 13%
            top: 0
            width: 74%
            height: 100%
            .cd
              width: 100%
              height: 100%
              box-sizing: border-box
              border: 15px solid rgba(255, 255, 255, 0.1)
              border-radius: 50%
              &.play
                animation: rotate 20s linear infinite
              &.pause
                animation-play-state: paused
              .image
                position: absolute
                left: 0
                top: 0
                width: 100%
                height: 100%
                border-radius: 50%
                box-sizing: border-box
                border: 25px solid rgba(0, 0, 0, 0.8)
          .playing-lyric-wrapper
            width: 80%
            margin: 50px auto 0 auto
            overflow: hidden
            text-align: center
            .playing-lyric
              height: 20px
              line-height: 20px
              font-size: $font-size16
              color: $color-white-d
        .middle-r
          display: inline-block
          vertical-align: top
          width: 100%
          height: 100%
          overflow: hidden
          .lyric-wrapper
            width: 80%
            margin: 0 auto
            overflow: hidden
            text-align: center
            .text
              line-height: 32px
              color: $color-white-dd
              font-size: $font-size14
              &.current
                color: $color-white
      .bottom
        position: absolute
        bottom: 25px
        width: 100%
        .dot-wrapper
          text-align: center
          font-size: 0
          .dot
            display: inline-block
            vertical-align: middle
            margin: 0 4px
            width: 8px
            height: 8px
            border-radius: 50%
            background: $color-white-d
            &.active
              width: 20px
              border-radius: 5px
              background: $color-gray-l
        .progress-wrapper
          display: flex
          align-items: center
          width: 95%
          margin: 0px auto
          padding: 20px 0
          .time
            color: $color-white
            font-size: $font-size14
            flex: 0 0 30px
            line-height: 30px
            width: 30px
            &.time-l
              text-align: left
              margin-right: 5px
            &.time-r
              text-align: right
              margin-left: 5px
          .progress-bar-wrapper
            flex: 1
        .operators
          display: flex
          justify-content: space-around
          align-items: center
          font-size: 30px
          color: $color-white-d
          .center
            i
              display: inline-block
              vertical-align: middle
            .play
              font-size: 50px
              margin: 0 20px
          .disable
            opacity: 0.5

    .mini-player
      position: fixed
      right: 15px
      top: 0
      z-index: 180
      width: 30px
      height: 44px
      &.mini-enter-active, &.mini-leave-active
        transition: all 0.4s
      &.mini-enter, &.mini-leave-to
        opacity: 0
      .icon
        font-size: 0
        position: absolute
        top: 50%
        left: 0
        transform: translateY(-50%)
        img
          border: none

  @keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)
</style>

