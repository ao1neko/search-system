import Vue from 'vue'
import App from './App'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import AsyncComputed from 'vue-async-computed'
import JwPagination from 'jw-vue-pagination';


Vue.component('jw-pagination', JwPagination);
Vue.use(AsyncComputed)
Vue.use(BootstrapVue)

Vue.config.productionTip = false


new Vue ({
  el: '#app',
  components: {App},
  template: '<App/>'
})