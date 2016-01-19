'use strict';
var cp = require('child_process')

var config = require('../../config')


/**
 * Home Page
 * @param {object} req
 * @param {object} res
 */
exports.index = function(req,res){
  res.render('index',{
    logContent: cp.execSync('tail -n 10 ' + config.ckpool.logFile)
  })
}