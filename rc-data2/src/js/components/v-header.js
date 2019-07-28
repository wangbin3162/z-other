Vue.component('v-header', {
  template: `
    <div class="v-header">
      <div class="label"><slot>{{label}}</slot></div>
      <div class="btn">
        <span :class="{'active':activeMenu===0}" @click="$emit('on-menu-click',0)">全市信用综合分析平台</span>
        <span :class="{'active':activeMenu===1}"  @click="$emit('on-menu-click',1)">重点人群重点行业分析</span>
        <span :class="{'active':activeMenu===1}"  @click="$emit('on-menu-click',2)">村居信用专项分析平台</span>
      </div>
      <div class="date">{{date}}</div>
    </div>`,
  props: {
    label: {
      type: String,
      default: '主标题'
    },
    activeMenu: {
      type: Number,
      default: 0
    },
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
