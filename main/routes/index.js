'use strict';
var fs = require('fs')


/**
 * Home Page
 * @param {object} req
 * @param {object} res
 */
exports.index = function(req,res){
  res.render('index',{
    logContent: fs.readFileSync(config.ckpool.logFile)
  })
}