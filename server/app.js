var restify = require('restify');
var config = require('./config');
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
	'origins': config.origins
}));
//admin后台接口
server.post('/manage/login', manageUser.login);
server.get('/home/:pageindex/:pagesize', respond);

//通用工具类
server.get('/utils/getImageCode', utils.getImageCode);


server.listen(8083, function() {
	console.log(config.origins);
	console.log('%s listening at %s', server.name, server.url);
});