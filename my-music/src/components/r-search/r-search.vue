<template>
  <div class="search">
    <!--搜索框-->
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @query="onQueryChange"></search-box>
    </div>
    <!--热词填充-->
    <div ref="shortcutWrapper" class="shortcut-wrapper" v-show="!query">
      <scroll :refreshDelay="refreshDelay" class="shortcut" :data="shortcut" ref="shortcut">
        <div>
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li @click="addQuery(item.k)" class="item" v-for="item in hotKey">
                <span>{{item.k}}</span>
              </li>
            </ul>
          </div>
          <div class="search-history" v-show="searchHistory.length">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span @click="showConfirm" class="clear">
                <i class="icon-clear"></i>
              </span>
            </h1>
            <search-list
              @select="addQuery"
              @delete="deleteSearchHistory"
              :searches="searchHistory"></search-list>
          </div>
        </div>
      </scroll>
    </div>
    <!--搜索结果-->
    <div ref="searchResult" class="search-result" v-show="query">
      <search-result
        ref="suggest"
        @listScroll="blurInput"
        @select="saveSearch"
        :query="query"></search-result>
    </div>
    <confirm text="是否清空搜索历史" ref="confirm"
             @confirm="clearSearchHistory"></confirm>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import SearchBox from '../base/search-box/search-box.vue';
  import Scroll from '../base/scroll/scroll.vue';
  import SearchList from '../base/search-list/search-list';
  import Confirm from '../base/confirm/confirm.vue';
  import SearchResult from '../v-search-result/v-search-result.vue';
  import { getHotKey } from '../../api/search';
  import { ERR_OK } from '../../api/config';
  import { mapActions, mapGetters } from 'vuex';

  export default {
    data () {
      return {
        hotKey: [],
        query: '',
        refreshDelay: 100
      };
    },
    created () {
      this._getHotKey();
    },
    computed: {
      shortcut () {
        return this.hotKey;
      },
      ...mapGetters([
        'searchHistory'
      ])
    },
    methods: {
      _getHotKey () {
        getHotKey().then(res => {
          if (res.code === ERR_OK) {
            this.hotKey = res.data.hotkey.slice(1, 11);
          }
        });
      },
      onQueryChange (query) {
        this.query = query;
      },
      showConfirm () {
        this.$refs.confirm.show();
      },
      // 监听列表滚动事件后input输入框失去焦点
      blurInput () {
        this.$refs.searchBox.blur();
      },
      saveSearch () {
        this.saveSearchHistory(this.query);
      },
      addQuery (query) {
        this.$refs.searchBox.setQuery(query);
      },
      ...mapActions([
        'saveSearchHistory',
        'deleteSearchHistory',
        'clearSearchHistory'
      ])
    },
    watch: {
      query (newQuery) {
        if (!newQuery) {
          setTimeout(() => {
            this.$refs.shortcut.refresh();
          }, 20);
        }
      }
    },
    components: {
      SearchBox,
      Scroll,
      SearchList,
      Confirm,
      SearchResult
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .search
    padding-top: 88px
    .search-box-wrapper
      margin: 10px 20px
    .shortcut-wrapper
      position: fixed
      top: 160px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size16
            color: $color-text
            border-1px($color-gray-ll, -8px)
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-theme-dd
            font-size: $font-size14
            color: $color-text
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size16
            color: $color-text-l
            border-1px($color-gray-ll)
            .text
              flex: 1
              font-size: $font-size14
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: fixed
      width: 100%
      top: 178px
      bottom: 0
</style>

