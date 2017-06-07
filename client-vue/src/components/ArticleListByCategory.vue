<template>
    <div class="container">
        <nav-header></nav-header>
        <main id="main" class="main">
            <div class="main-inner">
                <div class="content-wrap">
                    <div id="content" class="content">
                        <section id="posts" class="posts-collapse">
                            <div class="collection-title">
                                <h2>
                                    {{tagName}}
                                    <small>分类</small>
                                </h2>
                            </div>
                            <template v-for="(item,index) in list">
                                <article class="post post-type-normal post_animate" :id="'post_animate_'+(index+1)">
                                    <header class="post-header">
                                        <h2 class="post-title">
                                        <a class="post-title-link" :href="'/blog/'+item.id">
                                            <span>{{item.title}}</span>
                                        </a>
                                    </h2>
                                        <div class="post-meta">
                                            <time class="post-time">{{item.create_time*1000|dateFormat('yyyy-mm-dd')}}</time>
                                        </div>
                                    </header>
                                </article>
                            </template>
                        </section>
                        <pagination :pages="pages" :changeIndex="changeIndex"></pagination>
                    </div>
                </div>
            </div>
        </main>
        <my-footer></my-footer>
    </div>
</template>
<script>
import header from "./header";
import footer from "./footer";
import pagination from "./pagination";
export default {
    name: 'ArticleListByCategory',
    components: {
        navHeader: header,
        myFooter: footer,
        pagination: pagination
    },
    created() {
        document.title = this.tagName;
        this.loadData();
    },
    data() {
        return {
            pages: 0,
            pageSize: 10,
            pageIndex: 1,
            list: [],
            tagName: this.$route.params.tagName
        }
    },
    methods: {
        changeIndex(index) {
            this.pageIndex = index;
            this.loadData();
        },
        loadData() {
            this.$http.get('categories/get_article_list_by_tagname', {
                params: {
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize,
                    tagName: this.tagName
                }
            }).then(function(response) {
                return response.json();
            }).then(response => {
                if (response.res == 0) {
                    if (this.pageIndex == 1) {
                        this.pages = Math.ceil(response.count / this.pageSize);
                    }
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
@import '../../static/less/articleListByCategory.less';
</style>
