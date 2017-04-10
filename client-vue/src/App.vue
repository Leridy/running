<template>
  <div id="app">
    <nav-header></nav-header>
    <router-view></router-view>
  </div>
</template>

<script>
import header from "./components/header";
export default {
  name: 'app',
  components:{
    navHeader:header
  },
}
</script>

<style lang="less">
@import '../static/less/base.less';
@import '/static/bower_components/animate.css/animate.min.css';
</style>
