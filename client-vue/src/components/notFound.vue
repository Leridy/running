<template>
    <div class="container">
        <div class="not_found">
            <img src="../assets/404/main_bg.jpg" name="move_ele" class="main_bg plaxify" width="980" height="600" title="傻了吧  - -  当一回侦探自救吧~" data-left="10" data-top="10" data-xrange="25" data-yrange="25">
            <img src="../assets/404/error_txt.png" class="note_bg plaxify" width="230" height="210" name="move_ele" data-left="50" data-top="25" data-xrange="25" data-yrange="25">
            <img src="../assets/404/man.png" class="man_bg plaxify" width="301" height="451" title="设计师不在，只好网上扣图了 →_→" name="move_ele" data-left="350" data-top="140" data-xrange="25" data-yrange="25">
            <ul class="gallery plaxify" name="move_ele" data-left="670" data-top="5" data-xrange="2" data-yrange="2">
                <div class="nav" v-if="showNav">
                    <a href="javascript:void(0)" class="current"></a>
                    <a href="javascript:void(0)"></a>
                    <a href="javascript:void(0)"></a>
                </div>
            </ul>
            <img src="../assets/404/rubbish.png" class="rubbish_bg plaxify" width="143" height="96" title="翻一翻看有没有线索..." v-on:click="handleRubbishClick" name="move_ele" data-left="730" data-top="420" data-xrange="5" data-yrange="5">
        </div>
        <div class="h5_not_found">
            <img src="../assets/404/h5-404.png">
            <p class="not_found_txt">啊哦，你要找的页面不见啦！</p>
        </div>
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
            for (var i = 0; i < moveElements.length; i++) {
                var ele = moveElements[i],
                    l = parseInt(ele.getAttribute('data-left')),
                    t = parseInt(ele.getAttribute('data-top')),
                    xrange = parseInt(ele.getAttribute('data-xrange')) / 100,
                    yrange = parseInt(ele.getAttribute('data-yrange')) / 100,
                    moveL = l / 2 * xPercent * xrange,
                    moveT = t / 2 * yPercent * yrange;
                if (directionLeft) {
                    l = l - moveL;
                } else {
                    l = l + moveL;
                }
                if (directionTop) {
                    t = t - moveT;
                } else {
                    t = t + moveT;
                }
                ele.style.left = l + 'px';
                ele.style.top = t + 'px';
            }
        }

    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import '../../static/less/notFound.less';
</style>
