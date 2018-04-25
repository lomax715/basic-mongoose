const router = require('express').Router();
const Movie = require('../models/movie');
const errorHandler = require('../error-handler');

module.exports = router
    .post('/', (req, res) => {
        Movie.create(req.body)
            .then(movie => res.json(movie))
            .catch(err => errorHandler(err, req, res));
    });