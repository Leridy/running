var redis = require("redis");
var bluebird = require('bluebird');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
var client = redis.createClient();

/**
 * [get redis value]
 * @param  {[type]} key [description]
 * @return {[type]}     [promis value]
 */
exports.get = function(key) {
	return client.getAsync(key);
}
/**
 * [set redis value]
 * @param {[type]} key   [string]
 * @param {[type]} value [string]
 */
exports.set = function(key, value) {	
	return client.set(key, value);
}