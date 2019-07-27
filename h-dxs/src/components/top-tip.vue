<template>
  <transition name="down">
    <div v-show="isShow" class="top-tip">
      <p>{{text}}</p>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      text: {
        type: String,
        default: '只能往下翻哦!'
      }
    },
    data () {
      return {
        isShow: false
      };
    },
    methods: {
      show () {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.isShow = true;
        this.timer = setTimeout(() => {
          this.hide();
        }, 1000);
      },
      hide () {
        this.isShow = false;
      }
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .top-tip
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 40px
    color: #333
    background: #ffffff
    &.down-enter-active, &.down-leave-active
      transition: all .5s
    &.down-enter, &.down-leave-to
      transform: translateY(-100%)
      opacity: 0
    p
      text-align: center
      line-height: 40px
      font-size: 16px
</style>

