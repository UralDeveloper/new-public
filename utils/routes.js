export const getRoutes = (router) => {
    return router.getRoutes().map(route => ({
        path: route.path,
        name: route.name
    }));
}
