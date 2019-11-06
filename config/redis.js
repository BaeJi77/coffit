const Redis = require('ioredis');
const redisConfig = require('./redis_config');

const env = process.env.NODE_ENV;
const redis = new Redis(redisConfig[env]);
const expireTimeOn1Hour = 60 * 60; // 1Hour

module.exports = {
    redisClient: redis,
    expireTimeOn1Hour: expireTimeOn1Hour
};