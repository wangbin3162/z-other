// 对状态的映射
export const singer = state => state.singer;
// 对播放状态的映射
export const playing = state => state.playing;

export const fullScreen = state => state.fullScreen;

export const playlist = state => state.playlist;

export const sequenceList = state => state.sequenceList;

export const mode = state => state.mode;

export const currentIndex = state => state.currentIndex;

export const currentSong = (state) => {
  return state.playlist[state.currentIndex] || {};
};
// 推荐歌单列表
export const distList = state => state.distList;
// 排行歌单列表
export const topList = state => state.topList;

export const searchHistory = state => state.searchHistory;

export const playHistory = state => state.playHistory;

export const favoriteList = state => state.favoriteList;
