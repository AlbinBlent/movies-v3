/// <reference path="references.ts"/>
/// <reference path="../../main/webapp/moviesController.ts"/>
var MoviesController = clientApp.ui.MoviesController;
describe('Movies controller', function () {
    var moviesController, getMoviesButton, moviesContainer, serviceMovies;
    beforeEach(function () {
        setUpFakeViewComponents();
        var moviesService = {
            getMovies: function () {
                return {
                    then: function (callback) {
                        serviceMovies = [{ id: 1, name: 'The Matrix' }, { id: 2, name: 'Star Wars' }, { id: 3, name: 'Another movie' }];
                        callback(JSON.stringify(serviceMovies));
                    }
                };
            }
        };
        moviesController = new MoviesController();
        moviesController.init();
    });
    describe('When clicking the get movies button', function () {
        beforeEach(function () {
            getMoviesButton.click();
        });
        it('Should get movies', function (done) {
            setTimeout(function () {
                expect(moviesContainer.movies).toEqual(serviceMovies);
            }, 0);
        });
    });
    function setUpFakeViewComponents() {
        getMoviesButton = document.createElement('button');
        moviesContainer = document.createElement('container');
        document.getElementById = jasmine.createSpy('HTML Element').and.callFake(function (id) {
            if (id === 'getMoviesButton')
                return getMoviesButton;
            if (id === 'moviesContainer')
                return moviesContainer;
            return null;
        });
    }
});
//# sourceMappingURL=moviesControllerTests.js.map