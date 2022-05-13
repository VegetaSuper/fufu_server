const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const { login } = require('./../controller/user')
const { SuccessModel, ErrorModel } = require('./../model/resModel')
const { SECRET_KEY } = require('../utils/cryp')

router.prefix('/api')

router.post('/login', async (ctx, next) => {
  const { username, password } = ctx.request.body
  const userData = await login(username, password)


  if (userData.user_name) {
    let payload = {
      userid: userData.id,
      name: userData.user_name
    }
    //过期时间，表示秒的数字，或者表示时间跨度的字符串，格式见：// https://github.com/zeit/ms
    let options = {
      expiresIn: '7 days'
    }
    const token = jwt.sign(payload, SECRET_KEY, options)
    // ctx.body = new SuccessModel()
    // ctx.body.token = token
    // ctx.session.username = userData.user_name
    ctx.session.token = token
    ctx.body = new SuccessModel(token)
  } else {
    ctx.body = new ErrorModel("登录失败")
  }
})

module.exports = router