/// <reference path="references.ts"/>
/// <reference path="../../main/webapp/moviesController.ts"/>

import MoviesController = clientApp.ui.MoviesController;
describe('Movies controller', () => {
   var moviesController,
       getMoviesButton,
       moviesContainer,
       serviceMovies;

    beforeEach(() => {
        setUpFakeViewComponents();

        var moviesService = {
            getMovies(){
                return {
                    then(callback){
                        serviceMovies = [{ id: 1, name: 'The Matrix'}, { id: 2, name: 'Star Wars'}, { id: 3, name: 'Another movie' }];
                        callback(JSON.stringify(serviceMovies));
                    }
                }
            }
        }
        moviesController = new MoviesController();
        moviesController.init();
    });

    describe('When clicking the get movies button', () => {
       beforeEach(() => {
           getMoviesButton.click();
       });

        it('Should get movies', done => {
            setTimeout(() => {
                expect(moviesContainer.movies).toEqual(serviceMovies);
            }, 0);
        });
    });



    function setUpFakeViewComponents(){
        getMoviesButton = document.createElement('button');
        moviesContainer = document.createElement('container');

        document.getElementById = jasmine.createSpy('HTML Element').and.callFake(id => {
            if (id === 'getMoviesButton')
                return getMoviesButton;

            if (id === 'moviesContainer')
                return moviesContainer;

            return null;
        });
    }
});