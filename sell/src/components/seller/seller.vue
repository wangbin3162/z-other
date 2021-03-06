<template>
  <div class="seller" ref="seller">
    <div class="seller-wrapper">
      <div class="overview">
        <div class="title">{{seller.name}}</div>
        <div class="desc border-1px">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite">
          <span class="icon-favorite" :class="{'active':favorite}"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper border-1px">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li class="support-item border-1px" v-for="(item,index) in seller.supports" :key="index">
            <mapicon :size="4" :classType="seller.supports[index].type"></mapicon>
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picwrapper">
          <ul class="pic-list" ref="piclist">
            <li class="pic-item" v-for="(pic,index) in seller.pics" :key="index">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title border-1px">商家信息</h1>
        <ul>
          <li class="info-item" v-for="(info,index) in seller.infos" :key="index">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from '../star/star.vue';
  import split from '../split/split.vue';
  import classMap from '../classmap/classMap.vue';
  import BScroll from 'better-scroll';
  import { saveToLocal, loadFromLocal } from '../../common/js/store.js';
  // var appData = require('../../common/moke/data.json');
  // var seller = appData.seller;
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        favorite: (() => {
          return loadFromLocal(this.seller.id, 'favorite', false);
        })()
      };
    },
    computed: {
      favoriteText () {
        return this.favorite ? '已收藏' : '收藏';
      }
    },
    watch: {
      'seller' () {
        this._initScroll();
        this._initPics();
      }
    },
    mounted () {
      this._initScroll();
      this._initPics();
    },
    methods: {
      _initScroll () {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.seller, {
              click: true// 可以点击
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      _initPics () {
        if (this.seller.pics) {
          let picW = 120;
          let margin = 6;
          let width = (picW + margin) * this.seller.pics.length - margin;
          this.$refs.piclist.style.width = width + 'px';
          this.$nextTick(() => {
            if (!this.picScroll) {
              this.picScroll = new BScroll(this.$refs.picwrapper, {
                scrollX: true,
                eventPassthrough: 'vertical'
              });
            } else {
              this.picScroll.refresh();
            }
          });
        }
      },
      toggleFavorite (event) {
        if (!event._constructed) {
          return;
        }
        this.favorite = !this.favorite;
        saveToLocal(this.seller.id, 'favorite', this.favorite);
      }
    },
    components: {
      'star': star,
      'split': split,
      'mapicon': classMap
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .seller
    position: absolute
    top: 174px
    bottom: 0
    width: 100%
    left: 0
    overflow: hidden
    .overview
      position: relative
      padding: 18px
      .title
        margin-bottom: 8px
        line-height: 14px
        color: rgb(7, 17, 27)
        font-size: 14px
        font-weight: 700
      .desc
        padding-bottom: 18px
        color: rgb(7, 17, 27)
        font-size: 0
        border-1px(rgba(7, 17, 27, .1))
        .star
          display: inline-block
          vertical-align: top
          margin-right: 8px
        .text
          display: inline-block
          vertical-align: top
          margin-right: 12px
          line-height: 18px
          font-size: 10px
          color: rgb(77, 85, 93)
      .remark
        display: flex
        padding-top: 18px
        .block
          flex: 1
          text-align: center
          border-right: 1px solid rgba(7, 17, 27, .1)
          &:last-child
            border: none
          h2
            margin-bottom: 4px
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .content
            line-height: 24px
            font-size: 10px
            color: rgb(7, 17, 27)
            .stress
              font-size: 24px

      .favorite
        position: absolute
        right: 11px
        top: 18px
        width: 50px
        text-align: center
        .icon-favorite
          display: block
          margin-bottom: 4px
          color: #d4d6d9
          line-height: 24px
          font-size: 24px
          &.active
            color: rgb(240, 20, 20)
        .text
          line-height: 10px
          font-size: 10px
          color: rgb(77, 85, 93)
    .bulletin
      padding: 18px 18px 0
      .title
        margin-bottom: 8px
        line-height: 14px
        color: rgb(7, 17, 27)
        font-size: 14px
        font-weight: 700
      .content-wrapper
        padding: 0 12px 16px
        border-1px(rgba(7, 17, 27, 0.1))
        .content
          line-height: 24px
          font-size: 12px
          color: rgb(240, 20, 20)
      .supports
        .support-item
          padding: 16px 12px
          font-size: 0
          border-1px(rgba(7, 17, 27, 0.1))
          &:last-child
            border-none()
        .text
          line-height: 16px
          font-size: 12px
          color: rgb(7, 17, 27)
    .pics
      padding: 18px
      .title
        margin-bottom: 12px
        line-height: 14px
        color: rgb(7, 17, 27)
        font-size: 14px
        font-weight: 700
      .pic-wrapper
        width: 100%
        overflow: hidden
        white-space: nowrap
        .pic-list
          font-size: 0
          .pic-item
            display: inline-block
            margin-right: 6px
            width: 120 xp
            height: 90px
            &:last-child
              margin-right: 0
    .info
      padding: 18px 18px 0 18px
      color: rgb(7, 17, 27)
      .title
        padding-bottom: 12px
        line-height: 14px
        border-1px(rgba(7, 17, 27, .1))
        font-size: 14px
        font-weight: 700
      .info-item
        padding: 16px 12px
        line-height: 16px
        border-1px(rgba(7, 17, 27, .1))
        font-size: 12px
        &:last-child
          border-none()
</style>
