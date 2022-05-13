const jwt = require("jsonwebtoken")
const { SECRET_KEY } = require("../utils/cryp")
const { ErrorModel } = require('../model/resModel')


const checkToken = async (ctx, next) => {
  const url = ctx.request.url
  if (url == "/api/login") {
    await next()
  } else {
    console.log(ctx.session.token)
    const token = ctx.request.header.token
    try {
      jwt.verify(token, SECRET_KEY)
      await next()
    } catch (error) {
      ctx.body = new ErrorModel('用户暂未登录')
    }
  }
}

module.exports = checkToken
