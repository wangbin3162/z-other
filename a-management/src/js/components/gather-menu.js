Vue.component('gather-menu', {
  template: `
      <el-menu class="gather-menu">
        <template v-for="menu in data">
          <el-menu-item :index="menu.menuId" :key="menu.menuId" class="menu-item"
          @click.native="itemClick(menu)">
            <span class="icon"></span>
            <span slot="title">{{ menu.menuName }}</span>
          </el-menu-item>
        </template>
        <template v-for="menu in data">
          <el-submenu :index="menu.menuId" v-if="menu.child&&menu.child.length>0" :key="menu.menuId" class="submenu">
            <template slot="title">
              <span class="icon"></span>
              <span>{{ menu.menuName }}</span>
            </template>
            <el-menu-item v-for="item in menu.child" :index="item.menuId" :key="item.menuId"
            @click.native="itemClick(item)">
              <span slot="title">{{ item.menuName }}</span>
            </el-menu-item>
          </el-submenu>
        </template>
      </el-menu>`,
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    itemClick (item) {
      this.$emit('on-item-click', item)
    }
  }
})
