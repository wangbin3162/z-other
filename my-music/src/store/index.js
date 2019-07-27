// vuex入口
import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import state from './state';
import mutations from './mutations';
// vuex调试
import createLogger from 'vuex/dist/logger';

Vue.use(Vuex);

// webpack打包的时候会判断是否是调试模式，如果是build后即为production
const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
});
