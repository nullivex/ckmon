'use strict';
var sf = require('slice-file')

var config = require('../../config')


/**
 * Home Page
 * @param {object} req
 * @param {object} res
 */
exports.index = function(req,res){
  var xs = sf(config.ckpool.logFile)
  xs.sliceReverse('-20',function(err,lines){
    console.log(err,lines)
    if(err){
      console.log(err)
      res.render('error',{error: err.msg})
    } else{
      res.render('index',{
        logContent: lines.join('\n')
      })
    }
  })
}
