Vue.component('v-block', {
  template: `
    <div class="v-block">
      <div class="header" v-if="!noHeader">
        <div flex="main:justify cross:bottom">
          <span>{{label}}</span>
          <slot name="header"></slot>
        </div>
      </div>
      <div class="content" :style="{'height': height}"><slot>content</slot></div>
      <div class="angle top-left"></div>
      <div class="angle top-right"></div>
      <div class="angle bottom-left"></div>
      <div class="angle bottom-right"></div>
    </div>`,
  props: {
    label: {
      type: String,
      default: '主标题'
    },
    height: {
      type: String,
      default: 'auto'
    },
    noHeader: Boolean
  }
})
