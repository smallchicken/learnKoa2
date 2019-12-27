const moogoose = require('mongoose')
const Moive = moogoose.model('Movie')


export const getAllmovies = async (type, year) => {
  let query = {}

  if (type) {
    query.movieTypes = {
      $in: [type]
    }
  }

  if (year) {
    query.year = year
  }

  const movies = await Moive.find(query)

  return movies
}

export const getMovieDetail = async (id) => {
  const movie = await Moive.findOne({_id: id})

  return movie
}

export const getRelativeMovies = async (movie) => {
  const movies = await Moive.findOne({
    movieTypes: {
      $in: movie.movieTypes
    }
  })

  return movies
}

export const findAndRemove = async (id) => {
  const movie = await Moive.findOne({_id: id})

  if (movie) {
    await movie.remove()
  }
}