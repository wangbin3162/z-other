<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn"
           @touchstart.prevent="progressTouchStart"
           @touchmove.prevent="progressTouchMove"
           @touchend.prevent="progressTouchEnd">
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { prefixStyle } from '../../../common/util/dom';

  const progressBtnWidth = 16;
  const transform = prefixStyle('transform');

  export default {
    props: {
      percent: {
        type: Number,
        default: 0
      }
    },
    created () {
      this.touch = {};// 共享touch数据
    },
    methods: {
      // 进度条拖拽事件监听
      progressTouchStart (e) {
        this.touch.initiated = true;
        this.touch.startX = e.touches[0].pageX;
        this.touch.left = this.$refs.progress.offsetWidth;// 记录偏移量
      },
      progressTouchMove (e) {
        if (!this.touch.initiated) {
          return;
        }
        const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
        const deltaX = e.touches[0].pageX - this.touch.startX;// 获取增量
        const offsetWidth = Math.min(barWidth, Math.max(0, this.touch.left + deltaX));
        this._offset(offsetWidth);
      },
      progressTouchEnd () {
        this.touch.initiated = false;
        this._triggerPercent();// 通知外层设置音乐播放进度
      },
      progressClick (e) {
        // 当我们点击bar上的按钮的时候e.offsetx不对
        // this._offset(e.offsetX);
        const rect = this.$refs.progressBar.getBoundingClientRect();
        const offset = e.pageX - rect.left;
        this._offset(offset);
        this._triggerPercent();
      },
      _triggerPercent () {
        const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
        const percent = this.$refs.progress.clientWidth / barWidth;
        this.$emit('percentChange', percent);
      },
      _offset (offsetWidth) {
        this.$refs.progress.style.width = `${offsetWidth}px`;// 设置进度宽度
        this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)`;
      }
    },
    watch: {
      percent (newPer) {
        if (newPer >= 0 && !this.touch.initiated) {
          const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
          const offsetWidth = newPer * barWidth;
          this._offset(offsetWidth);
        }
      }
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable"

  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 2px
      background: rgba(255, 255, 255, 0.3)
      border-radius :4px
      .progress
        position: absolute
        height: 100%
        background: $color-theme
        border-radius :4px
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 5px solid $color-white
          border-radius: 50%
          background: $color-theme
</style>
