<template>
  <div>
    <v-header :seller="seller"/>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  import {urlParse} from './common/js/utils';
  import header from './components/header/header';

  var appData = require('./common/moke/data.json');
  var seller = appData.seller;
  // 定义ok状态码
  // const ERR_OK = 0;

  export default {
    data() {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse();
            return queryParam.id;
          })()
        }
      };
    },
    created() {
//       this.$http.get('/api/seller?id=' + this.seller.id).then((response) => {
//         response = response.body;// 获取返回对象
//         if (response.errno === ERR_OK) {   // 成功并填充数据
// //          this.seller = response.data;
//           this.seller = Object.assign({}, this.seller, response.data);
//         }
//       }, response => {
//         // error callback
//       });
      this.seller = seller;
    },
    components: {
      'v-header': header
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"
  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    border-1px(rgba(7, 17, 27, .1))
    .tab-item
      flex: 1
      text-align: center
      & > a
        display: block
        font-size: 14px
        color: #7e8c8d
        &.active
          color: rgb(240, 20, 20)
</style>
