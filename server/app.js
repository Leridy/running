var restify = require('restify');
var blog = require('./controllers/blog_controller');

function respond(req, res, next) {
    blog.get(1, 1).done(function (data) {
        res.json(data);
    });
    next();
}

var server = restify.createServer();

server.get('/home/:pageindex/:pagesize', respond);

server.listen(8083, function () {
    console.log('%s listening at %s', server.name, server.url);
});