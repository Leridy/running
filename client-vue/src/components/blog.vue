<template>
    <div class="container" v-if="info!=''">
        <nav-header></nav-header>
        <main id="main" class="main">
            <div class="main-inner">
                <div id="posts" class="posts-expand">
                    <article class="post post-type-normal post_animate">
                        <header class="post-header">
                            <h2 class="post-title">{{info.title}}</h2>
                            <div class="post-meta">
                                <span class="post-time">
                                <span class="post-meta-item-icon"> <i class="fa fa-calendar-o"></i>
                                </span>
                                <span class="post-meta-item-text">发表于</span>
                                <span title="Post created">{{info.create_time*1000|dateFormat('yyyy-mm-dd')}}</span>
                                </span>
                                <span class="post-category">
                                 <span class="post-meta-divider">|</span>
                                <span class="post-meta-item-icon"><i class="fa fa-folder-o"></i>
                                 </span>
                                <span class="post-meta-item-text">分类于</span>
                                <template v-for="(tag,i) in info.tags.split('|')">
                                    <a :href="'/categories/'+tag">
                                        <span>{{tag}}</span>
                                    </a>
                                </template>
                                </span>
                            </div>
                        </header>
                        <div class="post-body" v-html="info.content"></div>
                    </article>
                </div>
                <ul class="article_next_prev">
                    <li class="prev_article"><span><i class="fa fa-arrow-up"></i>上一篇</span><a href="/bboyfeiyu/article/details/48322023">Android动态换肤开源库Colorful发布</a></li>
                    <li class="next_article"><span><i class="fa fa-arrow-down"></i>下一篇</span><a href="/bboyfeiyu/article/details/50103471">面向对象六大原则</a></li>
                </ul>
            </div>
        </main>
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
    created() {
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
                    document.title = info.title;
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
@import '../../static/less/blog.less';
</style>
