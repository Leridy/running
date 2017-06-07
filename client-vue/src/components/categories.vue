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
                                目前共计{{total}}个分类
                            </div>
                            <div class="category-all">
                                <ul class="category-list">
                                    <template v-for="(item,index) in list">
                                        <li class="category-list-item"><a class="category-list-link" :href="'/categories/'+item.tag_name">{{item.tag_name}}</a><span class="category-list-count">{{item.total}}</span></li>
                                    </template>
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
        document.title = '分类';
        this.loadData();
    },
    data() {
        return {
            list: [],
            total: 0
        }
    },
    methods: {
        loadData() {
            this.$http.get('categories/get_article_tag_list', {
                params: {

                }
            }).then(function(response) {
                return response.json();
            }).then(response => {
                if (response.res == 0) {
                    this.total = response.count;
                    this.list = response.data;
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
