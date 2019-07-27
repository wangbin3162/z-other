// 用于封装一系列对mutations动作
import * as types from './mutations-types';
import { playMode } from '../common/js/playMode';
import { shuffle } from '../common/util/utils';
import { clearSearch, deleteSearch, saveSearch, savePlay, saveFavorite, deleteFavorite } from '../common/js/cache';

// 根据这首歌原始位置找到对应随机到的新位置
function findIndex (list, song) {
  return list.findIndex((item) => {
    return item.id === song.id;
  });
}

// 选择播放操作
export const selectPlay = function ({commit, state}, {list, index}) {
  commit(types.SET_SEQUENCE_LIST, list);// 设置顺序播放列表
  if (state.mode === playMode.random) {
    let randomList = shuffle(list);// 随机列表
    commit(types.SET_PLAY_LIST, randomList);// 设置播放列表
    index = findIndex(randomList, list[index]);// 根据这首歌原始位置找到对应随机到的新位置
  } else {
    commit(types.SET_PLAY_LIST, list);// 设置播放列表
  }
  commit(types.SET_CURRENT_INDEX, index);// 设置当前播放索引
  commit(types.SET_FULL_SCREEN, true);// 设置全屏
  commit(types.SET_PLAYING_STATE, true);// 设置播放状态
};

// 随机播放所有
export const randomPlay = function ({commit}, list) {
  commit(types.SET_PLAY_MODE, playMode.random);// 设置顺序播放列表
  commit(types.SET_SEQUENCE_LIST, list);// 设置顺序播放列表
  let randomList = shuffle(list);// 随机列表
  commit(types.SET_PLAY_LIST, randomList);// 设置播放列表
  commit(types.SET_CURRENT_INDEX, 0);// 设置当前播放索引
  commit(types.SET_FULL_SCREEN, true);// 设置全屏
  commit(types.SET_PLAYING_STATE, true);// 设置播放状态
};

// 搜索添加一个歌曲
export const insertSong = function ({commit, state}, song) {
  let playlist = state.playlist.slice();
  let sequenceList = state.sequenceList.slice();
  let currentIndex = state.currentIndex;
  // 记录当前歌曲
  let currentSong = playlist[currentIndex];
  // 查找搜索的歌曲是否在当前的播放列表里
  let fpIndex = findIndex(playlist, song);
  currentIndex++; // 插入位置
  // 插入一个歌曲
  playlist.splice(currentIndex, 0, song);
  if (fpIndex > -1) { // 如果有这个歌曲
    // 如果当前插入的序号大于列表中的序号
    if (currentIndex > fpIndex) {
      playlist.splice(fpIndex, 1);// 删除之前的
      currentIndex--;
    } else {
      playlist.splice(fpIndex + 1, 1);// 删除之前的
    }
  }
  // 查询当前歌曲再顺序列表的位置
  let currentSIndex = findIndex(sequenceList, currentSong);
  let fsIndex = findIndex(sequenceList, song);
  sequenceList.splice(currentSIndex, 0, song);
  if (fsIndex > -1) { // 如果有这个歌曲
    // 如果当前插入的序号大于列表中的序号
    if (currentIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1);// 删除之前的
    } else {
      sequenceList.splice(fsIndex + 1, 1);// 删除之前的
    }
  }

  commit(types.SET_PLAY_LIST, playlist);
  commit(types.SET_SEQUENCE_LIST, sequenceList);// 设置顺序播放列表
  commit(types.SET_CURRENT_INDEX, currentIndex);// 设置当前播放索引
  commit(types.SET_FULL_SCREEN, true);// 设置全屏
  commit(types.SET_PLAYING_STATE, true);// 设置播放状态
};

// 删除一个歌曲
export const deleteSong = function ({commit, state}, song) {
  let playlist = state.playlist.slice();
  let sequenceList = state.sequenceList.slice();
  let currentIndex = state.currentIndex;

  let pIndex = findIndex(playlist, song);
  playlist.splice(pIndex, 1);// 删除这首歌
  let sIndex = findIndex(sequenceList, song);
  sequenceList.splice(sIndex, 1);// 删除这首歌

  if (currentIndex > pIndex || currentIndex === playlist.length) {
    currentIndex--;
  }

  commit(types.SET_PLAY_LIST, playlist);
  commit(types.SET_SEQUENCE_LIST, sequenceList);// 设置顺序播放列表
  commit(types.SET_CURRENT_INDEX, currentIndex);// 设置当前播放索引

  const playState = playlist.length > 0;

  commit(types.SET_PLAYING_STATE, playState);// 设置播放状态
};

// 清空播放列表,不删除当前歌曲
export const deleteSongList = function ({commit, state}) {
  let playlist = state.playlist.slice();
  let sequenceList = state.sequenceList.slice();
  let currentIndex = state.currentIndex;
  // 记录当前歌曲
  let currentSong = playlist[currentIndex];
  // 清空两个列表
  playlist = [];
  sequenceList = [];
  // 把当前歌曲保留
  playlist.push(currentSong);
  sequenceList.push(currentSong);
  commit(types.SET_PLAY_LIST, playlist);
  commit(types.SET_SEQUENCE_LIST, sequenceList);// 设置顺序播放列表
  commit(types.SET_CURRENT_INDEX, 0);// 设置当前播放索引
};

export const saveSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query));
};

export const deleteSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query));
};

export const clearSearchHistory = function ({commit}) {
  commit(types.SET_SEARCH_HISTORY, clearSearch());
};

export const savePlayHistory = function ({commit}, song) {
  commit(types.SET_PLAY_HISTORY, savePlay(song));
};

export const saveFavoriteList = function ({commit}, song) {
  commit(types.SET_FAVORITE_LIST, saveFavorite(song));
};

export const deleteFavoriteList = function ({commit}, song) {
  commit(types.SET_FAVORITE_LIST, deleteFavorite(song));
};
