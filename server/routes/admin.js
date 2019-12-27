const Router = require('koa-router');
const router = new Router()
const { 
  controller,
  get, 
  post, 
  del, 
  auth,
  admin,
  required
} = require('../lib/decorator')
const { 
  checkPassword 
} = require('../service/user')
const {
  getAllmovies,
  findAndRemove
} = require('../service/movie')

@controller('/admin')
export class adminController {
  @get('/movie/list')
  @auth
  @admin('admin')
  async getMovieList (ctx, next) {
    const movies = await getAllmovies()
  
    ctx.body = {
      success: true,
      data: movies
    }
  }

  @post('/login')
  @required({
    body: ['email', 'password']
  })
  async login (ctx, next) {
    const { email, password } = ctx.request.body
    const matchData = await checkPassword(email, password)

    if (!matchData.user) {
      return (ctx.body = {
        success: false,
        err: '用户存在'
      })
    }

    if (matchData.match) {
      ctx.session.user = {
        _id: matchData.user._id,
        email: matchData.user.email,
        role: matchData.user.role,
        username: matchData.user.username
      }
      return (ctx.body = {
        success: true    
      })
    }
  
    return (ctx.body = {
      success: false,
      err: '密码不正确'
    })
  }

  @del('/movies')
  @required({
    query: ['id']
  })
  async romove (ctx, next) {
    const id = ctx.query.id
    await findAndRemove(id)
    const movies = await getAllmovies()

    ctx.body = {
      success: true,
      data: movies
    }
  }
}

module.exports = router;