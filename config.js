'use strict';
var ObjectManage = require('object-manage')
var fs = require('fs')
var path = require('path')
var pkg = require('./package.json')

var config = new ObjectManage()

//dist config schema
config.$load({
  title: 'CKMon',
  name: 'ckmon',
  version: pkg.version,
  ckpool: {
    logFile: path.resolve(__dirname + '/ckpool_log')
  },
  main: {
    enabled: false,
    port: 8888,
    host: null,
    baseUrl: 'http://localhost:8888',
    workers: {
      count: 1,
      maxConnections: 10000
    },
    cookie: {
      secret: '',
      domain: null,
      maxAge: 2592000000 //30 days
    }
  }
})

//load user config
if(fs.existsSync(__dirname + '/config.local.js')){
  config.$load(require(__dirname + '/config.local.js'))
}


/**
 * Export config
 * @type {ObjectManage}
 */
module.exports = config
