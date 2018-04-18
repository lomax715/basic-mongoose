const { assert } = require('chai');
const Movie = require('../../lib/models/movie');

describe('Movie', () => {
    
    it('valid movie model', () => {
        const data = {
            title: 'The Dark Knight',
            director: 'Christopher Nolan',
            year: '2008',
            genre: ['Action', 'Comic'],
            cast: ['Christian Bale', 'Morgan Freeman', 'Heath Ledger', 'Aaron Eckhart']
        };
    
        const movie = new Movie(data);
    
        assert.deepEqual(movie.toJSON(), {
            _id: movie._id,
            ...data
        });

        assert.isUndefined(movie.validateSync());
    });

    const getValidationErrors = validation => {
        assert.isDefined(validation, 'no validation errors');
        return validation.errors;
    };

    it('title of movie is required field', () => {
        const movie = new Movie({});
        const errors = getValidationErrors(movie.validateSync());
        assert.equal(errors.title.kind, 'required');
    });

    it('director of movie is required field', () => {
        const movie = new Movie({});
        const errors = getValidationErrors(movie.validateSync());
        assert.equal(errors.director.kind, 'required');
    });

});