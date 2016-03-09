///<reference path="httpService.ts"/>
///<reference path="moviesController.ts"/>
var clientApp;
(function (clientApp) {
    var bundle;
    (function (bundle) {
        var HttpService = clientApp.services.HttpService;
        var MoviesController = clientApp.ui.MoviesController;
        var httpService = new HttpService();
        var moviesController = new MoviesController();
        moviesController.init();
    })(bundle = clientApp.bundle || (clientApp.bundle = {}));
})(clientApp || (clientApp = {}));
//# sourceMappingURL=bundle.js.map