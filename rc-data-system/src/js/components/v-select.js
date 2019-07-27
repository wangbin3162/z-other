Vue.component('v-select', {
  template: `
    <div class="v-select">
      <div class="select" @click.stop.self="visible=!visible">
        {{label}}
        <b-icon :class="{'show':visible}" name="md-arrow-dropup" @click.native="visible=!visible"></b-icon>
      </div>
      <transition name="fade-in">
        <div class="options" v-show="visible">
          <span v-for="item in options" :key="item.value"
                @click.self.stop="itemClick(item)"
                :class="['item',{'active':value===item.value}]">{{item.label}}</span>
        </div>
      </transition>
    </div>`,
  props: {
    label: {
      type: String,
      default: 'select'
    },
    value: String,
    options: Array
  },
  data () {
    return {
      visible: false
    }
  },
  methods: {
    itemClick (item) {
      this.visible = false
      this.value = item.value
      this.$emit('input', this.value)
      this.$emit('on-select', this.value)
    }
  }
})
