'use strict'

const server = require('./kernel/server'),
  init = require('./kernel/init'),
  Router = require('./kernel/Router');

(async function() {
  const initObj = await init()
  let router = new Router(server, initObj)
  router.addEventsListeners()
  server.listen(initObj.config.serverPort, () => {
    initObj.logger.info('Server listening on port ' + initObj.config.serverPort)
  })
})()
