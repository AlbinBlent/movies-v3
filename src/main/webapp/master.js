var HttpService = (function () {
    function HttpService() {
    }
    HttpService.prototype.get = function (url) {
        return this.ajax('GET', url);
    };
    HttpService.prototype.post = function (url, args) {
        return this.ajax('POST', url, args);
    };
    HttpService.prototype.put = function (url, args) {
        return this.ajax('PUT', url);
    };
    HttpService.prototype.delete = function (url) {
        return this.ajax('DELETE', url);
    };
    HttpService.prototype.ajax = function (method, url, args) {
        if (args === void 0) { args = undefined; }
        var promise = new Promise(function (resolve, reject) {
            var client = new XMLHttpRequest();
            client.open(method, url);
            client.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            client.send(args);
            client.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resolve(this.response);
                }
                else {
                    reject(this.statusText);
                }
            };
            client.onerror = function () {
                reject(this.statusText);
            };
        });
        return promise;
    };
    return HttpService;
})();
var Promise;
var MoviesController = (function () {
    function MoviesController(moviesService) {
        this.moviesService = moviesService;
    }
    MoviesController.prototype.init = function () {
        var self = this;
        var moviesButton = document.getElementById('moviesButton');
        if (moviesButton) {
            moviesButton.addEventListener('click', function (event) {
                self.moviesService.getMovies().then(self.onReceivedMovies);
            }, false);
        }
        var postMoviesButton = document.getElementById('postMoviesButton');
        if (postMoviesButton) {
            postMoviesButton.addEventListener('click', function (event) {
                var movie = document.getElementById('postMoviesInput');
                self.moviesService.createMovie(JSON.stringify({ name: movie.value }));
            }, false);
        }
    };
    MoviesController.prototype.onReceivedMovies = function (data) {
        var movieHolder = document.getElementById('movieHolder');
        if (movieHolder) {
            var moviesTemplate = '<ul class="movies-list">' +
                JSON.parse(data)
                    .map(toMovieTemplate) +
                '</ul>';
            movieHolder.innerHTML = moviesTemplate;
        }
        function toMovieTemplate(movie) {
            return '<li><span>' + movie.name + ' </span></li>';
        }
    };
    return MoviesController;
})();
var MoviesService = (function () {
    function MoviesService(httpService) {
        this.httpService = httpService;
        this.baseUrl = 'http://localhost:8080/movies-v3/rest/movies/';
    }
    MoviesService.prototype.getMovies = function () {
        return this.httpService.get(this.baseUrl);
    };
    MoviesService.prototype.getMovie = function (id) {
        return this.httpService.get(this.baseUrl + id);
    };
    MoviesService.prototype.createMovie = function (movie) {
        return this.httpService.post(this.baseUrl, movie);
    };
    return MoviesService;
})();
var httpService = new HttpService();
var moviesService = new MoviesService(httpService);
var moviesController = new MoviesController(moviesService);
moviesController.init();
//# sourceMappingURL=master.js.map