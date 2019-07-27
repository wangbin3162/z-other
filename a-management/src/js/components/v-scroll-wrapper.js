Vue.component('v-scroll-wrapper', {
  template: `
    <div :class="customClass">
      <b-scrollbar style="height:100%;">
        <slot></slot>
      </b-scrollbar>
    </div>`,
  props: {
    customClass: String
  }
})
