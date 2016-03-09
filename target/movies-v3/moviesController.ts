module clientApp.ui {
    export class MoviesController {
        /*
        private moviesService;
        constructor(moviesService){
            this.moviesService = moviesService;
        }
        */

        init(){
            var self = this;
            const moviesButton = document.getElementById('moviesButton');
            if (moviesButton) {
                moviesButton.addEventListener('click', event => {
                    alert("movies button clicked");
                    console.log("hej pressed");
                }, false);
            }
        }
        addTwoNumbers(a,b){
            return a+b;
        }

    }
}

