<template>
  <div v-if="items.length" class="full-page-slide-wrapper">
    <slide ref="slide" :autoPlay="false" :loop="false" :showDot="false">
      <slot>
        <div v-for="(item, index) in items">
          <div class="full-page-wrapper" :style="getStyle(index)">
            <h3>{{item.label}}</h3>
            <div v-if="index === items.length -1" class="button-wrapper" @click="handleClick()">
              <span class="button">back</span>
            </div>
          </div>
        </div>
      </slot>
    </slide>
  </div>
</template>

<script type="text/ecmascript-6">
  import Slide from '../slide/vertical-slide.vue'

  const COMPONENT_NAME = 'full-page-slide'
  export default {
    name: COMPONENT_NAME,
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    data () {
      return {
        items: this.data
      }
    },
    components: {
      Slide
    },
    methods: {
      handleClick () {
        this.$emit('finish')
      },
      getStyle (index) {
        return `background-color:${this.items[index].bgColor}`
      }
    }
  }
</script>

<style lang="stylus">
  @import "../../common/stylus/theme.styl"

  .full-page-slide-wrapper
    position: fixed
    z-index: 20
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: #efeff4
    overflow: hidden
    .slide
      height: 100%
      .slide-group
        height: 100%
        .slide-item
          height: 100%
          width: 100%
          .full-page-wrapper
            position: relative
            height: 100%
            background-size: cover
            transform: translateZ(0)
            h3
              position: absolute
              top: 50%
              left: 0
              width: 100%
              height 50px
              line-height: 50px
              margin-top: -25px
              font-size: 30px
              color: #fff
            .button-wrapper
              position: fixed
              bottom: 85px
              display: block
              width: 100%
              overflow: hidden
              .button
                display: inline-block
                width: 130px
                padding: 15px 0
                border: 4px solid rgba(255, 255, 255, 0.7)
                border-radius: 4px
                color: rgba(255, 255, 255, 0.7)
                font-size: $font-size-large-x
</style>
