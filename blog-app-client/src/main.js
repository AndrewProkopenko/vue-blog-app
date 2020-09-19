import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios' 
// import VeeValidate from 'vee-validate'
import moment from 'moment'
 
import styles from 'bootstrap/dist/css/bootstrap.min.css'
import customStyle from '@/assets/style.css'
import scriptsBS from 'bootstrap/dist/js/bootstrap.min.js'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faCogs, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
Vue.component('font-awesome-icon', FontAwesomeIcon)
library.add(faHome, faCogs, faSignOutAlt)

window.axios = axios
axios.defaults.baseURL = 'http://localhost:3333/'

Vue.config.productionTip = false

Vue.use(styles)
Vue.use(customStyle)
Vue.use(scriptsBS) 



// Vue.use(VeeValidate)

Vue.filter('timeAgo', date => moment(date).fromNow() )
Vue.filter('joined', date => moment(date).format('MMMM YYYY') )
Vue.filter('dob', date => moment(date).fromNow('MMMM Do YYYY') )

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
