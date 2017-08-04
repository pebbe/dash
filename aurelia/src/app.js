import { UserService } from 'resources/services/user-service'
import { BindingSignaler } from 'aurelia-templating-resources'
import { Redirect } from 'aurelia-router'
import { EventAggregator } from 'aurelia-event-aggregator'
import { inject } from 'aurelia-framework'

@inject(UserService, BindingSignaler, EventAggregator)
export class App {

    constructor(userService, signaler, ea) {
        this.userService = userService
        this.signaler = signaler
        this.hrefEN = "../en/"
        this.hrefNL = "../nl/"
        this.text = ""

        ea.subscribe('router:navigation:complete', response => {
            let frag = response.instruction.fragment
            this.hrefEN = "../en/#" + frag
            this.hrefNL = "../nl/#" + frag
        })
    }

    configureRouter(config, router) {
        this.router = router
        config.title = "Aurelia | Dash"
        var step = new AuthorizeStep(this.userService)
        config.addAuthorizeStep(step)
        config.map([
            { route: ["", "home"], name: "home", moduleId: "home", nav: true, title: "~(Home)~" },
            { route: "page2", name: "page2", moduleId: "page-two", nav: true, title: "~(Page 2)~" },
            { route: "user", name: "user", moduleId: "user", nav: true, title: "~(User)~", settings: { auth: true } }
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
        this.signaler.signal('refresh')
    }
}

class AuthorizeStep {
    constructor(userService) {
        this.userService = userService
    }

    run(navigationInstruction, next) {
        if (navigationInstruction.getAllInstructions().some(i => i.config.settings.auth)) {
            if (!this.userService.auth()) {
                return next.cancel(new Redirect('home'))
            }
        }

        return next();
    }
}
