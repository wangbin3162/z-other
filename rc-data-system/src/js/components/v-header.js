Vue.component('v-header', {
  template: `
    <div class="v-header">
      <div class="label"><slot>{{label}}</slot></div>
      <div class="btn">
        <span @click="$emit('on-sys')">系统介绍</span>
        <span @click="$emit('on-back')">返回</span>
      </div>
    </div>`,
  props: {
    label: {
      type: String,
      default: '主标题'
    }
  }
})
