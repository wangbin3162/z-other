import storage from '../util/my-storage';

const SEARCH_KEY = '__search__';
const SEARCH_MAX_LENGTH = 15;

const PLAY_KEY = '__play__';
const PLAY_MAX_LENGTH = 30;

const FAVORITE_KEY = '__favorite__';
const FAVORITE_MAX_LENGTH = 200;

// 用于存储缓存相关方法
export function saveSearch (query) {
  let searches = storage.get(SEARCH_KEY, []);
  insertArray(searches, query, (item) => {
    return item === query;
  }, SEARCH_MAX_LENGTH);
  storage.set(SEARCH_KEY, searches);
  return searches;
}

// 用于删除缓存相关方法
export function deleteSearch (query) {
  let searches = storage.get(SEARCH_KEY, []);
  deleteFromArray(searches, (item) => {
    return item === query;
  });
  storage.set(SEARCH_KEY, searches);
  return searches;
}

// 用于删除所有
export function clearSearch () {
  storage.remove(SEARCH_KEY);
  return [];
}

export function loadSearch () {
  return storage.get(SEARCH_KEY, []);
}

// 用于存储播放列表缓存
export function savePlay (song) {
  let songs = storage.get(PLAY_KEY, []);
  insertArray(songs, song, (item) => {
    return item.id === song.id;
  }, PLAY_MAX_LENGTH);
  storage.set(PLAY_KEY, songs);
  return songs;
}

export function loadPlay () {
  return storage.get(PLAY_KEY, []);
}

// 用于存储播放列表缓存
export function saveFavorite (song) {
  let songs = storage.get(FAVORITE_KEY, []);
  insertArray(songs, song, (item) => {
    return item.id === song.id;
  }, FAVORITE_MAX_LENGTH);
  storage.set(FAVORITE_KEY, songs);
  return songs;
}

export function deleteFavorite (song) {
  let songs = storage.get(FAVORITE_KEY, []);
  deleteFromArray(songs, (item) => {
    return item.id === song.id;
  }, FAVORITE_MAX_LENGTH);
  storage.set(FAVORITE_KEY, songs);
  return songs;
}

export function loadFavorite () {
  return storage.get(FAVORITE_KEY, []);
}

// 插入数据
function insertArray (arr, val, compare, maxLen) {
  const index = arr.findIndex(compare);
  if (index === 0) {
    return;
  }
  // 如果数组中有这条数据则删除这个
  if (index > 0) {
    arr.splice(index, 1);
  }
  arr.unshift(val);// 插入数据
  if (maxLen && arr.length > maxLen) {
    arr.pop();// 如果数组超出，则把最后一个给推出
  }
}

// 删除数据
function deleteFromArray (arr, compare) {
  const index = arr.findIndex(compare);
  // 如果数组中有这条数据则删除这个
  if (index > -1) {
    arr.splice(index, 1);
  }
}
