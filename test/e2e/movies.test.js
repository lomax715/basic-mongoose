const { assert } = require('chai');
const request = require('./request');
// const Movie = require('../../lib/models/movie');
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

    // let MovieB = {
    //     teamName: 'Star Wars',
    //     director: 'Darth Vader',
    //     cast: ['Harrison Ford']
    // };

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
});