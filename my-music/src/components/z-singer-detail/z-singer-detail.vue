<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from '../v-music-list/v-music-list.vue';
  import { mapGetters } from 'vuex';
  import { getSingerDetail } from '../../api/singer';
  import { createSong } from '../../common/js/song';
  import { ERR_OK } from '../../api/config';

  const SONGS_LENGTH = 80; // 定义希望获取多少首歌曲

  export default {
    data () {
      return {
        songs: []
      };
    },
    created () {
      this._getDetail();
    },
    methods: {
      _getDetail () {
        if (!this.singer.id) { // 如果在歌手详情页刷新了则跳回歌手页面
          this.$router.push('/singer');
          return;
        }
        getSingerDetail(this.singer.id, SONGS_LENGTH).then(res => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.data.list);
//            console.log(this.songs);
          }
        });
      },
      // 格式化想要的歌曲数据
      _normalizeSongs (list) {
        let ret = [];
        list.forEach((item) => {
          let musicData = item.musicData;
          if (musicData.songid && musicData.albummid) {
            ret.push(createSong(musicData));
          }
        });
        return ret;
      }
    },
    computed: {
      title () {
        return this.singer.name;
      },
      bgImage () {
        return this.singer.avatar;
      },
      ...mapGetters([
        'singer'
      ])
    },
    components: {
      MusicList
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all .3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>

