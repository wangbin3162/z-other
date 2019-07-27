<template>
  <div class="rank" ref="rank">
    <scroll :data="topList" class="toplist" ref="toplist">
      <ul>
        <li class="item" v-for="item in topList" @click="selectItem(item)">
          <div class="icon">
            <img width="100" height="100" v-lazy="item.picUrl"/>
          </div>
          <ul class="songlist">
            <li class="song" v-for="(song,index) in item.songList">
              <span>{{index + 1}}</span>
              <span>{{song.songname}}-{{song.singername}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="loading-container" v-show="!topList.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from '../base/scroll/scroll';
  import Loading from '../base/loading/loading';
  import { getTopList } from '../../api/rank';
  import { ERR_OK } from '../../api/config';
  import { mapMutations } from 'vuex';
  import { SET_TOPLIST } from '../../store/mutations-types';

  export default {
    created () {
      this._getTopList();
    },
    data () {
      return {
        topList: []
      };
    },
    methods: {
      _getTopList () {
        getTopList().then((res) => {
          if (res.code === ERR_OK) {
            this.topList = res.data.topList;
          }
        });
      },
      selectItem (item) {
        this.$router.push({
          path: `/rank/${item.id}`
        });
        this.setTopList(item);
      },
      ...mapMutations({
        setTopList: SET_TOPLIST
      })
    },
    components: {
      Scroll,
      Loading
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .rank
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .toplist
      height: 100%
      overflow: hidden
      .item
        display: flex
        height: 100px
        margin-bottom: 5px
        padding: 0 10px
        .icon
          flex: 0 0 100px
          width: 100px
          height: 100px
        .songlist
          flex: 1
          display: flex
          flex-direction: column
          justify-content: center
          padding: 0 10px
          height: 100px
          overflow: hidden
          color: $color-text
          font-size: $font-size14
          border-1px($color-gray-ll)
          .song
            no-wrap()
            line-height: 28px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>

