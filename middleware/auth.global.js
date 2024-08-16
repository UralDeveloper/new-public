export default defineNuxtRouteMiddleware((to) => {
  const userStore = useUserStore()

  if (process.client && !userStore.isAuth && to.path.includes('/lk')) {
    return navigateTo('/login')
  }

  nextTick(() => {
    if (process.client) {
      document.body.classList.remove('overflow-hidden')
    }
  })
})
