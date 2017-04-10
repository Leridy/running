<template>
  <div class="nav-header">
    <div class="header-content">
      <div class="fl header-logo animated rubberBand">
        RunningDreaming
      </div>
      <ul class="fr menus">
        <li>
          <a href="javascript:void(0)" class="active">aaaa</a>
        </li>
        <li>
          <a href="javascript:void(0)">bbbbb</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'header',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import '../../static/less/header.less';
</style>
