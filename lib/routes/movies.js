const router = require('express').Router();
const Movie = require('../models/movie');
const errorHandler = require('../error-handler');

module.exports = router
    .post('/', (req, res) => {
        Movie.create(req.body)
            .then(movie => res.json(movie))
            .catch(err => errorHandler(err, req, res));
    })

    .get('/:id', (req, res) => {
        const { id } = req.params;

        Movie.findById(id)
            .lean()
            .then(movie => {
                if(!movie){
                    errorHandler({
                        status: 404,
                        error: `Movie with id ${id} does not exist`
                    }, req, res);
                }
                else res.json(movie);
            })
            .catch(err => errorHandler(err, req, res));
    });