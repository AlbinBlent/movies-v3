var clientApp;
(function (clientApp) {
    var ui;
    (function (ui) {
        var MoviesController = (function () {
            function MoviesController() {
            }
            /*
            private moviesService;
            constructor(moviesService){
                this.moviesService = moviesService;
            }
            */
            MoviesController.prototype.init = function () {
                var self = this;
                var moviesButton = document.getElementById('moviesButton');
                if (moviesButton) {
                    moviesButton.addEventListener('click', function (event) {
                        alert("movies button clicked");
                        console.log("hej pressed");
                    }, false);
                }
            };
            MoviesController.prototype.addTwoNumbers = function (a, b) {
                return a + b;
            };
            return MoviesController;
        })();
        ui.MoviesController = MoviesController;
    })(ui = clientApp.ui || (clientApp.ui = {}));
})(clientApp || (clientApp = {}));
//# sourceMappingURL=moviesController.js.map