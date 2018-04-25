const { assert } = require('chai');
const request = require('./request');
const Movie = require('../../lib/models/movie');
const { dropCollection } = require('./db');

describe('movie api', () => {
    before(() => dropCollection('movies'));

    let MovieA = {
        title: 'Anchorman',
        director: 'Ron B',
        year: '2001',
        genre: ['Comedy'],
        cast: ['Will F']
    };

    let MovieB = {
        title: 'Star Wars',
        director: 'Darth Vader',
        year: '1980',
        genre: ['Action'],
        cast: ['Harrison Ford']
    };

    it('saves and gets a movie', () => {
        return request.post('/movies')
            .send(MovieA)
            .then(({ body }) => {
                const { _id, __v } = body;
                assert.ok(_id);
                assert.equal(__v, 0);
                assert.deepEqual(body, {
                    _id, __v,
                    ...MovieA
                });
                MovieA = body;
            });
    });

    const roundTrip = doc => JSON.parse(JSON.stringify(doc.toJSON()));

    it('gets movie by id', () => {
        return Movie.create(MovieB).then(roundTrip)
            .then(saved => {
                MovieB = saved;
                return request.get(`/movies/${MovieB._id}`);
            })
            .then(({ body }) => {
                assert.deepEqual(body, MovieB);
            });
    });

    it('update a movie', () => {
        MovieB.director = 'Luke Skywalker';

        return request.put(`/movies/${MovieB._id}`)
            .send(MovieB)
            .then(({ body }) => {
                assert.deepEqual(body, MovieB);
                return Movie.findById(MovieB._id).then(roundTrip);
            })
            .then(updated => {
                assert.deepEqual(updated, MovieB);
            });
    });

    const getFields = ({ _id, title, director }) => ({ _id, title, director });

    it('gets all teams but only _id, title, and director', () => {
        return request.get('/movies')
            .then(({ body }) => {
                assert.deepEqual(body, [MovieA, MovieB].map(getFields));
            });
    });

    it('queries a movie', () => {
        return request.get('/movies?genre=Action')
            .then(({ body }) => {
                assert.deepEqual(body, [MovieB].map(getFields));
            });
    });
});