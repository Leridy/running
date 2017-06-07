// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import vueResource from "vue-resource";
import Toast from 'vue-easy-toast';
import dateFormat from "dateformat";

Vue.use(vueResource);
Vue.use(Toast);
Vue.filter('dateFormat', dateFormat);
Vue.config.productionTip = false;
Vue.http.options.root = process.env.NODE_ENV == 'development' ? '//127.0.0.1:8083' : 'https://api.runningdreamer.com';
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: {
		App
	}
})