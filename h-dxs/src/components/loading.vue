<template>
  <div class="loading">
    <div class="loader">
      <i class="logo"></i>
      <p class="text">读心术准备中</p>
      <img class="bar" src="../assets/images/loading-bars.svg"/>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .loading
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: #ffffff
    z-index: 200
    .loader
      position: relative;
      top: 50%;
      height: 150px;
      width: 150px;
      margin: 0 auto;
      text-align: center;
      transform: translateY(-50%);
      .logo
        position: relative
        display: inline-block
        width: 50px
        height: 50px
        background: url("../assets/images/spr.png") no-repeat 0 0
        background-size: 125px
      .text
        font-size: 14px
        padding: 12px 5px 10px
        font-weight: 700
        color: #755d3d
      .bar
        width: 50px
        height: 50px
</style>

