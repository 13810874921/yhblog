/* eslint valid-jsdoc: "off" */

"use strict";

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1591521489561_156";

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.mysql = {
    client: {
      host: "127.0.0.1",
      port: "3306",
      user: "root",
      password: "12345678",
      database: "blog",
    },
    app: true,
  };
  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: ["*"],
  };
  config.cors = {
    // origin: "*",
    origin: "http://localhost:3000",
    credentials:true, //允许cookie跨域
    allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS",
  };
  return {
    ...config,
    ...userConfig,
  };
};
