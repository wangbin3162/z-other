Vue.component('v-search-panel', {
  template: `
    <div class="search-panel">
      <h2>{{label}}</h2>
      <div class="form">
        <slot></slot>
      </div>
      <div class="search-btn" v-waves @click="$emit('on-search')">查 询</div>
      <div class="level-panel" flex="dir:top main:justify" v-if="!hideLevel">
        <span @click="$emit('on-level-click','AAA')">AAA</span>
        <span @click="$emit('on-level-click','AA')">AA</span>
        <span @click="$emit('on-level-click','A')">A</span>
        <span @click="$emit('on-level-click','B')">B</span>
        <span @click="$emit('on-level-click','C')">C</span>
        <span @click="$emit('on-level-click','D')">D</span>
      </div>
    </div>`,
  props: {
    label: String,
    hideLevel: Boolean
  }
})
