import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Test from '@/components/Test'
import NotFound from '@/components/NotFound'

Vue.use(Router)

export default new Router({
	routes: [{
		path: '/',
		name: 'Home',
		component: Home
	}, {
		path: '/test',
		name: 'Test',
		component: Test
	}, {
		path: '*',
		name: '404',
		component: NotFound
	}]
})