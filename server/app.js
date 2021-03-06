var restify = require('restify');
var config = require('./conf/config');
var manageUser = require('./manage_controllers/user');
var manageArticle = require('./manage_controllers/article');
var article = require('./controllers/article');
var categories = require('./controllers/categories');
var qiniuUtils = require('./utils/qiniuHelper');

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
//获取后台管理员信息
server.get('/manage/get_manager_info', manageUser.getMangerInfo);
//获取用户列表
server.get('/manage/get_user_list', manageUser.getUserList);
//删除用户
server.post('/manage/delete_user', manageUser.deleteUser);
//编辑用户
server.post('/manage/edit_user', manageUser.editUser);
//获取单个用户信息
server.get('/manage/get_user', manageUser.getUser);
//获取文章列表
server.get('/manage/get_article_list', manageArticle.getArticleList);
//删除文章
server.get('/manage/delete_article', manageArticle.deleteArticle);
//编辑文章
server.post('/manage/edit_article', manageArticle.editArticle);
//获取文章详情
server.get('/manage/get_article', manageArticle.getArticle);
//获取文章分类列表
server.get('/manage/get_article_tag_list', manageArticle.getArticleTagList);
//获取文章分类详情
server.get('/manage/get_article_tag_detail', manageArticle.getArticleTagDetail);
//编辑文章分类
server.post('/manage/edit_article_tag', manageArticle.editArticleTag);
//显示或者隐藏文章分类
server.post('/manage/show_or_hide_article_tag_info', manageArticle.showOrHideArticleTagInfo);
//删除文章分类
server.post('/manage/delete_article_tag_info', manageArticle.deleteArticleTagInfo);
//获取友情链接列表
server.get('/manage/get_links_list', manageArticle.getLinksList);
//获取友情链接详情
server.get('/manage/get_links_detail', manageArticle.getLinksDetail);
//编辑友情链接
server.post('/manage/edit_link', manageArticle.editLink);
//显示或者隐藏友情链接
server.post('/manage/show_or_hide_links_detail', manageArticle.showOrHideLinksDetail);

//前台接口
//获取文章列表
server.get('/article/get_list', article.getArticleList);
//获取文章详情
server.get('/article/get_detail', article.getArticle);
//获取当前文章的前一篇和后一篇
server.get('/article/get_next_prev', article.getNextAndPrev);
//获取文章分类标签
server.get('/categories/get_article_tag_list', categories.getArticleTagList);
//根据分类获取文章列表
server.get('/categories/get_article_list_by_tagname', categories.getArticleListByTagName);
//获取友情链接列表
server.get('/article/get_friendship_link_list', article.getFriendshipLinkList);

//通用工具类
server.get('/utils/get_upload_token', qiniuUtils.getUploadToken);

server.listen(8083, function() {
	console.log('%s listening at %s', server.name, server.url);
});