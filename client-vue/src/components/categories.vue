<template>
    <div class="container">
        <nav-header></nav-header>
        <main id="main" class="main">
            <div class="main-inner">
                <div id="posts" class="posts-expand">
                    <article class="post post-type-normal post_animate">
                        <header class="post-header">
                            <h2 class="post-title">categories</h2>
                        </header>
                        <div class="category-all-page">
                            <div class="category-all-title">
                                目前共计 27 个分类
                            </div>
                            <div class="category-all">
                                <ul class="category-list">
                                    <li class="category-list-item"><a class="category-list-link" href="/categories/Android/">Android</a><span class="category-list-count">4</span></li>
                                </ul>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </main>
        <my-footer></my-footer>
    </div>
</template>
<script>
import header from "./header";
import footer from "./footer";
export default {
    name: 'categories',
    components: {
        navHeader: header,
        myFooter: footer
    },
    created() {
        document.title = 'categories';
        this.loadData();
    },
    data() {
        return {
            info: ''
        }
    },
    methods: {
        loadData() {
            this.$http.get('article/get_detail', {
                params: {
                    id: this.$route.params.id
                }
            }).then(function(response) {
                return response.json();
            }).then(response => {
                if (response.res == 0) {
                    var info = response.data[0];
                    info.content = decodeURIComponent(info.content);
                    this.info = info;
                } else {
                    this.$toast('加载失败，请稍候重试', {
                        horizontalPosition: 'center'
                    });
                }
            }, response => {

            });
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import '../../static/less/categories.less';
</style>
