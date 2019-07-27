Vue.component('v-steps', {
  template: `
    <div class="step-wrap">
      <transition name="move-transverse" mode="in-out">
        <div class="step step0" v-if="active===0">
          <slot name="step0"></slot>
        </div>
      </transition>
      <transition name="move-transverse" mode="in-out">
        <div class="step step1" v-if="active===1">
          <slot name="step1"></slot>
        </div>
      </transition>
      <transition name="move-transverse" mode="in-out">
        <div class="step step2" v-if="active===2">
          <b-scrollbar style="height:100%;">
            <slot name="step2"></slot>
          </b-scrollbar>
        </div>
      </transition>
    </div>`,
  props: {
    active: {
      type: Number,
      default: 0
    }
  }
})
