<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input ref="inputBox" class="box" v-model="query" :placeholder="placeholder"/>
    <i v-show="query" class="icon-delete" @click="clear()"></i>
  </div>
</template>

<script type="text/ecmascript-6">
  import { debounce } from '../../../common/util/utils';

  export default {
    props: {
      placeholder: {
        type: String,
        default: '搜索歌曲、歌手'
      }
    },
    data () {
      return {
        query: ''
      };
    },
    methods: {
      clear () {
        this.query = '';
      },
      setQuery (query) {
        this.query = query;
      },
      blur () {
        this.$refs.inputBox.blur();
      }
    },
    created () {
      this.$watch('query', debounce((newQuery) => {
        this.$emit('query', newQuery);
      }, 200));
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable"

  .search-box
    display: flex
    align-items: center
    box-sizing: border-box
    width: 100%
    padding: 0 6px
    height: 40px
    background: $color-white
    border :1px solid $color-theme
    border-radius: 6px
    .icon-search
      font-size: 24px
      color: $color-gray-l
    .box
      flex: 1
      margin: 0 5px
      padding: 5px 0
      line-height: 18px
      color: $color-text
      font-size: #000
      outline: 0
      &::placeholder
        color: $color-gray-l
    .icon-dismiss
      font-size: 16px
      color: $color-gray-l
</style>
