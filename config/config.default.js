'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1543618427568_245';

  // add your config here
  config.middleware = [];

  config.rbac = {
    initOnStart: false, // default false
    /**
     * @param {object} ctx - egg context object
     * @return {object} promise, if resolve data is falsy, no role
     */
    async getRoleName(ctx) {
      if (ctx.user && ctx.user.role.name) {
        return Promise.resolve(ctx.user.role.name);
      }
      return Promise.resolve('');
    },
  };

  return config;
};

exports.mongoose = {
  client: {
    url: 'mongodb://127.0.0.1/example',
    options: {
      debug: true,
    },
  },
};
