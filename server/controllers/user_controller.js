var dao = require('../dao/data_access');

///查询数据
exports.get = function(pageindex, pagesize) {
	var start = pageindex * pagesize - 1;
	var query_str = 'select * from user limit ' + start + ',' + pagesize;
	return dao.query(query_str);
}

//添加记录
exports.post = function(name, photo, pwd) {
	var query_str = 'insert into user(name,photo,pwd) values(' + name + ',' + photo + ',' + pwd + ')';
	return dao.query(query_str);
}

//修改用户资料
exports.update = function(id, name, photo) {
	var query_str = 'update user set name=' + name + ',photo=' + photo + ' where id=' + id;
	return dao.query(query_str);
}

//修改用户密码
exports.updatePwd = function(id, pwd) {
	var query_str = 'update user set pwd=' + pwd + ' where id=' + id;
	return dao.query(query_str);
}

//删除记录
exports.delete = function(id) {
	var query_str = 'delete user where id=' + id;
	return dao.query(query_str);
}