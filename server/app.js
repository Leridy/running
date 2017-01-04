var restify = require('restify');
var blog = require('./controllers/blog');
var manageUser = require('./manage_controllers/user');
var utils = require('./utils/image');

function respond(req, res, next) {
	blog.getList(1, 1).done(function(data) {
		res.json(data);
	});
	next();
}

var server = restify.createServer();
server.use(restify.CORS({
	'origins': ['http://vr.heyhou.com', 'http://vr2.heyhou.com']
}));
//admin后台接口
server.post('/manage/login', manageUser.login);
server.get('/home/:pageindex/:pagesize', respond);

//通用工具类
server.get('/utils/getImageCode', utils.getImageCode);


server.listen(8083, function() {
	console.log('%s listening at %s', server.name, server.url);
});