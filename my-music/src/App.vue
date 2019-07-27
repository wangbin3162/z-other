<template>
  <div id="app">
    <v-header></v-header>
    <v-tab></v-tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script type="text/ecmascript-6">
  import VHeader from './components/v-header/v-header.vue';
  import VTab from './components/v-tab/v-tab.vue';
  import Player from './components/player/player.vue';

  export default {
    components: {
      VHeader,
      VTab,
      Player
    }
  };
</script>
