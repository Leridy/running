var dao = require('../dao/data_access');
var validator = require('validator');

//获取文章列表
exports.getArticleList = function(req, res, next) {
	var pageIndex = req.params.pageIndex || 1,
		pageIndex = pageIndex <= 1 ? 1 : pageIndex,
		pageSize = req.params.pageSize || 5,
		start = (pageIndex - 1) * pageSize,
		query_str = 'select sql_calc_found_rows md5(a.id+a.create_time) as id,a.title,a.userid,a.content,a.desc,UNIX_TIMESTAMP(a.create_time) as create_time,a.tags,b.name from article a left join user b on a.userid=b.id order by a.create_time desc limit ' + start + ',' + pageSize,
		result = {
			res: -1,
			data: null,
			msg: ''
		};
	if (validator.isDecimal(String(start)) && validator.isDecimal(String(pageSize))) {
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
	} else {
		result.msg = '参数非法';
		res.json(result);
	}
	next();
};

//获取单条记录
exports.getArticle = function(req, res, next) {
	var id = req.params.id,
		query_str = 'select sql_calc_found_rows a.id,a.title,a.userid,a.content,a.desc,UNIX_TIMESTAMP(a.create_time) as create_time,a.tags,b.name from article a left join user b on a.userid=b.id where md5(a.id+a.create_time)=?',
		params = [id];
	dao.query(query_str, params).done(function(data) {
		res.json(data);
	});
};

//获取当前记录的前一条记录和后一条记录
exports.getNextAndPrev = function(req, res, next) {
	var id = req.params.id,
		query_str_pre = 'select md5(id+create_time) as id,title from article where id=(select id from article where create_time > (select create_time from article where id=?) order by create_time desc limit 1)',
		query_str_next = 'select md5(id+create_time) as id,title from article where id=(select id from article where create_time < (select create_time from article where id=?) order by create_time desc limit 1)',
		params = [id];
	dao.query(query_str_pre, params).done(function(data) {
		if (data.res == 0) {
			dao.query(query_str_next, params).done(function(result) {
				if (result.res == 0) {
					var prev_data = null,
						next_data = null;
					if (data.data.length > 0) {
						prev_data = {
							id: data.data[0].id,
							title: data.data[0].title
						}
					}
					if (result.data.length > 0) {
						next_data = {
							id: result.data[0].id,
							title: result.data[0].title
						};
					}
					data.data = {
						prev_data: prev_data,
						next_data: next_data
					};
					res.json(data);
				} else {
					res.json(result);
				}
			});
		} else {
			res.json(data);
		}

	});
};

//获取友情链接列表
exports.getFriendshipLinkList = function(req, res, next) {
	var query_str = 'select sql_calc_found_rows name,link_url from links where is_delete=0';
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