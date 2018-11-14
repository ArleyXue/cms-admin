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

import 'viewerjs/dist/viewer.css' // 图片预览插件
import Viewer from 'v-viewer'
Vue.use(Viewer);

import '@/permission' // permission control

Vue.use(ElementUI, {
    size: Cookies.get('size') || 'medium', // set element-ui default size
})
 // 全局自定义组件
Vue.config.productionTip = false;
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
