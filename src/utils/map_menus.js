// import { createRouter } from "vue-router";
// import { id } from "element-plus/es/locale";
// import { createRouter, createWebHistory } from "vue-router"

function mapMenusToRouter(userMenus) {
    const routes = [];
    // 默认加载所有的routes
    const allRoutes = [];
    //require.context()属于webpack的工具 可以加载整个文件夹
    const routerFiles = require.context("../router/main", true, /\.js/);
    routerFiles.keys().forEach((key) => {
        const route = require("../router/main" + key.split('.')[1])
        allRoutes.push(route.default);
    });
    // console.log("所有main下面的路由", allRoutes);
    //根据菜单获取需要加载的routes
    //type==3->url->route
    //type==1->children-->type===2
    function _recurseGetRoute(mainmenus) {
        for (let menu of mainmenus) {
            if (menu.type === 3 || menu.type == 2) {
                const route = allRoutes.find((route) => {
                    return route.path === menu.url;
                });
                if (route) {
                    routes.push(route);
                }
            }
            if (menu.type === 1) {
                _recurseGetRoute(menu.children);
            }
        }
    }

    _recurseGetRoute(userMenus);
    return routes;
}


export default mapMenusToRouter