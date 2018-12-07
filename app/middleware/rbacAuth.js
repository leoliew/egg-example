'use strict';

module.exports = async function(ctx, next) {
  if (ctx.user && ctx.user.role) {

    const isHasRole = async function(userName, url) {
      console.log(userName, url);
      // 根据 url 和资源查询数据库判断是否能访问
      return true;
    };

    const url = ctx.request.url;
    // 判断是否有权限
    const hasRole = await isHasRole(ctx.user.name, url);
    if (!hasRole) {
      ctx.body = {
        code: 401,
        msg: 'no permission',
      };
      return;
    }
    await next();
  } else {
    ctx.body = {
      code: 401,
      msg: 'no permission',
    };
    return;
  }
};

