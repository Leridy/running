<template>
    <div class="container">
        <nav-header></nav-header>
        <main id="main" class="main">
            <div class="main-inner">
                <div class="content-wrap">
                    <div id="content" class="content">
                        <section id="posts" class="posts-expand">
                            <article class="post post-type-normal">
                                <header class="post-header">
                                    <a class="post-title-link" href="/blog/2017/03/elasticsearch-java-client.html">
                                        <h2 class="post-title" itemprop="name headline">ElasticSearch Java客户端介绍</h2>
                                    </a>
                                    <div class="post-meta">
                                        <span class="post-time">            
                                         <span class="post-meta-item-icon">
                                            <i class="fa fa-calendar-o"></i>
                                           </span>
                                        <span class="post-meta-item-text">发表于</span>
                                        <time title="Post created">
                                            2017-03-10
                                        </time>
                                        </span>
                                        <span class="post-category">            
                                        <span class="post-meta-divider">|</span>
                                        <span class="post-meta-item-icon">
                                          <i class="fa fa-folder-o"></i>
                                        </span>
                                        <span class="post-meta-item-text">分类于</span>
                                        <a href="/categories/Java/" itemprop="url" rel="index">
                                            Java
                                        </a>
                                        </span>
                                    </div>
                                </header>
                                <div class="post-body" itemprop="articleBody">
                                    这里显示的简述
                                    <div class="post-button text-center">
                                        <a class="btn" href="/blog/2017/03/elasticsearch-java-client.html#more" rel="contents">
                                         阅读全文 »
                                          </a>
                                    </div>
                                </div>
                            </article>
                        </section>
                        <nav class="pagination">
                            <span class="page-number current">1</span><a class="page-number" href="/page/2/">2</a><span class="space">…</span><a class="page-number" href="/page/8/">8</a><a class="extend next" rel="next" href="/page/2/"><i class="fa fa-angle-right"></i></a>
                        </nav>
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
export default {
    name: 'home',
    components: {
        navHeader: header,
        myFooter: footer
    },
    data() {
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import '../../static/less/home.less';
</style>
