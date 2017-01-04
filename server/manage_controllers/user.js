var dao = require('../dao/data_access');

//后台用户登录
exports.login = function(req, res, next) {
	res.json({
		a: 2
	});
	var query_str = 'select * from user where login_name =' + username + ' and pwd=' + pwd + ' and is_admin=1';
	dao.query(query_str).done(function(data) {		
		res.json(data);
	});
	next();
}