var dao = require('../dao/data_access');
var redisClient = require('../utils/redisHelper');
var stringHelper = require('../utils/stringHelper');
var auth = require('./auth');
var validator = require('validator');

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
			if (validator.isDecimal(String(start)) && validator.isDecimal(String(pagesize))) {
				var query_str = 'SELECT sql_calc_found_rows a.id,a.title,a.userid,a.content,a.desc,a.tags,UNIX_TIMESTAMP(a.create_time) as create_time,b.name from article a left join user b on a.userid=b.id order by a.id desc limit ?,?',
					params = [parseInt(start), parseInt(pagesize)];
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
				result.msg = '参数非法';
				res.json(result);
			}
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
			var id = req.params.id,
				query_str = 'delete from article where id=?',
				params = [id];
			dao.query(query_str, params).done(function(data) {
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
				desc = req.params.desc,
				cover = req.params.cover,
				userid = req.params.uid,
				tags = req.params.tags,
				result = {
					res: -1,
					data: null,
					msg: ''
				};
			if (stringHelper.trimAll(tags).length == 0) {
				result.msg = '请选择标签';
				res.json(result);
			} else {
				if (stringHelper.trimAll(title).length == 0) {
					result.msg = '标题不能为空';
					res.json(result);
				} else {
					if (stringHelper.trimAll(content).length == 0) {
						result.msg = '内容不能为空';
						res.json(result);
					} else {
						if (stringHelper.trimAll(desc).length == 0) {
							result.msg = '摘要不能为空';
							res.json(result);
						} else {
							var query_str = 'select id from user where id=? limit 0,1',
								params = [userid];
							dao.query(query_str, params).done(function(data) {
								if (data.res == 0) {
									if (data.data.length > 0) {
										query_str = 'insert into article(title,content,cover,userid,`desc`,tags) values(?,?,?,?,?,?)';
										params = [title, content, cover, userid, desc, tags];
										if (id > 0) {
											query_str = 'update article set title=?,content=?,cover=?,userid=?,`desc`=?,tags=? where id=?';
											params.push(id);
										}
										dao.query(query_str, params).done(function(data2) {
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
			var id = req.params.id,
				query_str = 'SELECT id,title,content,cover,`desc`,tags from article where id=?';
			params = [id];
			dao.query(query_str, params).done(function(data) {
				res.json(data);
			})
		} else {
			res.json(result);
		}
	});
	next();
};

//添加文章标签
exports.editArticleTag = function(req, res, next) {
	auth.verifyReq(req).done(function(flag) {
		var result = {
			res: -1,
			msg: 'uid or token error',
			data: null
		};
		if (flag) {
			var id = req.params.id || 0,
				tagName = req.params.tag_name,
				isDelete = req.params.is_delete || 0;
			result = {
				res: -1,
				data: null,
				msg: ''
			};
			if (stringHelper.trimAll(tagName).length == 0) {
				result.msg = '标签名字不能为空';
				res.json(result);
			} else {
				var query_str = 'insert into articleTag(tag_name) values(?)',
					params = [tagName];
				if (id > 0) {
					query_str = 'update articleTag set tag_name=?,is_delete=? where id=?';
					params.concat([isDelete, id]);
				}
				dao.query(query_str, params).done(function(data) {
					res.json(data);
				})
			}
		} else {
			res.json(result);
		}
	});
	next();
}

//查询文章标签列表
exports.getArticleTagList = function(req, res, next) {
	auth.verifyReq(req).done(function(flag) {
		var result = {
			res: -1,
			msg: 'uid or token error',
			data: null
		};
		if (flag) {
			var start = parseInt(req.params.begin) || 0,
				pagesize = parseInt(req.params.limit) || 10;
			var query_str = 'SELECT sql_calc_found_rows id,tag_name,is_delete from articleTag limit ?,?',
				params = [start, pagesize];
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
			res.json(result);
		}
	});
	next();
}

//查询文章标签详情
exports.getArticleTagDetail = function(req, res, next) {
	auth.verifyReq(req).done(function(flag) {
		var result = {
			res: -1,
			msg: 'uid or token error',
			data: null
		};
		if (flag) {
			var id = req.params.id;
			var query_str = 'SELECT id,tag_name,is_delete from articleTag where id=?',
				params = [id];
			dao.query(query_str, params).done(function(data) {
				res.json(data);
			})
		} else {
			res.json(result);
		}
	});
	next();
}

//设置隐藏或者显示文章标签
exports.showOrHideArticleTagInfo = function(req, res, next) {
	auth.verifyReq(req).done(function(flag) {
		var result = {
			res: -1,
			msg: 'uid or token error',
			data: null
		};
		if (flag) {
			var id = req.params.id,
				isDelete = req.params.isDelete || 1;

			var query_str = 'update articleTag set is_delete=? where id=?',
				params = [isDelete, id];
			dao.query(query_str, params).done(function(data) {
				res.json(data);
			})
			next();
		} else {
			res.json(result);
		}
	});
};

//删除文章标签
exports.deleteArticleTagInfo = function(req, res, next) {
	auth.verifyReq(req).done(function(flag) {
		var result = {
			res: -1,
			msg: 'uid or token error',
			data: null
		};
		if (flag) {
			var id = req.params.id;

			var query_str = 'delete from articleTag where id=?',
				params = [id];
			dao.query(query_str, params).done(function(data) {
				res.json(data);
			})
			next();
		} else {
			res.json(result);
		}
	});
};

//添加或者编辑友情链接
exports.editLink = function(req, res, next) {
	auth.verifyReq(req).done(function(flag) {
		var result = {
			res: -1,
			msg: 'uid or token error',
			data: null
		};
		if (flag) {
			var id = req.params.id || 0,
				name = req.params.name,
				linkUrl = req.params.link_url,
				isDelete = req.params.is_delete || 0;
			result = {
				res: -1,
				data: null,
				msg: ''
			};
			if (stringHelper.trimAll(name).length == 0) {
				result.msg = '友情链接名称不能为空';
				res.json(result);
			} else {
				if (stringHelper.trimAll(linkUrl).length == 0) {
					result.msg = '友情链接地址不能为空';
					res.json(result);
				} else {
					var query_str = 'insert into links(name,link_url,is_delete) values(?,?,?)';
					params = [name, linkUrl, isDelete];
					if (id > 0) {
						query_str = 'update links set name=?,link_url=?,is_delete=? where id=?';
						params.push(id);
					}
					dao.query(query_str, params).done(function(data) {
						res.json(data);
					})
				}
			}
		} else {
			res.json(result);
		}
	});
	next();
}

//查询友情链接列表
exports.getLinksList = function(req, res, next) {
	auth.verifyReq(req).done(function(flag) {
		var result = {
			res: -1,
			msg: 'uid or token error',
			data: null
		};
		if (flag) {
			var start = parseInt(req.params.begin) || 0,
				pagesize = parseInt(req.params.limit) || 10;
			var query_str = 'SELECT sql_calc_found_rows id,name,link_url,is_delete from links limit ?,?',
				params = [start, pagesize];
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
			res.json(result);
		}
	});
	next();
}

//查询友情链接详情
exports.getLinksDetail = function(req, res, next) {
	auth.verifyReq(req).done(function(flag) {
		var result = {
			res: -1,
			msg: 'uid or token error',
			data: null
		};
		if (flag) {
			var id = req.params.id;
			var query_str = 'SELECT id,name,link_url,is_delete from links where id=?',
				params = [id];
			dao.query(query_str, params).done(function(data) {
				res.json(data);
			})
		} else {
			res.json(result);
		}
	});
	next();
}

//设置隐藏或者显示友情链接
exports.showOrHideLinksDetail = function(req, res, next) {
	auth.verifyReq(req).done(function(flag) {
		var result = {
			res: -1,
			msg: 'uid or token error',
			data: null
		};
		if (flag) {
			var id = req.params.id,
				isDelete = req.params.isDelete;

			var query_str = 'update links set is_delete=? where id=?',
				params = [isDelete, id];
			dao.query(query_str, params).done(function(data) {
				res.json(data);
			})
			next();
		} else {
			res.json(result);
		}
	});
};