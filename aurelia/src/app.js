export class App {
    configureRouter(config, router) {
        this.router = router;
        config.title = "Aurelia";
        // TODO: waarvoor dienen 'name' en 'nav'?
        config.map([
            { route: ["", "home"], name: "home", moduleId: "home", nav: true, title: "Home" },
            { route: "page2", name: "page2", moduleId: "page-two", nav: true, title: "Page 2" }
        ]);
    }
}
