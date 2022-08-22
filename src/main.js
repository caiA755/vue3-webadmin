import 'normalize.css'
import './assets/css/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/theme-chalk/index.css'


import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/index"; // 导入路由对象     

import localeCache from '@/utils/cache'
import { toRaw } from '@vue/reactivity'
import mapMenusToRouter from '@/utils/map_menus.js'

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
//当前环境
console.log(process.env.VUE_APP_BASE_URL);
//解决动态路由刷新问题
// console.log(toRaw());
let menuinfocache = localStorage.getItem("menuinfo");
// console.log(menuinfocache);
if (menuinfocache != "undefined" && menuinfocache != null) {
    let menuinfo = toRaw(localeCache.getCache("menuinfo"));
    let menus = Array.from(toRaw(localeCache.getCache("menuinfo")));
    if (menus.length > 0) {
        let routes = mapMenusToRouter(menus);
        for (var i = 0; i < routes.length; i++) {
            router.options.routes.push(routes[i]);
            router.addRoute('main', routes[i]);
        }
    }
}
app.use(router);
app.mount('#app');