const router = require('koa-router')()
const { SuccessModel, ErrorModel } = require('../model/resModel')
const {
  getList,
  getDetail,
  saveBlog,
  updateBlog,
  deleteBlog
} = require('./../controller/blog')

// 接口前缀
router.prefix('/api/blog')

router.get('/list', async function (ctx, next) {
  const { author: author = "", keyword: keyword = "" } = ctx.query
  const listData = await getList(author, keyword)
  ctx.body = new SuccessModel(listData)
})

router.get('/detail', async function (ctx, next) {
  const { id } = ctx.query
  const data = await getDetail(id)
  ctx.body = new SuccessModel(data)
})

router.post('/add', async function (ctx, next) {
  ctx.request.body.author = ctx.session.username
  const data = await saveBlog(ctx.request.body)
  ctx.body = new SuccessModel(data)
})

router.post('/update', async function (ctx, next) {
  const updateShow = await updateBlog(ctx.query.id, ctx.request.body)
  ctx.body = updateShow ? new SuccessModel() : new ErrorModel("更新博客失败")
})

router.post('/delete', async function (ctx, next) {
  const { username } = ctx.session.username
  const deleteShow = await deleteBlog(ctx.query.id, username)
  ctx.body = deleteShow ? new SuccessModel("删除博客成功") : new ErrorModel("删除博客失败")
})

module.exports = router