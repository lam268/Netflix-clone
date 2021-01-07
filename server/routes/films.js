const express = require('express');
const router = express.Router();
const Film = require('./../models/Film');

router.get('/', (request, response) => {
    Film.find({}).exec(function (err, films) {
        if (err) {
            response.status(500).json({
                success: false,
                message: err.message
            })
        } else {
            response.status(200).json({
                success: true,
                data: films
            })
        }
    })
});

router.post('/new', async (request, response) => {
    const checkFilmexist = await Film.findOne({ title: request.body.title });
    if (checkFilmexist) return response.status(422).send('Film already exists');

    const film = new Film({
        title: request.body.title,
        imageURL: request.body.imageURL,
        content: request.body.content,
        gerne: request.body.gerne,
    })

    try {
        const newFilm = await film.save();
        response.send({
            newFilm,
            message: 'Register successful'
        });
    } catch (err) {
        response.status(400).send(err);
    }
});

router.post('/delete', async (request, response) => {
    const checkFilmexist = await Film.findOne({ title: request.body.title });
    if (!checkFilmexist) return response.status(422).send('Film not exists');

    try {
        Film.deleteOne({title: request.body.title});
        response.send({
            message: 'Delete successful'
        });
    } catch (err) {
        response.status(400).send(err);
    }
})

module.exports = router;