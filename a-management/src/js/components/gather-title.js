Vue.component('gather-title', {
  template: `
    <div class="title-box" :class="{'child':child}" flex="cross:center">
      <span class="icon"></span><span class="label">{{ label }}</span>
    </div>`,
  props: {
    label: {
      type: String,
      default: '标题'
    },
    child: Boolean
  }
})
