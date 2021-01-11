import FilmService from '../models/Films'

function FilmsControllers() {
    var self = this;

    var Films = new FilmService();

    self.takeFilms = function() {
        Films.getFilms()
    }

    return self;
};