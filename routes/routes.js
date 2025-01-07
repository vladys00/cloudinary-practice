const router = require('express').Router()
const upload = require('../config/cloudinary.config')

const miscController = require('../controllers/misc.controller')
const moviesController = require('../controllers/movies.controller')

router.get('/', miscController.getHome)
router.get('/movies/create', moviesController.create)
router.post('/movies/create', upload.single('movie-cover-image'), moviesController.doCreate)
router.get('/movies', moviesController.displayMovies)
router.get('/movies/:id/edit', moviesController.edit)
router.post('/movies/:id/edit', upload.single('movie-cover-image'), moviesController.doEdit)
module.exports = router