<template>
  <div class="recommend">
    <scroll ref="scroll" class="recommend-content" :data="distList">
      <div>
        <!--需要确保插槽有值再进行渲染-->
        <div class="slider-wrapper" v-if="recommends.length">
          <div class="slider-content">
            <slider>
              <div v-for="item in recommends">
                <a :href="item.linkUrl">
                  <img @load="loadImage" :src="item.picUrl"/>
                </a>
              </div>
            </slider>
          </div>
        </div>

        <!--热门歌单推荐-->
        <div class="recommend-list">
          <div class="list-title">
            <img src="../../assets/icon/music.png" height="200" width="200"/>
            热门歌单推荐
          </div>
          <ul class="list-wrapper">
            <li v-for="item in distList" class="item" @click="selectItme(item)">
              <div class="icon">
                <img v-lazy="item.cover_url_medium"/>
              </div>
              <div class="text">
                <p class="desc">{{item.title}}</p>
              </div>
              <div class="num" v-if="item.access_num>10000">
                <i class="icon-music1"></i>
                <span>{{getListenNum(item.access_num)}}万</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!--loading-->
      <div class="loading-container" v-show="!distList.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import Slider from '../base/slider/slider.vue';
  import Scroll from '../base/scroll/scroll.vue';
  import Loading from '../base/loading/loading.vue';
  import { getRecommend, getDistList } from '../../api/recommend';
  import { ERR_OK } from '../../api/config';

  import { mapMutations } from 'vuex';
  import { SET_DISTLIST } from '../../store/mutations-types';

  export default {
    data () {
      return {
        recommends: [],
        distList: []
      };
    },
    created () {
      this._getRecommend();// 获取推荐slider
      this._getDistList();// 获取推荐列表
    },
    methods: {
      _getRecommend () {
        getRecommend().then(res => {
          if (res.code === ERR_OK) {
            this.recommends = res.data.slider;
          }
        });
      },
      _getDistList () {
        getDistList().then(res => {
          if (res.code === ERR_OK) {
            let sortList = this._filterDistList(res.playlist.data.v_playlist);
            this.distList = this._getSome(sortList);
          }
        });
      },
      // 筛选推荐列表 ,按播放次数取前15个
      _filterDistList (list) {
        let ret = list.concat();
        ret.sort((a, b) => {
          return b.access_num - a.access_num;
        });
        return ret;
      },
      _getSome (list, num = 15) {
        let ret = [];
        if (list.length >= num) {
          for (let i = 0; i < num; i++) {
            ret.push(list[i]);
          }
          return ret;
        }
        return list;
      },
      loadImage () {
        if (!this.checkLoaded) {
          this.$refs.scroll.refresh();
          this.checkLoaded = true;
        }
      },
      getListenNum (num) {
        return Math.floor(num / 10000);
      },
      // 点击歌单跳转2级路由
      selectItme (item) {
        this.$router.push({
          path: `/recommend/${item.tid}`
        });
        this.setDistList(item);
      },
      ...mapMutations({
        setDistList: SET_DISTLIST
      })
    },
    components: {
      Slider,
      Scroll,
      Loading
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/variable"
  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        padding-top: 40%
        overflow: hidden
        .slider-content
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size16
          color: $color-theme
          img
            display: inline-block
            width: 24px
            height: 24px
            font-size: 0
            vertical-align: middle
            margin-right: 5px
        .list-wrapper
          display: flex
          flex-wrap: wrap
          justify-content: space-between
          .item
            position: relative
            width: 32%
            box-sizing: border-box
            margin-bottom: 5px
            .icon
              img
                font-size: 0
                width: 100%
            .text
              padding: 5px
              line-height: 20px
              font-size: $font-size12
              overflow: hidden
            .num
              position: absolute
              top: 5px
              right: 5px
              padding: 5px
              font-size: $font-size12
              color: $color-white
              background: $color-background-d
              border-radius: 8px
              .icon-music
                display: inline-block
                padding-top: 2px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>

