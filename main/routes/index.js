var fs = require('fs')

var config = require('../../config')


/**
 * Home Page
 * @param {object} req
 * @param {object} res
 */
exports.index = function(req,res){
  var contentRaw = fs.readFileSync(config.ckpool.logFile).toString()
  var contentParts = contentRaw.split('\033[2K')
  var content = contentParts.slice(contentParts.length - 20,contentParts.length).join('\n')
  res.render('index',{
    logContent: content
  })
}