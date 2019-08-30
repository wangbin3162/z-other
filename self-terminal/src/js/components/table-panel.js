Vue.component('v-table-panel', {
  template: `
    <div class="table-panel">
      <h2 v-if="label.length>0">{{label}}</h2>
      <slot></slot>
      <div class="back" v-if="!noBack">
        <b-button @click="$emit('on-back')">返回</b-button>
      </div>
    </div>`,
  props: {
    label: String,
    noBack: Boolean
  }
})
