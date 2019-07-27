<template>
  <div class="full-pages" ref="page">
    <div class="page-group" ref="pageGroup"
         @touchstart.prevent="middleTouchStart"
         @touchmove.prevent="middleTouchMove"
         @touchend.prevent="middleTouchEnd">
      <slot></slot>
    </div>
    <top-tip :text="topTipLabel" ref="topTip"></top-tip>
  </div>
</template>

<script type="text/ecmascript-6">
  import TopTip from './top-tip.vue';
  import { prefixStyle } from '../common/util/dom';

  const transform = prefixStyle('transform');
  const transition = prefixStyle('transition');
  const transformOrigin = prefixStyle('transformOrigin');
  const perspective = prefixStyle('perspective');
  const MOVE_LEN = 0.3;// 移动的阀值,移动百分之30高度即可判定为滑动
  const MINI_MOVE = 120;// 最小滑动像素
  const DURATION = 300;// 最缓动时间
  const MOVE_TRANSITION = 'all .3s linear';
  export default {
    props: {
      pagesColor: {
        type: Array,
        default: []
      },
      isPullDown: {
        type: Boolean,
        default: false
      },
      // 是否监听pageChange
      listenPageChange: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        currentPageIndex: 0,
        topTipLabel: ''
      };
    },
    created () {
      this.children = null;
      this.pageHeight = 0;
      this.minHeight = 0;
      this.prevPage = null;
      this.currentPage = null;
      this.nextPage = null;
      this.touch = {};
    },
    mounted () {
      setTimeout(() => {
        this._initFullPage();// 初始化slider的总宽度
      }, 20);// 保证dom已经渲染结束
    },
    watch: {
      currentPageIndex (newIndex) {
        if (this.listenPageChange) {
          this.$emit('pageChanged', newIndex);
        }
      }
    },
    methods: {
      _initFullPage () { // 参数用于标识是否是重绘大小时重新计算总宽度
        this.children = this.$refs.pageGroup.children;
        if (this.isPullDown) {
          this.$refs.pageGroup.style[perspective] = '300px';
        }
        this.pageHeight = this.$refs.page.clientHeight;// 记录高度
        this.minHeight = this.pageHeight * MOVE_LEN | 0;// 记录阀值,即滚动到一半高度
        let setColor = this.children.length === this.pagesColor.length;
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i];
          child.classList.add('page-item');// 给每个item添加一个样式
          if (setColor) {
            child.style.backgroundColor = this.pagesColor[i];
          }
          // 设置初始化page的位置
          child.style[transform] = 'translateY(100%)';
        }
        this._setPages(this.currentPageIndex);
      },
      _setPages (currentIndex) {
        if (this.children.length < 1) {
          return;
        }
        // 重置所有
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i];
          // 设置初始化page的位置
          child.style[transform] = 'translateY(100%)';
        }
        this.currentPage = this.children[currentIndex];
        this.currentPage.style[transform] = 'translateY(0)';
        // 初始化page
        if (currentIndex === 0) { // 第一个
          this.prevPage = null;
          this.nextPage = this.children[1];
        } else if (currentIndex === this.children.length - 1) { // 索引是最后一个
          this.prevPage = this.children[currentIndex - 1];
          this.nextPage = null;
        } else {
          this.prevPage = this.children[currentIndex - 1];
          this.nextPage = this.children[currentIndex + 1];
        }
        if (this.prevPage) {
          this.prevPage.style[transform] = 'translateY(-100%)';
        }
        if (this.nextPage) {
          this.nextPage.style[transform] = 'translateY(100%)';
        }
      },
      middleTouchStart (e) {
        this.touch.initaiated = true;
        const touch = e.touches[0];// 第一个手指
        this.touch.startY = touch.pageY;
        this.touch.deltaY = 0;
        this.touch.startTime = new Date();
        this.touch.offsetTime = 0;// 初始化滑动历时
        if (this.prevPage) {
          this.prevPage.style[transition] = '';
        }
        if (this.currentPage) {
          this.currentPage.style[transition] = '';
        }
        if (this.nextPage) {
          this.nextPage.style[transition] = '';
        }
      },
      middleTouchMove (e) {
        if (!this.touch.initaiated) {
          return;
        }
        const touch = e.touches[0];// 第一个手指
        const deltaY = touch.pageY - this.touch.startY;
        this.touch.deltaY = deltaY;
        this._pageMove(deltaY);
      },
      middleTouchEnd (e) {
        this.touch.initaiated = false;
        this.touch.offsetTime = new Date() - this.touch.startTime; // 滑动历时
        const deltaY = this.touch.deltaY;
        if (deltaY <= 0) {
          if (this.currentPageIndex === this.children.length - 1) {
            return;
          }
          if (this.touch.offsetTime < 200 && deltaY < -MINI_MOVE) { // 如果是快速滑动则不必判断阀值直接切换
            this.moveup(true);
            return;
          }
          if (deltaY < -this.minHeight) { // 超过一半切换到nextPage
            this.moveup(true);
          } else { // 没超过一半弹回现在的
            this.moveup(false);
          }
        } else {
          if (this.currentPageIndex === 0) {
            return;
          }
          if (this.touch.offsetTime < 200 && deltaY > MINI_MOVE) { // 如果是快速滑动则不必判断阀值直接切换
            this.movedown(true);
            return;
          }
          if (deltaY > this.minHeight) { // 超过一半切换到prevPage
            this.movedown(true);
          } else { // 没超过一半弹回现在的
            this.movedown(false);
          }
        }
      },
      // 移动page
      _pageMove (value) {
        if (value < 0) { // 表示上滑动
          if (this.currentPageIndex === this.children.length - 1) {
            return;
          }
          if (this.isPullDown) {
            let angle = -value / this.pageHeight * 20;
            let nextY = this.pageHeight + value;
            this.currentPage.style[transformOrigin] = '50% 100% 0';
            this.currentPage.style[transform] = `rotateX(${angle}deg)`;
            this.nextPage.style[transform] = `translateY(${nextY}px)`;
            return;
          }
          let currentY = value;
          let nextY = this.pageHeight + value;
          this.currentPage.style[transform] = `translateY(${currentY}px)`;
          this.nextPage.style[transform] = `translateY(${nextY}px)`;
        } else {
          if (this.isPullDown) {
            if (value > 100) {
              this.checkTopTip();
            }
            return;
          }
          if (this.currentPageIndex === 0) {
            return;
          }
          let currentY = value;
          let prevY = value - this.pageHeight;
          this.prevPage.style[transform] = `translateY(${prevY}px)`;
          this.currentPage.style[transform] = `translateY(${currentY}px)`;
        }
      },
      // 上滑动
      moveup (real) {
        if (this.movetimer) {
          clearTimeout(this.movetimer);
        }
        this.currentPage.style[transition] = MOVE_TRANSITION;
        this.nextPage.style[transition] = MOVE_TRANSITION;
        if (real) { // 表示真正的切换到nextPage否则就是回弹
          if (this.isPullDown) {
            let angle = 20;
            this.currentPage.style[transformOrigin] = '50% 100% 0';
            this.currentPage.style[transform] = `rotateX(${angle}deg)`;
          } else {
            this.currentPage.style[transform] = 'translateY(-100%)';
          }
          this.nextPage.style[transform] = 'translateY(0)';
          this.movetimer = setTimeout(() => {
            this.currentPageIndex++;
            this._setPages(this.currentPageIndex);
          }, DURATION);
        } else {
          if (this.isPullDown) {
            this.currentPage.style[transformOrigin] = '50% 100% 0';
            this.currentPage.style[transform] = 'rotateX(0)';
          } else {
            this.currentPage.style[transform] = 'translateY(0)';
          }
          this.nextPage.style[transform] = `translateY(100%)`;
        }
      },
      // 下滑动滑动
      movedown (real) {
        if (this.movetimer) {
          clearTimeout(this.movetimer);
        }
        if (this.isPullDown) {
          this.checkTopTip();
          return;
        }
        this.currentPage.style[transition] = MOVE_TRANSITION;
        this.prevPage.style[transition] = MOVE_TRANSITION;
        if (real) { // 表示真正的切换到prevPage否则就是回弹
          this.currentPage.style[transform] = 'translateY(100%)';
          this.prevPage.style[transform] = 'translateY(0)';
          this.movetimer = setTimeout(() => {
            this.currentPageIndex--;
            this._setPages(this.currentPageIndex);
          }, DURATION);
        } else {
          this.currentPage.style[transform] = 'translateY(0)';
          this.prevPage.style[transform] = `translateY(-100%)`;
        }
      },
      checkTopTip () {
        if (this.currentPageIndex === this.children.length - 1) {
          this.topTipLabel = '最后一页啦!';
        } else {
          this.topTipLabel = '只能往下翻哦!';
        }
        this.$refs.topTip.show();
      },
      goPage (index) {
        this.currentPageIndex = index;
        this._setPages(this.currentPageIndex);
      }
    },
    components: {
      TopTip
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .full-pages
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: 100
    background: #ffffff
    .page-group
      position: relative
      overflow: hidden
      width: 100%;
      height: 100%
      .page-item
        position: absolute
        top: 0
        left: 0
        width: 100%;
        height: 100%
        overflow: hidden;
        text-align: center;
</style>

