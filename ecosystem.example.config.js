const env_development = {
  NODE_ENV: 'development',
  SERVER: 'http://localhost:8080',
  SERVERPORT: 8080,
  HOST: 'localhost',
  USER: 'db_user',
  PASSWORD: 'db_password',
  DB_QUERIES_LOG: '0',
  DATABASE: 'node_starter_kit',
  RABBIT_CONNECTION_STRING: 'amqp://guest:guest@localhost',
  JWT_SECRET: 'secret',
  JWT_MAX_AGE: 3600 * 24,
  DEBUG_COLORS: true
}

module.exports = {
  apps: [
    {
      name: 'web-server',
      script: 'index.js',
      watch: true,
      ignore_watch: [ 'node_modules', 'app/static', 'frontend/*', '.git' ],
      // node_args: [ '--inspect' ],
      env_development
    }
  ]
}
