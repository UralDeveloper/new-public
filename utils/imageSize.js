export default (src, type) => {
  if(!src) return '/images/default-load.gif';
  if (type) {
    const str = src ? src.split('.') : []

    let mime = str.pop()
    if (['jpeg', 'jpg'].includes(mime)) {
      mime = 'jpg'
    }

    return str.join('.') + `-${type}.` + mime
  }

  return src
}