var dao = require('../dao/data_access');
var log4js = require('log4js');
log4js.configure(process.cwd() + '/conf/log4_conf.json');
var logger = log4js.getLogger();

var redis = require("redis"),
	client = redis.createClient();

client.on("error", function(err) {
	console.log("Error " + err);
});


//后台用户登录
exports.login = function(req, res, next) {
	var query_str = 'select id,name,photo,reg_time from user where login_name ="' + req.params.username + '" and pwd="' + req.params.password + '" and is_admin=1';
	dao.query(query_str).done(function(data) {
		if (data.res == 0 && data.data.length == 0) {
			var res_err = {
				res: -1,
				msg: '您输入的用户名或者密码不正确'
			};
			res.json(res_err);
		} else {
			//登录成功，保存用户信息到redis
			if (data.res == 0 && data.data.length > 0) {

			}
			res.json(data);
		}
	});
	next();
}