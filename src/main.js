import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Cookies from 'js-cookie'

//  reset CSS
import "normalize.css/normalize.css";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import '@/styles/index.styl' // global css

import '@/permission' // permission control

Vue.use(ElementUI, {
    size: Cookies.get('size') || 'medium', // set element-ui default size
})
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
