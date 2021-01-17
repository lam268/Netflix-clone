import axios from 'axios'
import Film from '../models/Films'

function FilmsControllers() {
    var self = this;

    self.getFilms = () => {
        var Films = new Array(Film);
        axios.get('http://localhost:9000/api/film/')
            .then(data => {
                data.data.data.forEach(function (film) {
                    const temp = {
                        title: film.title,
                        content: film.content,
                        imageURL: film.imageURL
                    };
                    Films.push(temp);
                });
                Films.shift();
            })
            .catch(err => {
                console.log(err);
            });
        return Films;
    }


    return self;
};

export default FilmsControllers;