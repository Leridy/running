var dao = require('../dao/data_access');

///查询数据
exports.getList = function(pageindex, pagesize) {
	var start = pageindex * pagesize - 1;
	var query_str = 'select * from blog limit ' + start + ',' + pagesize;	
	return dao.query(query_str);
}

//获取单条记录
exports.get = function(id) {
	var query_str = 'select * from blog where id=' + id;
	return dao.query(query_str);
}

//添加记录
exports.post = function(title, userid, content) {
	var query_str = 'insert into blog(title,userid,content) values(' + title + ',' + userid + ',' + content + ')';
	return dao.query(query_str);
}

//修改记录
exports.update = function(id, title, userid, content) {
	var query_str = 'update blog set title=' + title + ',userid=' + userid + ',content=' + content + ' where id=' + id + '';
	return dao.query(query_str);
}

//删除记录
exports.delete = function(id) {
	var query_str = 'delete blog where id=' + id;
	return dao.query(query_str);
}