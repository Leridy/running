var md5 = require('md5');

/**
 * [generateToken by uid and current timestamp]
 * @param  {[type]} uid [description]
 * @return {[type]}     [md5 value]
 */
exports.generateToken = function(uid) {
	return md5(uid + Date.now());
}

exports.trimAll = function(value) {
	return String(value).replace(/\s/g, "");
}