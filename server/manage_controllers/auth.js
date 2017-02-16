var redisClient = require('../utils/redisHelper'),
	Q = require('q');

exports.verify = function(uid, token) {
	var deferred = Q.defer(),
		flag = false;
	redisClient.get('sessionInfo').then(function(reply) {		
		if (reply) {
			var sessionInfo = JSON.parse(reply);
			for (var i = 0; i < sessionInfo.length; i++) {
				if (sessionInfo[i].uid == uid && sessionInfo[i].token == token) {
					flag = true;
					break;
				}
			}
		}
		deferred.resolve(flag);
	});
	return deferred.promise;
}