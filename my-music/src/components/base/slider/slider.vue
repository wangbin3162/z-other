<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot"
            :class="{active: currentPageIndex === index }"
            v-for="(item, index) in dots">
      </span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';

  export default {
    props: {
      loop: {
        type: Boolean,
        default: true
      },
      autoPlay: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 4000
      }
    },
    data () {
      return {
        dots: [],
        currentPageIndex: 0
      };
    },
    created () {
      this.children = null;
      this.slider = null;
      this.resizeTimer = null;
      this.timer = null;
    },
    mounted () {
      setTimeout(() => {
        this._setSliderWidth();// 初始化slider的总宽度
        this._initSlider();// 初始化滑动
        this._initDots();// 初始化dots
        if (this.autoPlay) {
          this._play();
        }
      }, 20);// 保证dom已经渲染结束

      window.addEventListener('resize', () => {
        if (!this.slider || !this.slider.enabled) {
          return;
        }
        clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(() => {
          if (this.slider.isInTransition) { // 判断当前 scroll 是否处于滚动动画过程中。
            this._onScrollEnd();
          } else {
            if (this.autoPlay) {
              this._play();
            }
          }
          this.refresh();
        }, 60);
      });
    },
    activated () {
      this.slider.enable();
      let pageIndex = this.slider.getCurrentPage().pageX;
      if (pageIndex > this.dots.length) {
        pageIndex = pageIndex % this.dots.length;
      }
      this.slider.goToPage(pageIndex, 0, 0);
      this.currentPageIndex = pageIndex;
      if (this.autoPlay) {
        this._play();
      }
    },
    // 失效钩子
    deactivated () {
      this.slider.disable();
      clearTimeout(this.timer);
    },
    // 实例销毁前
    beforeDestroy () {
      this.slider.disable();
      clearTimeout(this.timer);
    },
    methods: {
      refresh () {
        if (this.slider) {
          this._setSliderWidth(true);
          this.slider.refresh();
        }
      },
      _setSliderWidth (isResize) { // 参数用于标识是否是重绘大小时重新计算总宽度
        this.children = this.$refs.sliderGroup.children;
        let width = 0;
        let sliderWidth = this.$refs.slider.clientWidth;// 获取单个slider的宽度
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i];
          child.classList.add('slider-item');// 给每个item添加一个样式
          child.style.width = sliderWidth + 'px';// 设置item宽度
          width += sliderWidth;
        }
        if (this.loop && !isResize) { // 如果循环模式则会拷贝两个
          width += 2 * sliderWidth;
        }
        this.$refs.sliderGroup.style.width = width + 'px';
      },
      _initSlider () {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          ScrollY: false,
          momentum: false,
          snap: {
            loop: this.loop,
            threshold: 0.3,
            speed: 400
          }
        });
        this.slider.on('scrollEnd', this._onScrollEnd);
        // 滚动开始之前。
        this.slider.on('beforeScrollStart', () => {
          if (this.autoPlay) {
            clearTimeout(this.timer);
          }
        });
        // 鼠标/手指离开。
        this.slider.on('touchend', () => {
          if (this.autoPlay) {
            this._play();
          }
        });
      },
      _initDots () {
        let length = this.children.length;
        if (this.loop) { // 循环模式会拷贝两个,所以这里减去
          length -= 2;
        }
        this.dots = new Array(length);
      },
      _onScrollEnd () {
        let pageIndex = this.slider.getCurrentPage().pageX;// 获取当前的pageX
        this.currentPageIndex = pageIndex;
        if (this.autoPlay) {
          this._play();
        }
      },
      _play () {
        let pageIndex = this.slider.getCurrentPage().pageX + 1;
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.slider.goToPage(pageIndex, 0, 400);
        }, this.interval);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable.styl"
  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
          img
            display: block
            width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 10px
      text-align: center
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-gray-ll
        &.active
          border-radius: 5px
          background: $color-theme
</style>

