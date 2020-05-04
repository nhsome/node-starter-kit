const argv = require('minimist')(process.argv.slice(2)),
  commandsMap = require('./commandsMap'),
  init = require('../kernel/init')

if (argv.h || argv.help) {
  console.log(`
        Usage: node app/console/index.js [arguments]
        Options:
            -h --help       Print help
            -e --execute    Execute commands
            --list          Show all commands
    `)
  process.exit()
}

if (argv.list) {
  const message = Object.keys(commandsMap).reduce((str, key) => {
    return str + `${ key }: ${ commandsMap[key].description }\n`
  }, '').slice(0, -1)
  console.log(message)
  process.exit()
}

if (!argv.e && !argv.execute) {
  console.error('Provide command to -e or --execute')
  process.exit(1)
}

const carg = argv.e || argv.execute
const Command = (commandsMap[carg]) ? commandsMap[carg].module : undefined
if (!Command) {
  console.error(`Command ${ carg } not found`)
  process.exit(2)
}

process.on('unhandledRejection', error => {
  console.error(error)
  process.exit(3)
});

(async function () {
  const initObj = await init()
  const command = new Command(argv, initObj)
  const startTime = Date.now()
  try {
    await command.execute()
  } catch(err) {
    console.error(err)
    process.exit(3)
  }
  const timeForExecuting = (Date.now() - startTime) / 1000
  console.log(`Whoa! Time for executing: ${ timeForExecuting }s`)
  process.exit()
})()