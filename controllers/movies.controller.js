const Movie = require('../models/Movie.model');

module.exports.create = (req, res, next) => {
    res.render('movie-create')
};

module.exports.doCreate = (req, res, next) => {
 console.log("entered in doCreate***")
    const { title, description } = req.body;
   
    Movie.create({ title, description, imageUrl: req.file.path })
      .then(newlyCreatedMovieFromDB => {
        res.redirect('/movies');
      })
      .catch(error => console.log(`Error while creating a new movie: ${error}`));
  }

  module.exports.displayMovies = (req, res, next) => {
    Movie.find()
      .then(moviesFromDB => {
    
        res.render('movies-list', { movies: moviesFromDB });
      })
      .catch(err => console.log(`Error while getting the movies from the DB: ${err}`));
  }

  module.exports.edit = (req, res, next) => {
    const { id } = req.params;
   
    Movie.findById(id)
      .then(movieToEdit => res.render('movie-edit', movieToEdit))
      .catch(error => console.log(`Error while getting a single movie for edit: ${error}`));
  }

  module.exports.doEdit = (req, res, next) => {
    const { id } = req.params;
    const { title, description, existingImage } = req.body;
   
    let imageUrl;
    if (req.file) {
      imageUrl = req.file.path;
    } else {
      imageUrl = existingImage;
    }
   
    Movie.findByIdAndUpdate(id, { title, description, imageUrl }, { new: true })
      .then(() => res.redirect(`/movies`))
      .catch(error => console.log(`Error while updating a single movie: ${error}`));
  }