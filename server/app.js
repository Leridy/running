var restify = require('restify');
var config = require('./conf/config');
var blog = require('./controllers/blog');
var manageUser = require('./manage_controllers/user');
var manageArticle = require('./manage_controllers/article');
var qiniuUtils = require('./utils/qiniuHelper');


function respond(req, res, next) {
	blog.getList(1, 1).done(function(data) {
		//sss
		res.json(data);
	});
	next();
}

var server = restify.createServer();

//add restify plugins
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS({
	'origins': config.origins
}));

//admin后台接口
server.post('/manage/login', manageUser.login);
server.post('/manage/logout', manageUser.logout);
server.get('/manage/get_manager_info', manageUser.getMangerInfo);
server.get('/manage/get_user_list', manageUser.getUserList);
server.post('/manage/delete_user', manageUser.deleteUser);
server.post('/manage/edit_user', manageUser.editUser);
server.get('/manage/get_user', manageUser.getUser);
server.get('/manage/get_article_list', manageArticle.getArticleList);
server.get('/manage/delete_article', manageArticle.deleteArticle);
server.post('/manage/edit_article', manageArticle.editArticle);
server.get('/manage/get_article', manageArticle.getArticle);

server.get('/home/:pageindex/:pagesize', respond);

//通用工具类
server.get('/utils/get_upload_token', qiniuUtils.getUploadToken);

server.listen(8083, function() {
	console.log('%s listening at %s', server.name, server.url);
});