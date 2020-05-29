const redis = require('redis');
const { isEmpty } = require('lodash');
const Logger = require('./LogService');

const env = process.env.NODE_ENV || 'development';
const { host, port, password } = require('../../config')[env].redis;

require('bluebird').promisifyAll(redis.RedisClient.prototype);

function init() {
  const client = redis.createClient({
    host,
    port,
    no_ready_check: true
  });

  if (!isEmpty(password)) client.authAsync(password);

  client.on('connect', () => Logger.info(`Redis connected on ${port}`));

  return client;
}

module.exports = init();
