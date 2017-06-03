<template>
    <div class="container">
        <nav-header></nav-header>
        <main id="main" class="main">
            <div class="main-inner">
                <div class="content-wrap">
                    <div id="content" class="content">
                        <section id="posts" class="posts-expand">
                            <template v-for="(item,index) in list">
                                <article class="post post-type-normal post_animate" :id="'post_animate_'+(index+1)">
                                    <header class="post-header">
                                        <a class="post-title-link" :href="'/blog/'+item.id">
                                            <h2 class="post-title" itemprop="name headline">{{item.title}}</h2>
                                        </a>
                                        <div class="post-meta">
                                            <span class="post-time">
                                                <span class="post-meta-item-icon"> <i class="fa fa-calendar-o"></i>
                                                </span>
                                            <span class="post-meta-item-text">发表于</span>
                                            <time title="Post created">{{item.create_time*1000|dateFormat('yyyy-mm-dd')}}</time>
                                            </span>
                                            <span class="post-category">
                                                <span class="post-meta-divider">|</span>
                                            <span class="post-meta-item-icon"> <i class="fa fa-folder-o"></i>
                                                </span>
                                            <span class="post-meta-item-text">分类于</span>
                                            <template v-for="(tag,i) in item.tags.split('|')">
                                                <a :href="'/categories/'+tag">
                                                    <span>{{tag}}</span>
                                                </a>
                                            </template>
                                            </span>
                                        </div>
                                    </header>
                                    <div class="post-body">
                                        {{item.desc}}
                                        <div class="post-button text-center">
                                            <a class="btn" :href="'/blog/'+item.id" rel="contents">阅读全文 »</a>
                                        </div>
                                    </div>
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
    name: 'home',
    components: {
        navHeader: header,
        myFooter: footer,
        pagination: pagination
    },
    data() {
        return {
            pages: 0,
            pageSize: 10,
            pageIndex: 1,
            list: []
        }
    },
    created() {
        document.title='首页';
        this.loadList();
    },
    methods: {
        changeIndex(index) {
            this.pageIndex = index;
            this.loadList;
        },
        loadList() {
            this.$http.get('article/get_list', {
                params: {
                    pageIndex: this.pageIndex,
                    pageSize: this.pageSize
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
@import '../../static/less/home.less';
</style>
