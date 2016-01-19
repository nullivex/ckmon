'use strict';
var P = require('bluebird')
var bodyParser = require('body-parser')
var express = require('express')
var fs = require('graceful-fs')
var http = require('http')
var worker = require('infant').worker
var moment = require('moment')
var morgan = require('morgan')
var path = require('path')

var app = express()
var config = require('../config')
var routes = require('./routes')
var server = http.createServer(app)


var viewFolder = __dirname + '/views'

//make some promises
P.promisifyAll(server)

// middleware stack
//app.disable('etag')
app.set('trust proxy',true)
app.set('views',viewFolder)
app.set('view engine','jade')
app.use(morgan('dev'))
app.use(express.static(__dirname + '/public',{maxAge: 3600000}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))


/**
 * Global template vars
 * @type {object}
 * @return {string}
 */
app.locals = {
  moment: moment,
  app: {
    title: config.title
  }
}

// development only
if('development' === app.get('env')){
  /**
   * Setup pretty code in dev
   * @type {boolean}
   */
  app.locals.pretty = true
}

//static pages
app.get('/',routes.index)

//render stuff out of the views folder
app.get('/:view',function(req,res){
  if(
    fs.existsSync(path.resolve(path.join(viewFolder,req.params.view + '.jade')))
  ){
    res.render(req.params.view)
  } else {
    res.status(404).end('File not found')
  }

})


/**
 * Start main
 * @param {function} done
 */
exports.start = function(done){
  server.listenAsync(+config.main.port,config.main.host)
    .then(function(){
      done()
    })
    .catch(done)
}


/**
 * Stop main
 * @param {function} done
 */
exports.stop = function(done){
  server.close()
  done()
}

if(require.main === module){
  worker(
    server,
    config.name + ':main:worker',
    function(done){
      exports.start(done)
    },
    function(done){
      exports.stop(done)
    }
  )
}
