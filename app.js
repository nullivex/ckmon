'use strict';
var child = require('infant').child
var parent = require('infant').parent

var lifecycle = new (require('infant').Lifecycle)()

var config = require('./config')

var main = parent('./main')

//setup lifecycle logging
lifecycle.on('start',function(item){
  console.log('Starting ' + item.title)
})
lifecycle.on('stop',function(item){
  console.log('Stopping ' + item.title)
})
lifecycle.on('online',function(){
  console.log('Startup complete')
})
lifecycle.on('offline',function(){
  console.log('Shutdown complete')
})

/**
 * Main website
 */
if(config.main.enabled){
  lifecycle.add(
    'main',
    function(next){
      main.start(next)
    },
    function(next){
      main.stop(next)
    }
  )
}


/**
 * Start master
 * @param {function} done
 */
exports.start = function(done){
  console.log('Beginning startup')
  lifecycle.start(function(err){
    if(err) throw err
    done()
  })
}


/**
 * Stop master
 * @param {function} done
 */
exports.stop = function(done){
  //start the shutdown process
  console.log('Beginning shutdown')
  lifecycle.stop(function(err){
    if(err) throw err
    done()
  })
}

if(require.main === module){
  child(
    config.name,
    function(done){
      exports.start(done)
    },
    function(done){
      exports.stop(done)
    }
  )
}
