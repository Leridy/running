<template>
    <div class="not_found">
        <img src="/static/img/404/main_bg.jpg" name="move_ele" class="main_bg plaxify" width="980" height="600" title="傻了吧  - -  当一回侦探自救吧~">
        <img src="/static/img/404/error_txt.png" class="note_bg plaxify" width="230" height="210" name="move_ele">
        <img src="/static/img/404/man.png" class="man_bg plaxify" width="301" height="451" title="设计师不在，只好网上扣图了 →_→" name="move_ele">
        <ul class="gallery plaxify" name="move_ele">
            <div class="nav" v-if="showNav">
                <a href="javascript:void(0)" class="current"></a>
                <a href="javascript:void(0)"></a>
                <a href="javascript:void(0)"></a>
            </div>
        </ul>
        <img src="/static/img/404/rubbish.png" class="rubbish_bg plaxify" width="143" height="96" title="翻一翻看有没有线索..." v-on:click="handleRubbishClick" name="move_ele">
    </div>
</template>
<script>
export default {
    name: 'notFound',
    components: {

    },
    created() {
        document.title = '404页面未找到';
        this.initMouse();
    },
    data() {
        return {
            showNav: false
        }
    },
    methods: {
        initMouse() {
            document.body.addEventListener('mousemove', this.handleMouseMove);
        },
        handleRubbishClick() {
            this.showNav = this.showNav ? false : true;
        },
        handleMouseMove(event) {
            var e = event || window.event,
                h = window.screen.height,
                w = window.screen.width,
                startX = w / 2,
                startY = h / 2,
                x = e.screenX,
                y = e.screenY,
                directionLeft = x < startX ? true : false,
                directionTop = y < startY ? true : false,
                moveX = x < startX ? (startX - x) : (x - startX),
                moveY = y < startY ? (startY - y) : (y - startY),
                xPercent = Math.abs(moveX / startX),
                yPercent = Math.abs(moveY / startY);
            var moveElements = document.getElementsByName('move_ele');
            var ele = moveElements[0];
            //console.log(ele.style);
            //console.log(.width/2*xPercent);
        }

    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import '../../static/less/notFound.less';
</style>
