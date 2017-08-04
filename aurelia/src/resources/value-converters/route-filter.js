export class RouteFilterValueConverter {
  toView(array) {
    let matches = array.filter((item) => {
      return item.config.nav == true
    })
    return matches
  }
}
