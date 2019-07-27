Vue.component('gather-box', {
  template: `
     <transition-group name="list-complete" tag="div" class="gather-box">
        <div class="gather-item" v-for="item in data" :key="item.resourceId">
            <div class="item" flex="dir:top">
              <div class="top" flex-box="1">
                <h2>{{ item.resourceName }}</h2>
                <p class="id">{{ item.resourceId }}</p>
                <div flex="main:justify cross:bottom">
                  <div class="count">{{item.count}}<span>条</span></div>
                  <div class="check" v-waves>查看</div>
                </div>
                <p class="desc">{{ item.resourceDesc }}</p>
              </div>
              <div class="bottom">
                <p class="date">最新采集时间：{{item.gatherDate}}</p>
                <div class="ctrl" flex="main:justify cross:center">
                  <span @click="$message('下载模板')">下载模板</span>
                  <span @click="$message('批量导入')">批量导入</span>
                  <span @click="$message('导入记录')">导入记录</span>
                </div>
              </div>
              <div class="tip" :class="{'fill':item.fill}">{{item.fill?'已填报':'未填报'}}</div>
            </div>
        </div>
    </transition-group>`,
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    }
  }
})
