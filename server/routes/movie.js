const Router = require('koa-router');
const router = new Router()
const { controller, get, post, put } = require('../lib/decorator')
const { 
  getAllmovies, 
  getMovieDetail, 
  getRelativeMovies 
} = require('../service/movie')

@controller('/api/v0/movies')
export class movieController {
  @get('/')
  async getMovies (ctx, next) {
    const { type, year } = ctx.query
    const movies = await getAllmovies(type, year)
  
    ctx.body = {
      success: true,
      data: movies
    }
  }

  @get('/:id')
  async getMovieDetail (ctx, next) {
    const id = ctx.params.id
    const movie = await getMovieDetail(id);
    const relativeMovies = await getRelativeMovies(movie)
  
    ctx.body = {
      data: {
        movie,
        relativeMovies
      },
      success: true
    }
  }
}

module.exports = router;