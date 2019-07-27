Vue.component('v-header', {
  template: `
  <div class="v-header">
    <div class="header-inner" flex="main:justify">
      <div class="logo"></div>
      <div class="info" flex="cross:center">
        <div class="user">欢迎您，用户昵称</div>
        <div class="btn">
          <span class="logout" v-waves>注销</span>
          <span class="password" v-waves>修改密码</span>
        </div>
        <div class="sys" v-if="!noSys">
          <span class="sys-btn">
            系统管理
          </span>
        </div>
      </div>
    </div>
  </div>`,
  props: {
    noSys: {
      type: Boolean,
      default: false
    }
  }
})
