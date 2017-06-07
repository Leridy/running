var dao = require('../dao/data_access');

//获取文章标签
exports.getArticleTagList = function(req, res, next) {
	var query_str = 'select t.*,(select count(*) from article where tags like concat("%",t.tag_name,"%")) as total from articleTag as t where t.is_delete=0 order by total desc';
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

//根据文章标签查询
exports.getArticleListByTagName = function(req, res, next) {
	var pageIndex = req.params.pageIndex || 1,
		pageIndex = pageIndex <= 1 ? 1 : pageIndex,
		pageSize = req.params.pageSize || 5,
		start = (pageIndex - 1) * pageSize,
		tagName = req.params.tagName;
	query_str = 'select sql_calc_found_rows a.id,a.title,a.userid,a.content,a.desc,UNIX_TIMESTAMP(a.create_time) as create_time,a.tags,b.name from article a left join user b on a.userid=b.id where a.tags like concat("%","'+tagName+'","%") order by a.create_time limit ' + start + ',' + pageSize;
	    
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