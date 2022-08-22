import pathMapToMenu from "./path_menus";

function pathMapBreadcrumbs(userMenus, currentPath) {
    let breadcrumbs = [];
    for (let menu of userMenus) {
        if (menu.type === 1) {
            let menuname = menu.name,
                menuurl = menu.url;
            if (menu.children == null || menu.children.length < 1) {
                menu.children = [];
            }
            const findMenu = pathMapToMenu(menu.children, currentPath)
            if (findMenu) {
                breadcrumbs.push({ name: menuname, path: menu.url })
                breadcrumbs.push({ name: findMenu.name, path: findMenu.url });
            }
        } else if ((menu.type === 2 || menu.type === 3) && menu.url === currentPath) {
            breadcrumbs.push({ name: menu.name, path: menu.url })
        }
    }
    console.log("面包写", breadcrumbs);
    return breadcrumbs;
};
export default pathMapBreadcrumbs