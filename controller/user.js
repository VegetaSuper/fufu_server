const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/cryp')

/**
 * 登录
 * @param {string} userName 
 * @param {string} password 
 * @returns
 */
const login = async (userName, password) => {
  userName = escape(userName)
  password = genPassword(password)
  password = escape(password)
  let sql = `select user_name,nickname,id from users where user_name=${userName} and password=${password}`
  const userData = await exec(sql)
  return userData[0] || {}
}
module.exports = {
  login
}