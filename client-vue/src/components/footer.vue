<template>
    <footer id="footer" class="footer">
        <div class="footer-inner">
            <div class="copyright">
                ©2000-<span>{{currentYear}}</span>
            </div>
        </div>
    </footer>
</template>
<script>
export default {
    name: 'footer',
    data() {
        return {
            currentYear:new Date().getFullYear()
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import '../../static/less/footer.less';
</style>
