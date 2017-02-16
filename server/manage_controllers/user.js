// var log4js = require('log4js');
// log4js.configure(process.cwd() + '/conf/log4_conf.json');
// var logger = log4js.getLogger();
var dao = require('../dao/data_access');
var redisClient = require('../utils/redisHelper');
var stringHelper = require('../utils/stringHelper');
var auth = require('./auth');

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
				var uid = data.data[0].id,
					token = stringHelper.generateToken(uid),
					currentUInfo = {
						uid: uid,
						token: token
					};
				redisClient.get('sessionInfo').then(function(reply) {
					var sessionInfo = [];
					if (reply) {
						sessionInfo = JSON.parse(reply);
						for (var i = 0; i < sessionInfo.length; i++) {
							if (sessionInfo[i].uid == uid) {
								sessionInfo[i].token = token;
							}
						}
					} else {
						sessionInfo.push(currentUInfo);
					}
					var uInfo = JSON.stringify(sessionInfo);
					redisClient.set('sessionInfo', uInfo);
					var resData = {
						res: 0,
						data: currentUInfo
					};
					res.json(resData);
				});
			}
		}
	});
	next();
};

//获取后台登录用户信息
exports.getMangerInfo = function(req, res, next) {
	var uid = req.params.uid,
		token = req.params.token;
	auth.verify(uid, token).done(function(flag) {
		var result = {
			res: -1,
			msg: 'uid or token error',
			data: null
		};
		if (flag) {
			var query_str = 'select id,name,photo,reg_time from user where id="' + uid + '" and is_admin=1';
			dao.query(query_str).done(function(data) {
				res.json(data);
			});
		} else {
			res.json(result);
		}
	});
	next();
};

//获取用户列表
exports.getUserList = function(req, res, next) {
	var start = req.params.begin,
		pagesize = req.params.limit;
	var query_str = 'select sql_calc_found_rows id,name,photo,login_name,is_admin,UNIX_TIMESTAMP(reg_time) as reg_time from user limit ' + start + ',' + pagesize;
	dao.query(query_str).done(function(data) {
		if (data.res == 0) {
			dao.query('select found_rows() as total').done(function(result) {
				if (result.res == 0) {
					data.count = result.data[0].total;
					res.json(data);
				} else {
					res.json(result);
				}
			});
		} else {
			res.json(data);
		}
	})
	next();
};

//删除指定用户
exports.deleteUser = function(req, res, next) {
	var id = req.params.id;
	var query_str = 'delete from user where id="' + id + '"';
	dao.query(query_str).done(function(data) {
		console.log(JSON.stringify(data));
		res.json(data);
	})
	next();
};

//新增或者修改用户
exports.editUser = function(req, res, next) {
	var id = req.params.id || 0,
		name = req.params.name,
		photo = req.params.photo,
		pwd = req.params.pwd,
		login_name = req.params.login_name,
		is_admin = req.params.is_admin,
		result = {
			res: -1,
			data: null,
			err: ''
		};
	if (stringHelper.trimAll(name).length == 0) {
		result.err = '昵称不能为空';
		res.json(result);
	} else {
		if (stringHelper.trimAll(photo).length == 0) {
			result.err = '头像不能为空';
			res.json(result);
		} else {
			if (stringHelper.trimAll(pwd).length == 0) {
				result.err = '密码不能为空';
				res.json(result);
			} else {
				if (stringHelper.trimAll(login_name).length == 0) {
					result.err = '登录名不能为空';
					res.json(result);
				} else {
					var query_str = 'select id from user where login_name="' + login_name + '" and id <> "' + id + '" limit 0,1';
					dao.query(query_str).done(function(data) {
						if (data.res == 0) {
							if (data.data.length == 0) {
								query_str = 'insert into user(name,photo,pwd,login_name,is_admin) values(' + name + ',' + photo + ',' + pwd + ',' + loginName + ',' + is_admin + ')';
								if (id > 0) {
									query_str = 'update user set name=' + name + ',photo=' + photo + ',pwd=' + pwd + ',login_name=' + login_name + ',is_admin=' + is_admin + ' where id=' + id;
								}
								dao.query(query_str).done(function(data2) {
									res.json(data2);
								})
							} else {
								result.err = '登录名已经存在';
								res.json(result);
							}
						} else {
							res.json(data);
						}
					})
				}
			}
		}
	}
	next();
}