Vue.component('v-title', {
  template: `
  <div class="v-title" :class="{'bordered':border}" :style="titleStyle">
    <div class="title-inner" :style="labelStyle">
      <slot></slot>
      <span v-if="number">(<i style="font-style: normal;color:#409def;">{{ number }}</i>)</span>
      <span v-if="line==='left'" class="line-left"></span>
      <span v-if="line==='bottom'" class="line-bottom"></span>
    </div>
  </div>`,
  props: {
    bold: Boolean,
    border: Boolean,
    fontSize: {
      type: String,
      default: '18px'
    },
    line: {
      type: String,
      default: 'none' //left bottom none
    },
    bottom: String,
    number: Number
  },
  computed: {
    titleStyle: function () {
      let style = {}
      if (this.bottom) {
        style = {
          marginBottom: this.bottom
        }
      }
      return style
    },
    labelStyle: function () {
      return {
        padding: `15px 5px 15px ${this.line === 'left' ? '20px' : '5px'}`,
        fontWeight: this.bold ? 'bold' : 'normal',
        fontSize: this.fontSize,
      }
    }
  }
})
