<template>
    <nav class="pagination" v-if="pages>0">
        <template v-if="pages<6">
            <template v-for="page in pages">
                <span class="page-number current" v-if="page==current">{{page}}</span>
                <a class="page-number" @click="changePageIndex(page)" v-else href="javascript:void(0)">{{page}}</a>
            </template>
        </template>
        <template v-else>
            <a class="extend prev" href="javascript:void(0)" v-if="current>
                1" @click="prevClick"> <i class="fa fa-angle-left"></i>
            </a>
            <template v-if="current<4">
                <template v-for="page in (current+1)">
                    <span class="page-number current" v-if="page==current">{{page}}</span>
                    <a class="page-number" @click="changePageIndex(page)" v-else href="javascript:void(0)">{{page}}</a>
                </template>
                <span class="space">…</span>
                <a class="page-number" @click="changePageIndex(pages)" href="javascript:void(0)">{{pages}}</a>
            </template>
            <template v-else>
                <template v-if="current>
                    (pages-3)">
                    <a class="page-number" @click="changePageIndex(1)" href="javascript:void(0)">1</a>
                    <span class="space">…</span>
                    <template v-for="page in [pages-3,pages-2,pages-1,pages]">
                        <span class="page-number current" v-if="page==current">{{page}}</span>
                        <a class="page-number" @click="changePageIndex(page)" v-else href="javascript:void(0)">{{page}}</a>
                    </template>
                </template>
                <template v-else>
                    <a class="page-number" @click="changePageIndex(1)" href="javascript:void(0)">1</a>
                    <span class="space">…</span>
                    <template v-for="page in [current-1,current,current+1]">
                        <span class="page-number current" v-if="page==current">{{page}}</span>
                        <a class="page-number" @click="changePageIndex(page)" v-else href="javascript:void(0)">{{page}}</a>
                    </template>
                    <span class="space">…</span>
                    <a class="page-number" @click="changePageIndex(pages)" href="javascript:void(0)">{{pages}}</a>
                </template>
            </template>
            <a class="extend next" href="javascript:void(0)" @click="nextClick" v-if="current<pages"> <i class="fa fa-angle-right"></i>
            </a>
        </template>
    </nav>
</template>
<script>
export default {
    name: 'pagination',
    props: ['pages', 'changeIndex'],
    data() {
        return {
            current: 1
        }
    },
    methods: {
        changePageIndex(index) {
            this.current = index;
            this.changeIndex(this.current);
        },
        prevClick() {
            this.current--;
            this.changeIndex(this.current);
        },
        nextClick() {
            this.current++;
            this.changeIndex(this.current);
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import '../../static/less/pagination.less';
</style>
