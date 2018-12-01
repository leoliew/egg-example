'use strict'

const adminAuth = require('./middleware/adminAuth')
const rbacAuth = require('./middleware/rbacAuth')

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {router, controller} = app
  // 测试egg rbac
  router.get('/admin', adminAuth, rbacAuth, controller.home.index2)

  router.get('/', controller.home.index)
}
