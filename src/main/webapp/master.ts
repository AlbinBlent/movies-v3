class HttpService {
    get(url) {
        return this.ajax('GET', url);
    }

    post(url, args){
        return this.ajax('POST', url, args);
    }

    put(url, args){
        return this.ajax('PUT', url);
    }

    delete(url){
        return this.ajax('DELETE', url);
    }

    private ajax(method, url, args = undefined){
        var promise = new Promise((resolve, reject) => {

            var client = new XMLHttpRequest();

            client.open(method, url);
            client.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            client.send(args);

            client.onload = function () {
                if (this.status >= 200 && this.status < 300){
                    resolve(this.response);
                } else {
                    reject(this.statusText);
                }
            };
            client.onerror = function (){
                reject(this.statusText);
            }
        });
        return promise;
    }
}

var Promise: any;

class MoviesController {

     private moviesService;
     constructor(moviesService){
         this.moviesService = moviesService;
     }

    init(){
        var self = this;
        const moviesButton = document.getElementById('moviesButton');
        if (moviesButton) {
            moviesButton.addEventListener('click', event => {
                self.moviesService.getMovies().then(self.onReceivedMovies);
            }, false);
        }

        const postMoviesButton = document.getElementById('postMoviesButton');
        if (postMoviesButton){
            postMoviesButton.addEventListener('click', event => {
                var movie = document.getElementById('postMoviesInput');
                self.moviesService.createMovie(JSON.stringify({ name: movie.value}));
            }, false);
        }
    }

    private onReceivedMovies(data){
        const movieHolder = document.getElementById('movieHolder');
        if (movieHolder) {
            let moviesTemplate = '<ul class="movies-list">' +
                JSON.parse(data)
                    .map(toMovieTemplate) +
                '</ul>';

            movieHolder.innerHTML = moviesTemplate;
        }

        function toMovieTemplate(movie) {
            return '<li><span>' + movie.name +' </span></li>';
        }
    }
}

class MoviesService {
    private httpService;
    private baseUrl;

    constructor(httpService) {
        this.httpService = httpService;
        this.baseUrl = 'http://localhost:8080/movies-v3/rest/movies/'
    }

    getMovies(){
        return this.httpService.get(this.baseUrl);
    }

    getMovie(id){
        return this.httpService.get(this.baseUrl + id);
    }

    createMovie(movie){
        return this.httpService.post(this.baseUrl, movie);
    }
}

let httpService = new HttpService();
let moviesService = new MoviesService(httpService);
let moviesController = new MoviesController(moviesService);
moviesController.init();