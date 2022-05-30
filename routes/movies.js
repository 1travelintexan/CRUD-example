const express = require('express')
const Movie = require('../models/Movie')
const router = express.Router()

router.get('/', async (req, res) => {
  const movies = await Movie.find()

  res.render('movies', { movies })
})

router.get('/create', async (req, res) => {
  res.render('newMovie')
})

router.post('/create', async (req, res) => {
  const newMovie = await Movie.create(req.body)
  res.redirect(`/movies/${newMovie.id}`)
})

router.get('/:movieId', async (req, res) => {
  const movie = await Movie.findById(req.params.movieId)
  const data = { movie }
  res.render('oneMovie', data)
})

router.get('/:movieId/edit', async (req, res) => {
  const movie = await Movie.findById(req.params.movieId)
  res.render('updateMovie', { movie })
})

router.post('/:movieId/edit', async (req, res) => {
  const { movieId } = req.params
  await Movie.findByIdAndUpdate(movieId, req.body)
  res.redirect(`/movies/${movieId}`)
})

router.post('/:movieId/delete', async (req, res) => {
  await Movie.findByIdAndDelete(req.params.movieId)
  res.redirect('/movies')
})

module.exports = router
