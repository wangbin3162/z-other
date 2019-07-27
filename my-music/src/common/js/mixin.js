import { mapGetters, mapMutations, mapActions } from 'vuex';
import { playMode } from '../../common/js/playMode';
import { shuffle } from '../../common/util/utils';

export const playerMixin = {
  computed: {
    iconMode () {
      if (this.mode === playMode.sequence) {
        return 'icon-loop';
      } else if (this.mode === playMode.loop) {
        return 'icon-single';
      } else {
        return 'icon-random';
      }
    },
    ...mapGetters([
      'sequenceList',
      'currentSong',
      'playlist',
      'mode',
      'favoriteList'
    ])
  },
  methods: {
    // 控制播放相关
    changeMode () {
      const mode = (this.mode + 1) % 3;
      this.setPlayMode(mode);
      let list = null;
      if (this.mode === playMode.random) {
        list = shuffle(this.sequenceList);
      } else {
        list = this.sequenceList;
      }
      this.resetCurrentIndex(list);
      this.setPlayList(list);
    },
    // 重设当前索引
    resetCurrentIndex (list) {
      // 获取在当前模式下当前歌曲的索引
      let index = list.findIndex((item) => {
        return item.id === this.currentSong.id;
      });
      this.setCurrentIndex(index);
    },

    toggleFavorite (song) {
      if (this.isFavorite(song)) {
        this.deleteFavoriteList(song);
      } else {
        this.saveFavoriteList(song);
      }
    },
    getFavoriteIcon (song) {
      if (this.isFavorite(song)) {
        return 'icon-favorite';
      } else {
        return 'icon-not-favorite';
      }
    },
    isFavorite (song) {
      const index = this.favoriteList.findIndex((item) => {
        return item.id === song.id;
      });
      return index > -1;
    },
    // 映射一个修改方法
    ...mapMutations({
      setPlayingState: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayMode: 'SET_PLAY_MODE',
      setPlayList: 'SET_PLAY_LIST'
    }),
    ...mapActions([
      'saveFavoriteList',
      'deleteFavoriteList'
    ])
  }
};
