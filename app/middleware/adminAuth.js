module.exports = async function (ctx, next) {

  async function getUserByToken (token) {
    return {
      name: 'leo',
      role: {
        name: '开发'
      }
    }
  }

  // 1.获取到token
  const token = ctx.params.token || ctx.headers.token

  // 2.根据token获取到user(伪代码)
  const user = await getUserByToken(token)

  // 3.设置user 到ctx
  ctx.user = user

  // 4.下一步，进入rbac校验
  await next()
}

