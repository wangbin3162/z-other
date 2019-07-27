Vue.component('v-header',{
  template: `
    <div class="menu-header">
      <div class="info" flex="main:right">
        <div class="title" v-if="title">信用查询系统</div>
        <div class="ctrl">
          <span class="back" @click="$emit('on-back')"></span>
          <span class="home" @click="$emit('on-home')"></span>
        </div>
      </div>
    </div>`,
  props: {
    title: Boolean
  }
})
