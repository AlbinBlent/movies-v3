///<reference path="httpService.ts"/>
///<reference path="moviesController.ts"/>
module clientApp.bundle {
    import HttpService = clientApp.services.HttpService;
    import MoviesController = clientApp.ui.MoviesController;
    let httpService = new HttpService()
    let moviesController = new MoviesController()
    moviesController.init();
}

