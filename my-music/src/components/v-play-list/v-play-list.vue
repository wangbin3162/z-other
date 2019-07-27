<template>
  <transition name="list-fade">
    <div class="playlist" v-show="showFlag" @click="hide">
      <div class="list-wrapper" @click.stop>
        <div class="list-header">
          <h1 class="title">
            <span class="icon" @click="changeMode">
              <span class="text">
                <i :class="iconMode"></i>{{modeText}}
              </span>
            </span>
            <span class="clear" @click="showConfirm"><i class="icon-clear"></i></span>
          </h1>
        </div>
        <scroll :refreshDelay="refreshDelay" ref="listContent" class="list-content"
                :data="sequenceList">
          <transition-group ref="list" name="list" tag="ul">
            <li :key="item.id"
                class="item"
                ref="listItem"
                v-for="(item,index) in sequenceList"
                @click="selectItem(item,index)">
              <span class="text" :class="{'current':isCurrent(item)}">
                <i v-show="isCurrent(item)" class="icon-play"></i>
                <span class="name-label">{{item.name}}</span>
                <span class="singer-label"> - {{item.singer}}</span>
              </span>
              <span class="like" @click.stop="toggleFavorite(item)">
                <i :class="getFavoriteIcon(item)"></i>
              </span>
              <span class="delete" @click.stop="deleteOne(item)">
                <i class="icon-delete"></i>
              </span>
            </li>
          </transition-group>
        </scroll>
        <div class="list-close" @click="hide">
          <span>关闭</span>
        </div>
      </div>
      <confirm text="是否清空播放列表" confirmBtnText="清空" ref="confirm"
               @confirm="clearPlayList"></confirm>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import { mapActions } from 'vuex';
  import Scroll from '../base/scroll/scroll';
  import { playMode } from '../../common/js/playMode';
  import Confirm from '../base/confirm/confirm';
  import { playerMixin } from '../../common/js/mixin';

  export default {
    mixins: [playerMixin],
    data () {
      return {
        showFlag: false,
        refreshDelay: 100
      };
    },
    computed: {
      modeText () {
        return this.mode === playMode.sequence ? '顺序播放' : this.mode === playMode.random ? '随机播放' : '单曲循环';
      }
    },
    methods: {
      show () {
        this.showFlag = true;
        setTimeout(() => {
          this.$refs.listContent.refresh();
          this.scrollToCurrent(this.currentSong);
        }, 20);
      },
      hide () {
        this.showFlag = false;
      },
      isCurrent (item) {
        if (this.currentSong.id === item.id) {
          return true;
        } else {
          return false;
        }
      },
      selectItem (item, index) {
        if (this.mode === playMode.random) {
          index = this.playlist.findIndex((song) => {
            return song.id === item.id;
          });
        }
        this.setCurrentIndex(index);
        this.setPlayingState(true);
      },
      deleteOne (item) {
        this.deleteSong(item);
        if (!this.playlist.length) {
          this.hide();
        }
      },
      showConfirm () {
        this.$refs.confirm.show();
      },
      clearPlayList () {
        this.deleteSongList();
        this.hide();
      },
      // 滚动到播放的song
      scrollToCurrent (current) {
        const index = this.sequenceList.findIndex((song) => {
          return song.id === current.id;
        });
        this.$refs.listContent.scrollToElement(this.$refs.listItem[index], 300);
      },
      ...mapActions([
        'deleteSong',
        'deleteSongList'
      ])
    },
    watch: {
      currentSong (newSong, oldSong) {
        if (!this.showFlag || newSong.id === oldSong.id) {
          return;
        }
        this.scrollToCurrent(newSong);
      }
    },
    components: {
      Scroll,
      Confirm
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .playlist
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 200
    background-color: $color-background-d
    &.list-fade-enter-active, &.list-fade-leave-active
      transition: opacity 0.3s
      .list-wrapper
        transition: all 0.3s
    &.list-fade-enter, &.list-fade-leave-to
      opacity: 0
      .list-wrapper
        transform: translate3d(0, 100%, 0)
    &.list-fade-enter
    .list-wrapper
      position: absolute
      left: 0
      bottom: 0
      width: 100%
      background-color: $color-background
      .list-header
        position: relative
        padding: 10px 15px
        border-1px($color-gray-ll)
        .title
          display: flex
          align-items: center
          justify-content: space-between
          .icon
            extend-click()
            i
              display: inline-block
              vertical-align: top
              font-size: 18px
              color: $color-gray-l
              margin-right :4px
            .text
              display: inline-block
              vertical-align: top
              line-height: 18px
              font-size: $font-size14
              color: $color-text
          .clear
            extend-click()
            .icon-clear
              font-size: $font-size-medium
              color: $color-text-d
      .list-content
        max-height: 320px
        overflow: hidden
        .item
          display: flex
          align-items: center
          height: 40px
          padding: 0 15px
          overflow: hidden
          border-1px($color-gray-ll)
          &.list-enter-active, &.list-leave-active
            transition: all 0.1s
          &.list-enter, &.list-leave-to
            height: 0
          .text
            flex: 1
            no-wrap()
            font-size: $font-size14
            color: $color-text
            &.current
              color: $color-theme
              .singer-label
                color: $color-theme
            i
              margin-right :5px
            .singer-label
              font-size: $font-size12
              color: $color-gray

          .like
            extend-click()
            margin-right: 18px
            font-size: $font-size16
            color: $color-gray
            .icon-favorite
              color: red
          .delete
            extend-click()
            font-size: $font-size14
            color: $color-gray
      .list-close
        text-align: center
        line-height: 50px
        background: $color-background
        font-size: $font-size14
        color: $color-text
        border-1px($color-gray-ll, 50px)
</style>

