var dao = require('../dao/data_access');
var redisClient = require('../utils/redisHelper');
var stringHelper = require('../utils/stringHelper');
var auth = require('./auth');

//获取文章列表
exports.getArticleList = function(req, res, next) {
	auth.verifyReq(req).done(function(flag) {
		var result = {
			res: -1,
			msg: 'uid or token error',
			data: null
		};
		if (flag) {
			var start = req.params.begin,
				pagesize = req.params.limit;
			var query_str = 'SELECT sql_calc_found_rows a.id,a.title,a.userid,a.content,UNIX_TIMESTAMP(a.create_time) as create_time,b.name from article a left join user b on a.userid=b.id limit ' + start + ',' + pagesize;
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
			res.json(result);
		}
	});
	next();
};

//删除指定文章
exports.deleteArticle = function(req, res, next) {
	auth.verifyReq(req).done(function(flag) {
		var result = {
			res: -1,
			msg: 'uid or token error',
			data: null
		};
		if (flag) {
			var id = req.params.id;
			var query_str = 'delete from article where id="' + id + '"';
			dao.query(query_str).done(function(data) {
				res.json(data);
			})
			next();
		} else {
			res.json(result);
		}
	});
};

//编辑或者删除文章
exports.editArticle = function(req, res, next) {
	auth.verifyReq(req).done(function(flag) {
		var result = {
			res: -1,
			msg: 'uid or token error',
			data: null
		};
		if (flag) {
			var id = req.params.id || 0,
				title = req.params.title,
				content = req.params.content,
				cover = req.params.cover,
				userid = req.params.uid,
				result = {
					res: -1,
					data: null,
					msg: ''
				};
			if (stringHelper.trimAll(title).length == 0) {
				result.msg = '标题不能为空';
				res.json(result);
			} else {
				if (stringHelper.trimAll(content).length == 0) {
					result.msg = '内容不能为空';
					res.json(result);
				} else {
					if (stringHelper.trimAll(cover).length == 0) {
						result.msg = '封面图不能为空';
						res.json(result);
					} else {
						var query_str = 'select id from user where id="' + userid + '" limit 0,1';
						dao.query(query_str).done(function(data) {
							if (data.res == 0) {
								if (data.data.length > 0) {
									query_str = 'insert into article(title,content,cover,userid) values("' + title + '","' + content + '","' + cover + '","' + userid + '")';
									if (id > 0) {
										query_str = 'update article set title="' + title + '",content="' + content + '",cover="' + cover + '",userid=' + userid + ' where id=' + id;
									}
									dao.query(query_str).done(function(data2) {
										res.json(data2);
									})
								} else {
									result.msg = '操作失败，该用户不存在';
									res.json(result);
								}
							} else {
								res.json(data);
							}
						})
					}
				}
			}
		} else {
			res.json(result);
		}
	});
	next();
}

//获取文章详情
exports.getArticle = function(req, res, next) {
	auth.verifyReq(req).done(function(flag) {
		var result = {
			res: -1,
			msg: 'uid or token error',
			data: null
		};
		if (flag) {
			var id = req.params.id
			var query_str = 'SELECT id,title,content,cover from article where id="' + id + '"';
			dao.query(query_str).done(function(data) {
				res.json(data);
			})
		} else {
			res.json(result);
		}
	});
	next();
};