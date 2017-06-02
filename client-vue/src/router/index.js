import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Blog from '@/components/blog'
import NotFound from '@/components/NotFound'

Vue.use(Router)

export default new Router({
	routes: [{
		path: '/',
		name: 'Home',
		component: Home
	}, {
		path: '/blog',
		name: 'blog',
		component: Blog
	}, {
		path: '*',
		name: '404',
		component: NotFound
	}]
})