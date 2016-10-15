var restify = require('restify');
var blog = require('./controllers/blog_controller');

function respond(req, res, next) {
    blog.getList(1, 1).done(function (data) {
        res.json(data);
    });
    next();
}

var server = restify.createServer();

//admin后台接口
server.get('/home/:pageindex/:pagesize', respond);

//通用工具类
server.get('/utils/getImageCode',)


server.listen(8083, function () {
    console.log('%s listening at %s', server.name, server.url);
});