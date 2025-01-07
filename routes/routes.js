const router = require('express').Router()
const upload = require('../config/cloudinary.config')

const miscController = require('../controllers/misc.controller')
const moviesController = require('../controllers/movies.controller')
const usersController = require('../controllers/users.controller')
const {isAuthenticated,isNotAuthenticated} = require('../middleware/auth.middleware')

router.get('/', miscController.getHome)
router.get('/movies/create', isAuthenticated, moviesController.create)
router.post('/movies/create', isAuthenticated,  upload.single('movie-cover-image'), moviesController.doCreate)
router.get('/movies', isAuthenticated, moviesController.displayMovies)
router.get('/movies/:id/edit',isAuthenticated, moviesController.edit)
router.post('/movies/:id/edit',isAuthenticated, upload.single('movie-cover-image'), moviesController.doEdit)

router.get('/register', isNotAuthenticated, usersController.register)
router.post('/register', isNotAuthenticated, upload.single('movie-cover-image'), usersController.doRegister)
router.get('/login', isNotAuthenticated, usersController.login)
router.post('/login', isNotAuthenticated, usersController.doLogin)
router.get('/profile', isAuthenticated, usersController.displayProfile)



module.exports = router