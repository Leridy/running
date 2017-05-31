<template>   
    <footer id="footer" class="footer">
        <div class="footer-inner">
            <div class="copyright">
                © 2014 -
                <span itemprop="copyrightYear">2017</span>            
                </div>
        </div>
    </footer>    
</template>
<script>
export default {
    name: 'footer',
    data() {
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import '../../static/less/footer.less';
</style>
