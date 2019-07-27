<template>
  <div class="container">
    <loading v-if="!loadingOK"></loading>
    <div class="pages">
      <full-pages :pagesColor="pagesColor" ref="fullPage"
                  :listenPageChange="true"
                  :isPullDown="true"
                  @pageChanged="changePage">
        <!--首页-->
        <div>
          <div class="center">
            <img @load="loadImage" src="../assets/images/2.jpg"/>
            <div class="bubble">
              <i class="spr-bubble"></i>
            </div>
            <div class="arr">开始读心
              <div class="spr-arr"></div>
            </div>
          </div>
        </div>
        <!--凭感觉记住一张牌-->
        <div>
          <div class="center">
            <img @load="loadImage" src="../assets/images/3.jpg"/>
            <div class="poker">
              <i class="poker1" :class="pokerIcon"></i>
            </div>
            <div class="arr">继续
              <div class="spr-arr"></div>
            </div>
          </div>
        </div>
        <!--第1页-->
        <div>
          <div class="center">
            <img @load="loadImage" src="../assets/images/4.jpg"/>
            <div class="arr">继续
              <div class="spr-arr"></div>
            </div>
          </div>
        </div>
        <!--第2页-->
        <div>
          <div class="center">
            <img @load="loadImage" src="../assets/images/5.jpg"/>
            <div class="arr">继续
              <div class="spr-arr"></div>
            </div>
          </div>
        </div>
        <!--第3页-->
        <div>
          <div class="center">
            <img @load="loadImage" src="../assets/images/6.jpg"/>
            <div class="arr">继续
              <div class="spr-arr"></div>
            </div>
          </div>
        </div>
        <!--被偷走-->
        <div>
          <div class="center">
            <img @load="loadImage" src="../assets/images/7.jpg"/>
            <div class="poker">
              <i class="poker2" :class="pokerIcon"></i>
            </div>
            <div class="arr">继续
              <div class="spr-arr"></div>
            </div>
          </div>
        </div>
        <!--last-->
        <div>
          <div class="center">
            <img @load="loadImage" src="../assets/images/81.jpg"/>
            <div class="btn" @click.stop="tryAgain">
              <span class="tryAgain">再试一次</span>
            </div>
          </div>
        </div>
      </full-pages>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Loading from './loading.vue';
  import FullPages from './full-pages.vue';
  import {getRandomInt} from '../common/util/utils';

  export default {
    data() {
      return {
        loadingOK: false,
        pokerIndex: 0,
        pagesColor: [
          '#7805d0',
          '#7805d0',
          '#7aad20',
          '#e46339',
          '#06baae',
          '#7805d0',
          '#6806cf']
      };
    },
    created() {
      this.count = 0;
      this.pokerIndex = getRandomInt(1, 2);
    },
    computed: {
      pokerIcon() {
        return this.pokerIndex === 1 ? 'card1' : 'card2';
      }
    },
    methods: {
      changePage(index) {
//        console.log('pageChanged:' + index)
      },
      loadImage() {
        this.count++;
        if (this.count >= 5) {
          this.loadingOK = true;
        }
      },
      test() {
        this.$refs.fullPage.goPage(5);
      },
      tryAgain() {
        if (this.pokerIndex === 1) {
          this.pokerIndex = 2;
        } else {
          this.pokerIndex = 1;
        }
        this.$refs.fullPage.goPage(0);
      }
    },
    components: {
      Loading,
      FullPages
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .container
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: 0
    .pages
      .center
        position: relative
        top: 50%
        transform: translateY(-50%)
        margin-left: auto
        margin-right: auto
        max-width: 320px
        img
          max-width: 100%
        .poker
          position: absolute
          top: 170px
          left: 50%
          margin-left: -114px
          width: 229px
          height: 211px
          .poker1
            display: inline-block
            width: 100%
            height: 100%
            background-repeat: no-repeat
            background-size: 475px
            background-position: 0 0
            &.card1
              background-image: url("../assets/images/poker1.jpg")
            &.card2
              background-image: url("../assets/images/poker2.jpg")
          .poker2
            display: inline-block
            width: 100%
            height: 100%
            background-repeat: no-repeat
            background-size: 475px
            background-position: -240px 0
            &.card1
              background-image: url("../assets/images/poker1.jpg")
            &.card2
              background-image: url("../assets/images/poker2.jpg")
        .bubble
          position: absolute
          top: 294px
          left: 178px
          .spr-bubble
            display: block
            margin-top: 7px
            margin-left: auto
            margin-right: auto
            background-image: url('../assets/images/spr.png')
            background-repeat: no-repeat
            background-size: 125px
            width: 109px
            height: 33px
            background-position: 0 -54px
        .arr
          position: absolute
          top: 428px
          left: 50%
          margin-left: -33px
          z-index: 12
          width: 70px
          height: 45px
          text-align: center
          font-size: 14px
          color: #fff
          .spr-arr
            display: block
            margin-top: 7px
            margin-left: auto
            margin-right: auto
            width: 39px
            height: 20px
            background-position: -60px -12px
            background-image: url('../assets/images/spr.png')
            background-repeat: no-repeat
            background-size: 125px
        .btn
          position: absolute
          top: 280px
          left: 0
          width: 100%
          text-align: center
          .tryAgain
            display: block
            padding: 10px 20px
            color: #fff
            font-size: 18px
            text-align: center
            padding-left: 0
            padding-right: 0
            margin-left: 30px
            margin-right: 30px
            background-color: #71b408
            border-color: #a9cc72
            margin-bottom: 10px
            border-radius: 20px
</style>

