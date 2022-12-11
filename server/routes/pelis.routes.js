const { getMovies, getOneMovie, createMovie, updateMovie, deleteMovie } = require("../controllers/pelis.controllers");
const { createReview, getReviews, deleteReview, updateReview, getOneReview } = require("../controllers/review.controllers");


module.exports = (app) =>{

    app.get('/api/movies', getMovies);
    app.get('/api/movies/:id', getOneMovie);
    app.post('/api/movies/', createMovie);
    app.put('/api/movies/:id',updateMovie);
    app.delete('/api/movies/:id', deleteMovie);

    app.post('/api/review/', createReview);
    app.get('/api/reviews/:idMovie', getReviews);
    app.get('/api/review/:id', getOneReview);
    app.put('/api/review/:id',updateReview);
    app.delete('/api/review/:id', deleteReview);
};