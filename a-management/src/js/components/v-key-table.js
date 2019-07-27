Vue.component('v-key-table', {
  template: `
  <div class="v-key-table">
    <div class="item" v-for="item in data" :key="item.key">
      <span class="key">{{ item.key }}</span>
      <span class="value">{{ item.value }}</span>
    </div>
  </div>`,
  props: {
    itemWidth: {
      type: String,
      default: '50%'
    },
    data: {
      type: Array,
      default: function () {
        return []
      }
    }
  }
})
