import { playMode } from '../common/js/playMode';
import { loadSearch, loadPlay, loadFavorite } from '../common/js/cache';
// 状态管理
const state = {
  singer: {},
  playing: false, // 播放
  fullScreen: false, // 全屏播放
  playlist: [], // 播放列表
  sequenceList: [], // 播放顺序
  mode: playMode.sequence,
  currentIndex: -1,
  distList: {},
  topList: {},
  searchHistory: loadSearch(),
  playHistory: loadPlay(),
  favoriteList: loadFavorite()
};

export default state;
