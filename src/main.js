import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import { Network } from "vue-vis-network";
Vue.component('network', Network);

import VueSocialSharing from 'vue-social-sharing'
Vue.use(VueSocialSharing);

// import { Network } from "vue-vis-network";
// Vue.component('network', Network);
// // import "vis-network/dist/vis-network.esm.min.js";
// import "vis-network/dist/dist/vis-network.min.css";

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'  // Install BootstrapVue

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import "bootswatch/dist/superhero/bootstrap.min.css";



// import VueFab from 'vue-float-action-button'
// Vue.use(VueFab, /* {
//   ----------------------
//   // opitons 可选iconfont图标或MaterialIcons
//   iconType: 'MaterialDesign'
//   // iconType: 'iconfont'
// } */)
//
// import VueFontAwesomePicker from "vfa-picker";
//
// Vue.use(VueFontAwesomePicker);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
