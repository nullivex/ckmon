'use strict';
var fs = require('fs')

var config = require('../../config')


/**
 * Home Page
 * @param {object} req
 * @param {object} res
 */
exports.index = function(req,res){
  var contentRaw = fs.readFileSync(config.ckpool.logFile)
  var contentParts = contentRaw.split('^[[2K^M')
  var content = contentParts.slice(contentParts.length,-20).join('\n')
  res.render('index',{
    logContent: content
  })
}
