export function useClickOutside (el, cb) {
  if (!el) return

  let listener = (e) => {
    if (e.target == el.value || e.composedPath().includes(el.value)) {
      return
    }

    if (typeof cb == 'function') {
      cb()
    }
  }

  onMounted(() => {
    document.addEventListener('click', listener)
  })
  onBeforeUnmount(() => {
    document.removeEventListener('click', listener)
  })

  return {
    listener
  }
}