import {UserService } from 'resources/services/user-service'
import {inject} from 'aurelia-framework';

@inject(UserService)
export class User {
    constructor(userService) {
        this.userService = userService;
    }
}
