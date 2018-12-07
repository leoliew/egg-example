'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('rbac.test.js', () => {

  it('should assert', function* () {
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));
  });

  it('should init success /', async () => {
    const { RBAC } = require('rbac');
    const rbac = new RBAC({
      roles: [ 'superadmin', 'admin', 'user', 'guest' ],
      permissions: {
        user: [ 'create', 'delete' ],
        password: [ 'change', 'forgot' ],
        article: [ 'create' ],
        rbac: [ 'update' ],
      },
      grants: {
        guest: [ 'create_user', 'forgot_password' ],
        user: [ 'change_password' ],
        admin: [ 'user', 'delete_user', 'update_rbac' ],
        superadmin: [ 'admin' ],
      },
    });
    await rbac.init();
  });
});
