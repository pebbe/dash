import { UserService } from './resources/services/user-service'
import { BindingSignaler } from 'aurelia-templating-resources'
import { Redirect } from 'aurelia-router'
import { inject } from 'aurelia-framework'

@inject(UserService, BindingSignaler)
export class App {

    constructor(userService, signaler) {
        this.userService = userService
        this.signaler = signaler
        this.text = ""
    }

    configureRouter(config, router) {
        this.router = router
        config.title = "Aurelia | Dash"
        var step = new AuthorizeStep(this.userService)
        config.addAuthorizeStep(step)
        var auth = this.userService.auth
        config.map([
            { route: ["", "home"], name: "home", moduleId: "home", nav: true, title: "~(Home)~" },
            { route: "page2", name: "page2", moduleId: "page-two", nav: true, title: "~(Page 2)~" },
            { route: "user", name: "user", moduleId: "user", nav: auth, title: "~(User)~", settings: { auth: true } }
        ])
    }

    login() {
        this.userService.save(this.text)
        this.update()
    }
    logout() {
        this.userService.save('')
        this.update()
        if (!this.router.currentInstruction.config.nav) {
            this.router.navigate('home')
        }
    }
    update() {
        this.text = ''
        var auth = this.userService.auth
        for (var i = 0; i < this.router.routes.length; i++) {
            var r = this.router.routes[i]
            if (r.settings && r.settings.auth) {
                r.nav = auth
            }
        }
        this.signaler.signal('refresh')
    }
}

class AuthorizeStep {
    constructor(userService) {
        this.userService = userService
    }

    run(navigationInstruction, next) {
        if (navigationInstruction.getAllInstructions().some(i => i.config.settings.auth)) {
            if (!this.userService.username) {
                return next.cancel(new Redirect('home'))
            }
        }

        return next();
    }
}
