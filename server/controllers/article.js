var dao = require('../dao/data_access');

//获取文章列表
exports.getArticleList = function(req, res, next) {
	var pageIndex = req.params.pageIndex,
		pageIndex = pageIndex <= 1 ? 1 : pageIndex,
		pageSize = req.params.pageSize,
		start = (pageIndex - 1) * pageSize,
		query_str = 'select sql_calc_found_rows a.id,a.title,a.userid,a.content,a.desc,UNIX_TIMESTAMP(a.create_time) as create_time,b.name from article a left join user b on a.userid=b.id limit ' + start + ',' + pageSize;
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

//获取单条记录
exports.getArticle = function(req, res, next) {
	var id = req.params.id,
		query_str = 'select sql_calc_found_rows a.id,a.title,a.userid,a.content,a.desc,UNIX_TIMESTAMP(a.create_time) as create_time,b.name from article a left join user b on a.userid=b.id where a.id=' + id;
	dao.query(query_str).done(function(data) {
		res.json(data);
	});
};