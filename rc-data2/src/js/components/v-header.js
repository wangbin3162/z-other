Vue.component('v-header', {
  template: `
    <div class="v-header">
      <div class="label">{{label}}</div>
      <div class="btn">
        <slot>
          <a class="active">全市信用综合分析平台</a>
          <a>重点人群重点行业分析</a>
          <a>专项应用分析</a>
        </slot>
      </div>
      <div class="date">{{date}}</div>
    </div>`,
  props: {
    label: {
      type: String,
      default: '主标题'
    }
  },
  data () {
    return {
      date: ''
    }
  },
  created () {
    let myDate = new Date()
    let yerar = myDate.getFullYear()    //获取完整的年份(4位,1970-????)
    let month = myDate.getMonth() + 1      //获取当前月份(0-11,0代表1月)
    let day = myDate.getDate()        //获取当前日(1-31)
    this.date = `${yerar}年${month}月${day}号`
  }
})
