Vue.component('v-full-block', {
  template: `
    <div class="v-full-block" :style="boxStyle">
      <div class="inner" style="width: 100%;height:100%;"><slot></slot></div>
    </div>`,
  props: {
    rect: {
      type: Array, // x,y,w,h [460,462],[940,944]
      default () {
        return [40, 20, 460, 462]
      }
    },
  },
  computed: {
    boxStyle () {
      return {
        position: 'absolute',
        left: this.rect[0] + 'px',
        top: this.rect[1] + 'px',
        width: this.rect[2] + 'px',
        height: this.rect[3] + 'px'
      }
    }
  }
})
