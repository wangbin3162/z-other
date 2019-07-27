<template>
  <ul class="switches">
    <li class="switch-item"
        v-for="(item,index) in switches"
        :class="{'active':currentIndex === index}"
        @click="switchItem(index)">
      <span>{{item.name}} </span>
    </li>
  </ul>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      switches: {
        type: Array,
        default: []
      },
      currentIndex: {
        type: Number,
        default: 0
      }
    },
    methods: {
      switchItem (index) {
        this.$emit('switch', index);
      }
    }
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable"

  .switches
    display: flex
    align-items: center
    width: 240px
    margin: 0 auto
    box-sizing: border-box
    border: 1px solid $color-theme-d
    border-radius: 5px
    .switch-item
      flex: 1
      padding: 8px
      text-align: center
      font-size: $font-size16
      color: $color-text
      border-radius: 5px
      &:nth-child(1)
        border-radius: 5px 0 0 5px
      &:nth-child(2)
        border-radius: 0 5px 5px 0
      &.active
        background: $color-gray-ll
        color: $color-text
</style>
