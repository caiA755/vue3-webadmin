function pathMapToMenu(userMenus, currentPath) {
    for (let menu of userMenus) {
        if (menu.type === 1) {
            if (menu.children == null || menu.children.length < 1) {
                menu.children = [];
            }
            const findMenu = pathMapToMenu(menu.children, currentPath)
            if (findMenu) {
                return findMenu;
            }
        } else if ((menu.type === 2 || menu.type === 3) && menu.url === currentPath) {
            return menu;
        }
    }
};
export default pathMapToMenu