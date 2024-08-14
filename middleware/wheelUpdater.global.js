export default defineNuxtRouteMiddleware((to, from) => {
    if (process.client && to.path === '/lk/wheel' && from.path !== '/lk/wheel') {
        nextTick(() => {
            window.location.assign(to.fullPath);
        });
    } else {
        return true;
    }
});
