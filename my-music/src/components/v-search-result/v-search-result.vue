<template>
  <scroll class="suggest"
          :data="result"
          :pullup="pullup"
          :beforeScroll="beforeScroll"
          @scrollToEnd="searchMore"
          @beforeScroll="listScroll"
          ref="suggest">
    <ul class="suggest-list">
      <li @click="selectItem(item)" class="suggest-item" v-for="item in result">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore" title=""></loading>
    </ul>
    <div v-show="!hasMore && !result.length" class="no-result-wrapper">
      <no-result title="暂无搜索结果!"></no-result>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
  import Scroll from '../base/scroll/scroll.vue';
  import Loading from '../base/loading/loading.vue';
  import NoResult from '../base/no-result/no-result.vue';
  import { search } from '../../api/search';
  import { ERR_OK } from '../../api/config';
  import { createSong } from '../../common/js/song';
  import Singer from '../../common/js/singer';
  import { mapMutations, mapActions } from 'vuex';// vuex语法糖
  import { SET_SINGER } from '../../store/mutations-types';

  const TYPE_SINGER = 'singer';
  const PERPAGE = 20;
  export default {
    props: {
      showSinger: {
        type: Boolean,
        default: true
      },
      query: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        page: 1,
        result: [],
        pullup: true,
        hasMore: true,
        beforeScroll: true
      };
    },
    methods: {
      searchQuery () {
        this.hasMore = true;
        this.page = 1;
        this.$refs.suggest.scrollTo(0, 0);
        search(this.query, this.page, this.showSinger, PERPAGE).then(res => {
          if (res.code === ERR_OK) {
            this.result = this._genResult(res.data);
            // 检查还有没有搜索结果
            this._checkMore(res.data);
          }
        });
      },
      searchMore () {
        if (!this.hasMore) {
          return;
        }
        this.page++;
        search(this.query, this.page, this.showSinger, PERPAGE).then(res => {
          if (res.code === ERR_OK) {
            this.result = this.result.concat(this._genResult(res.data));
            // 检查还有没有搜索结果
            this._checkMore(res.data);
          }
        });
      },
      _genResult (data) {
        let ret = [];
        if (data.zhida && data.zhida.singerid) {
          ret.push({
            ...data.zhida,
            ...{type: TYPE_SINGER}
          });
        }
        if (data.song) {
          ret = ret.concat(this._normalizeSongs(data.song.list));
        }
        return ret;
      },
      _normalizeSongs (list) {
        let ret = [];
        list.forEach((musicData) => {
          if (musicData.songid && musicData.albumid) {
            ret.push(createSong(musicData));
          }
        });
        return ret;
      },
      _checkMore (data) {
        const song = data.song;
        if (!song.list.length || song.curnum + song.curpage * PERPAGE > song.totalnum) {
          this.hasMore = false;
        }
      },
      getIconCls (item) {
        if (item.type === TYPE_SINGER) {
          return 'icon-mine';
        } else {
          return 'icon-music1';
        }
      },
      getDisplayName (item) {
        if (item.type === TYPE_SINGER) {
          return item.singername;
        } else {
          return `${item.name}-${item.singer}`;
        }
      },
      selectItem (item) {
        if (item.type === TYPE_SINGER) {
          const singer = new Singer({
            id: item.singermid,
            name: item.singername
          });
          this.$router.push({
            path: `/search/${singer.id}`
          });
          this.setSinger(singer);
        } else {
          this.insertSong(item);
        }
        this.$emit('select', item);
      },
      refresh () {
        this.$refs.suggest.refresh();
      },
      // 滚动后的事件
      listScroll () {
        this.$emit('listScroll');
      },
      // vuex的语法糖，...方法名做映射
      ...mapMutations({
        setSinger: SET_SINGER
      }),
      ...mapActions([
        'insertSong'
      ])
    },
    watch: {
      query () {
        this.searchQuery();
      }
    },
    components: {
      Scroll,
      Loading,
      NoResult
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      .suggest-item
        display: flex
        align-items: center
        padding: 10px 0
        margin: 0 0 2px 20px
        border-1px($color-gray-l)
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 16px
          color: $color-text
      .name
        flex: 1
        font-size: $font-size14
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
