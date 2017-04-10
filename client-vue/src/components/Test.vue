<template>
  <div class="hello">
    123123123<i class="fa fa-address-book-o" aria-hidden="true"></i>
    <p class="p">dfasdf</p>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.hello{
	color:red;
	font-size: 50px;
  .p{
    color: yellow;
  }
}
</style>
