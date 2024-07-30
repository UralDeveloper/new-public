export default (name, offset = 0) => {
  let el
  if (name) {
    el = document.getElementById(name)
  }

  if ('scrollBehavior' in document.documentElement.style) {
    window.scrollTo({ top: (el?.offsetTop || 0) + offset, behavior: 'smooth' })
  } else {
    window.scrollTo(0, (el?.offsetTop || 0) + offset)
  }
}