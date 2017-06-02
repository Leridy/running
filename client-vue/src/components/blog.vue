<template>
    <div class="container">
        <nav-header></nav-header>
        <my-footer></my-footer>
    </div>
</template>
<script>
import header from "./header";
import footer from "./footer";
export default {
    name: 'blog',
    components: {
        navHeader: header,
        myFooter: footer        
    },
    data() {
        return {}
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import '../../static/less/blog.less';
</style>
