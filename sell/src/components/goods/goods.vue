<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item ,index) in goods" :key="index" class="menu-item  border-1px"
            :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
          <span class="text">
            <mapicon v-show="item.type>0" :size="3" :classType="item.type"></mapicon>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="(item ,index) in goods" :key="index" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li @click="selectFood(food,$event)" v-for="(food,index) in item.foods" :key="index"class="food-item border-1px">
              <div class="icon">
                <img width="57" height="57" :src="food.icon"/>
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <!--抽象出加入购物车组件-->
                <div class="cartcontrol-wrapper">
                  <cartcontrol @cart-add="_drop" :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart ref="shopcart"
              :select-foods="selectFoods"
              :delivery-price="seller.deliveryPrice"
              :min-price="seller.minPrice"></shopcart>
    <food @cart-add="_drop" :food="selectedFood" ref="food"></food>
  </div>
</template>

<script type="text/ecmascript-6">
  import classMap from '../classmap/classMap.vue';
  import shopcart from '../shopcart/shopcart.vue';
  import food from '../food/food.vue';
  import cartcontrol from '../cartcontrol/cartcontrol.vue';
  import BScroll from 'better-scroll';

  var appData = require('../../common/moke/data.json');
  var goods = appData.goods;
  // 定义ok状态码
  // const ERR_OK = 0;

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [], // 各区域的高度值
        scrollY: 0,
        selectedFood: {}
      };
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height = this.listHeight[i];// 当前高度
          let nextHeight = this.listHeight[i + 1];// 下一个高度
          if (!nextHeight || (this.scrollY >= height && this.scrollY < nextHeight)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    created() {
      // this.$http.get('/api/goods').then((response) => {
      //   response = response.body;// 获取返回对象
      //   if (response.errno === ERR_OK) {   // 成功并填充数据
      //     this.goods = response.data;
      //     this.$nextTick(() => {
      //       this._initScroll();
      //       this._calculateHeight();
      //     });
      //   }
      // }, response => {
      //   // error callback
      // });
      this.goods = goods;
      this.$nextTick(() => {
        this._initScroll();
        this._calculateHeight();
      });
    },
    methods: {
      selectMenu(index, event) {
        if (!event._constructed) { // 如果是浏览器模式则阻止
          return;
        }
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let el = foodList[index];
        this.foodScroll.scrollToElement(el, 300);
      },
      selectFood(food, event) {
        if (!event._constructed) { // 如果是浏览器模式则阻止
          return;
        }
        this.selectedFood = food;
        this.$refs.food.show();
      },
      _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true// 可以点击
        });
        this.foodScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true,
          probeType: 3 // 检测时时滚动的位置
        });

        this.foodScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));// 将y值转换成正 整数
        });
      },
      _calculateHeight() {
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;// 累加每一个item的高度
          this.listHeight.push(height);
        }
      },
      _drop(target) {
        // 异步调用，体验优化，下落动画
        this.$nextTick(() => {
          this.$refs.shopcart.drop(target);
        });
      }
    },
    components: {
      'mapicon': classMap,
      'shopcart': shopcart,
      'cartcontrol': cartcontrol,
      'food': food
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        line-height: 14px
        padding: 0 12px
        border-1px(rgba(7, 17, 27, .2))
        &.current
          position: relative
          margin-top: -1px
          z-index: 10
          background: #ffffff
          font-weight: 700
          .text
            border-none()
      .text
        display: table-cell
        width: 56px
        vertical-align: middle
        font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, .2))
        &:last-child
          border-none()
          padding-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            margin-bottom: 8px
            line-height: 12px
          .extra
            line-height: 10px
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)

          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 0
</style>
