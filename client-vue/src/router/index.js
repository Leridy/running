import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Blog from '@/components/Blog'
import Categories from '@/components/Categories'
import ArticleListByCategory from '@/components/ArticleListByCategory'
import NotFound from '@/components/NotFound'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [{
		path: '/',
		name: 'Home',
		component: Home
	}, {
		path: '/blog/:id',
		name: 'Blog',
		component: Blog,
		alias: '/blog.html?id=:id'
	}, {
		path: '/categories',
		name: 'Categories',
		component: Categories
	}, {
		path: '/categories/:tagName',
		name: 'ArticleListByCategory',
		component: ArticleListByCategory
	}, {
		path: '*',
		name: '404',
		component: NotFound
	}]
})