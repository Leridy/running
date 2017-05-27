<template>
  <div class="nav-header">
    <div class="header-content">
      <a class="fl header-logo animated" v-bind:class="{ rubberBand: isActive }" v-on:mouseover="sloganOver" v-on:mouseout="sloganOut" href="/">
        <img src="/static/img/bicycle.gif" class="bicycle_gif">        
      </a>
      <ul class="fr menus">
        <li class="menu-item">
          <a href="javascript:void(0)" class="active">首页</a>
        </li>
        <li class="menu-item">
          <a href="javascript:void(0)">分类</a>
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
      isActive:false,
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    sloganOver(){      
      this.isActive=true;
    },
    sloganOut(){
      this.isActive=false;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">@import '../../static/less/header.less';</style>