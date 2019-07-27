<template>
  <div class="cartcontrol">

    <transition name="move">
      <div class="cart-decrease  icon-remove_circle_outline"
           v-show="food.count>0" @click.stop.prevent="decreaseCart($event)">
      </div>
    </transition>

    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart($event)"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';

  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart (event) {
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
        this.$emit('cart-add', event.target);// 触发事件点击传入当前的对象，目的是为了获取小球动画的初始位置
      },
      decreaseCart (event) {
        if (!event._constructed) {
          return;
        }
        if (this.food.count) {
          this.food.count--;
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    border: none
    .cart-decrease
      display: inline-block
      padding: 6px
      opacity: 1
      transform: translate3d(0, 0, 0)
      font-size: 24px
      line-height: 24px
      color: rgb(0, 160, 220)
      transform:rotate(180deg)
      &.move-enter-active, &.move-leave-active
        transition: all .4s linear
      &.move-enter, &.move-leave-to
        opacity: 0
        transform: translate3d(24px, 0, 0)

    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align center
      fons-size: 10px
      color: rgb(147, 153, 159)
    .cart-add
      display: inline-block
      padding: 6px
      font-size: 24px
      line-height: 24px
      color: rgb(0, 160, 220)
</style>

