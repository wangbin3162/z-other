<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from '../v-music-list/v-music-list.vue';
  import { getSongList } from '../../api/recommend';
  import { createSong } from '../../common/js/song';
  import { mapGetters } from 'vuex';
  import { ERR_OK } from '../../api/config';

  export default {
    created () {
      this._getSongList();
    },
    data () {
      return {
        songs: []
      };
    },
    methods: {
      _getSongList () {
        if (!this.distList.tid) {
          this.$router.push('/recommend');
          return;
        }
        getSongList(this.distList.tid).then((res) => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.cdlist[0].songlist);
          }
        });
      },
      _normalizeSongs (list) {
        let ret = [];
        list.forEach((musicData) => {
          if (musicData.songid && musicData.albummid) {
            ret.push(createSong(musicData));
          }
        });
        return ret;
      }
    },
    computed: {
      title () {
        return this.distList.title;
      },
      bgImage () {
        return this.distList.cover_url_medium;
      },
      ...mapGetters([
        'distList'
      ])
    },
    components: {
      MusicList
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>

