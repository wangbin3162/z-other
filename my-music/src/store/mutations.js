// 修改状态逻辑
import * as types from './mutations-types';

const mutations = {
  [types.SET_SINGER] (state, singer) {
    state.singer = singer;
  },
  // 播放状态改变
  [types.SET_PLAYING_STATE] (state, flag) {
    state.playing = flag;
  },
  [types.SET_FULL_SCREEN] (state, flag) {
    state.fullScreen = flag;
  },
  [types.SET_PLAY_LIST] (state, list) {
    state.playlist = list;
  },
  [types.SET_SEQUENCE_LIST] (state, list) {
    state.sequenceList = list;
  },
  [types.SET_PLAY_MODE] (state, mode) {
    state.mode = mode;
  },
  [types.SET_CURRENT_INDEX] (state, index) {
    state.currentIndex = index;
  },
  // 推荐歌单
  [types.SET_DISTLIST] (state, distlist) {
    state.distList = distlist;
  },
  // 排行榜歌单
  [types.SET_TOPLIST] (state, toplist) {
    state.topList = toplist;
  },
  [types.SET_SEARCH_HISTORY] (state, history) {
    state.searchHistory = history;
  },
  [types.SET_PLAY_HISTORY] (state, history) {
    state.playHistory = history;
  },
  [types.SET_FAVORITE_LIST] (state, list) {
    state.favoriteList = list;
  }
};

export default mutations;
