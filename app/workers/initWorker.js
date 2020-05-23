const init = require('../kernel/init')

/**
 * Initializes worker class
 * @module InitWorker
 */

module.exports = function(WorkerClass, callback) {
  (async function() {
    const initObj = await init()
    let worker = new WorkerClass(initObj)
    callback(worker)
  })()

  process.on('unhandledRejection', () => {
    process.exit(3)
  })
}

/*
 * Usage example:
 * initWorker(WorkerClass, worker => {
 * const { name, prefetch } = worker.config.rabbit.queues.someQueue
 * worker.listen(name, prefetch)
 })`
 *
 * */