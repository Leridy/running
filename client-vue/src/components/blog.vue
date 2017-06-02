<template>
    <div class="container">
        <nav-header></nav-header>
        <main id="main" class="main">
            <div class="main-inner">
                <div id="posts" class="posts-expand">
                    <article class="post post-type-normal">
                        <header class="post-header">
                            <h2 class="post-title" itemprop="name headline">Android反编译(逆向)教程</h2>
                            <div class="post-meta">
                                <span class="post-time">
                  <span class="post-meta-item-icon"> <i class="fa fa-calendar-o"></i>
                  </span>
                                <span class="post-meta-item-text">发表于</span>
                                <time title="Post created" itemprop="dateCreated datePublished" datetime="2016-03-20T18:16:21+08:00">2016-03-20</time>
                                </span>
                                <span class="post-category">
                                 <span class="post-meta-divider">|</span>
                                <span class="post-meta-item-icon"><i class="fa fa-folder-o"></i>
                                 </span>
                                <span class="post-meta-item-text">分类于</span>
                                <a href="/categories/Android/">
                                    <span>Android</span>
                                </a>
                                </span>
                            </div>
                        </header>
                        <div class="post-body">这里显示详细内容</div>
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
    name: 'blog',
    components: {
        navHeader: header,
        myFooter: footer
    },
    data() {
        return {}
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import '../../static/less/blog.less';
</style>
