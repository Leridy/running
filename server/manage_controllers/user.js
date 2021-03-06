// var log4js = require('log4js');
// log4js.configure(process.cwd() + '/conf/log4_conf.json');
// var logger = log4js.getLogger();
var dao = require('../dao/data_access');
var redisClient = require('../utils/redisHelper');
var stringHelper = require('../utils/stringHelper');
var auth = require('./auth');
var validator = require('validator');

//后台用户登录
exports.login = function(req, res, next) {
	var username = req.params.username,
		password = req.params.password,
		query_str = 'select id,name,photo,reg_time from user where login_name =? and pwd=? and is_admin=1',
		params = [username, password];
	dao.query(query_str, params).done(function(data) {
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
						if (sessionInfo.length > 0) {
							for (var i = 0; i < sessionInfo.length; i++) {
								if (sessionInfo[i].uid == uid) {
									sessionInfo[i].token = token;
								} else {
									sessionInfo.push(currentUInfo);
								}
							}
						} else {
							sessionInfo.push(currentUInfo);
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
			} else {
				var res_err = {
					res: -1,
					msg: '该用户不存在'
				};
				res.json(res_err);
			}
		}
	});
	next();
};

//后台用户登出
exports.logout = function(req, res, next) {
	var result = {
			res: 0,
			msg: '',
			data: null
		},
		uid = req.params.uid,
		token = req.params.token;
	redisClient.get('sessionInfo').then(function(reply) {
		var sessionInfo = [];
		if (reply) {
			sessionInfo = JSON.parse(reply);
			for (var i = 0; i < sessionInfo.length; i++) {
				if (sessionInfo[i].uid == uid && sessionInfo[i].token == token) {
					sessionInfo.splice(i, 1);
				}
			}
		} else {
			sessionInfo.push(currentUInfo);
		}
		var uInfo = JSON.stringify(sessionInfo);
		redisClient.set('sessionInfo', uInfo);
		res.json(result);
	});
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
			var query_str = 'select id,name,photo,reg_time from user where id=? and is_admin=1',
				params = [uid];
			dao.query(query_str, params).done(function(data) {
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
	auth.verifyReq(req).done(function(flag) {
		var result = {
			res: -1,
			msg: 'uid or token error',
			data: null
		};
		if (flag) {

		} else {
			res.json(result);
		}
	});
	var start = parseInt(req.params.begin) || 0,
		pagesize = parseInt(req.params.limit) || 10;
	var query_str = 'select sql_calc_found_rows id,name,photo,login_name,is_admin,UNIX_TIMESTAMP(reg_time) as reg_time from user limit ?,?',
		params = [start, pagesize];
	if (validator.isDecimal(String(start)) && validator.isDecimal(String(pageSize))) {
		dao.query(query_str, params).done(function(data) {
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
	} else {
		var result = {
			res: -1,
			data: null,
			msg: '参数非法'
		};
		res.json(result);
	}
	next();
};

//删除指定用户
exports.deleteUser = function(req, res, next) {
	auth.verifyReq(req).done(function(flag) {
		var result = {
			res: -1,
			msg: 'uid or token error',
			data: null
		};
		if (flag) {

		} else {
			res.json(result);
		}
	});
	var id = req.params.id;
	var query_str = 'delete from user where id=?',
		params = [id];
	dao.query(query_str, params).done(function(data) {
		res.json(data);
	})
	next();
};

//新增或者修改用户
exports.editUser = function(req, res, next) {
	auth.verifyReq(req).done(function(flag) {
		var result = {
			res: -1,
			msg: 'uid or token error',
			data: null
		};
		if (flag) {

		} else {
			res.json(result);
		}
	});
	var id = req.params.id || 0,
		name = req.params.name,
		photo = req.params.photo,
		pwd = req.params.pwd || false,
		login_name = req.params.login_name,
		is_admin = Boolean(parseInt(req.params.is_admin || 0)),
		result = {
			res: -1,
			data: null,
			msg: ''
		};
	if (stringHelper.trimAll(name).length == 0) {
		result.msg = '昵称不能为空';
		res.json(result);
	} else {
		if (stringHelper.trimAll(photo).length == 0) {
			result.msg = '头像不能为空';
			res.json(result);
		} else {
			if (!pwd && stringHelper.trimAll(pwd).length == 0) {
				result.msg = '密码不能为空';
				res.json(result);
			} else {
				if (stringHelper.trimAll(login_name).length == 0) {
					result.msg = '登录名不能为空';
					res.json(result);
				} else {
					var query_str = 'select id from user where login_name=? and id <> ? limit 0,1',
						params = [login_name, id];
					dao.query(query_str, params).done(function(data) {
						if (data.res == 0) {
							if (data.data.length == 0) {
								query_str = 'insert into user(name,photo,pwd,login_name,is_admin) values(?,?,?,?,?)';
								params = [name, photo, pwd, login_name, is_admin];
								if (id > 0) {
									if (pwd) {
										query_str = 'update user set name=?,photo=?,login_name=?,is_admin=?,pwd=? where id=?';
										params = [name, photo, login_name, is_admin, pwd, id];
									} else {
										query_str = 'update user set name=?,photo=?,login_name=?,is_admin=? where id=?';
										params = [name, photo, login_name, is_admin, id];
									}
								}
								dao.query(query_str, params).done(function(data2) {
									res.json(data2);
								})
							} else {
								result.msg = '登录名已经存在';
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

//获取单个用户信息
exports.getUser = function(req, res, next) {
	auth.verifyReq(req).done(function(flag) {
		var result = {
			res: -1,
			msg: 'uid or token error',
			data: null
		};
		if (flag) {

		} else {
			res.json(result);
		}
	});
	var id = req.params.id;
	var query_str = 'select id,name,photo,login_name,is_admin,UNIX_TIMESTAMP(reg_time) as reg_time from user where id=?',
		params = [id];
	dao.query(query_str, params).done(function(data) {
		res.json(data);
	})
	next();
};