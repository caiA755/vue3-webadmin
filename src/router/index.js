import { createRouter, createWebHistory, createWebHashHistory } from "vue-router"
import { RouteRecordRaw } from 'vue-router'

import LoginPlane from "../views/login/cpns/login-panel";
import LoginName from "../views/login/login-name";
import MainName from '@/views/main/main-name'
import HelloWorld from '@/components/HelloWorld.vue'
import GoodsPanel from "@/views/main/system/goodspanel/goodspanel";
const technology = () =>
    import ('@/views/main/system/technology/technology.vue')

let router = createRouter({
    history: createWebHashHistory(),
    routes: [ // 路由列表，里面的每一个成员都是一个url地址和组件的映射关系
        {
            path: "/",
            component: LoginName,
            // component: GoodsPanel
        },
        {
            name: "main",
            path: "/main",
            component: MainName,
            children: [{
                    path: '/main/system/technology',
                    name: 'technology',
                    component: technology,
                }]
                // redirect: "/main/system/technology"
        },
        {
            name: "heallo",
            path: "/heallo",
            component: HelloWorld,
        }
    ],
    children: [{
        path: "wu",
        name: "wu",
        component: LoginPlane
    }]
});
router.beforeEach((to, form) => {

})
export default router