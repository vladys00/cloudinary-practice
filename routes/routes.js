const router = require('express').Router()

const miscController = require('../controllers/misc.controller')
const moviesController = require('../controllers/movies.controller')

router.get('/', miscController.getHome)
router.get('/movies/create', moviesController.create)

module.exports = router