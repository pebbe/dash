import { UserService } from 'resources/services/user-service';
import { BindingSignaler } from 'aurelia-templating-resources';
import { Redirect } from 'aurelia-router';
import { EventAggregator } from 'aurelia-event-aggregator';
import { inject } from 'aurelia-framework';

@inject(UserService, BindingSignaler, EventAggregator)
export class App {

  constructor(userService, signaler, ea) {
    this.userService = userService;
    this.signaler = signaler;
    this.hrefEN = '../en/';
    this.hrefNL = '../nl/';
    this.text = '';

    ea.subscribe('router:navigation:complete', response => {
      let frag = response.instruction.fragment;
      this.hrefEN = '../en/#' + frag;
      this.hrefNL = '../nl/#' + frag;
      this.setBodyClass(response.instruction.config);
    });
  }

  configureRouter(config, router) {
    this.router = router;
    config.title = 'Aurelia | Dash';
    let step = new AuthorizeStep(this.userService);
    config.addAuthorizeStep(step);
    config.map([
            { route: ['', 'home'], name: 'home', moduleId: 'home', nav: true, title: '~(Home)~' },
            { route: 'tweets', name: 'tweets', moduleId: 'tweets', nav: true, title: '~(Tweets)~' },
            { route: 'twimages', name: 'twimages', moduleId: 'twimages', nav: true, title: '~(Twimages)~' },
      {
        route: 'links', name: 'links', moduleId: 'links', nav: true, title: '~(Links)~',
        settings: {
          bodyClass: 'white'
        }
      },
      {
        route: 'user', name: 'user', moduleId: 'user', nav: true, title: '~(User)~',
        settings: {
          bodyClass: 'white',
          auth: true
        }
      }
    ]);
  }

  login() {
    this.userService.save(this.text);
    this.update();
  }
  logout() {
    this.userService.save('');
    this.update();
    let config = this.router.currentInstruction.config;
    if (config.settings && config.settings.auth) {
      this.router.navigate('home');
    }
  }
  update() {
    this.text = '';
    this.signaler.signal('refresh');
  }

  setBodyClass(cfg) {
    document.body.removeAttribute('class');
    let bodyClass = cfg.settings && cfg.settings.bodyClass || '';
    if (bodyClass) {
      document.body.setAttribute('class', bodyClass);
    }
  }
}

class AuthorizeStep {
  constructor(userService) {
    this.userService = userService;
  }

  run(navigationInstruction, next) {
        // TODO: ik snap dit niet (gekopieerd van website)
    if (navigationInstruction.getAllInstructions().some(i => i.config.settings.auth)) {
      if (!this.userService.auth) {
        return next.cancel(new Redirect('home'));
      }
    }
    return next();
  }
}
