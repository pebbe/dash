import { UserService } from 'resources/services/user-service'
import { inject } from 'aurelia-framework'

@inject(UserService)
export class AuthFilterValueConverter {

  constructor(userService, signaler, ea) {
    this.userService = userService
  }

  toView(array) {
    let matches = array.filter((item) => {
      if (item.settings && item.settings.auth) {
        return this.userService.auth()
      }
      return true
    })
    return matches
  }
}
