var mysql = require('mysql');
var Q = require('q');

//创建一个connection
var connection = mysql.createConnection({
    host: '120.24.102.79',
    user: 'root',
    password: 'eee-333.',
    port: '3306',
    database: 'running'

});

exports.query = function (querystr) {
    var deferred = Q.defer(), result;
    connection.query(querystr, function (err, rows, fields) {
        if (err) {
            result = {
                res: -1,
                data: err
            };
        }
        else {
            result = {
                res: 0,
                data: rows
            }
        }
        deferred.resolve(result);
    });
    return deferred.promise;
    // connection.end(function (err) {
    //     if (err) {
    //         console.log('[connection end] error->' + err);
    //         return;
    //     }
    // });
}

//建立连接
// connection.connect(function (err) {
//     if(err)
//     {
//         console.log('[query]-'+err);
//         return;
//     }
//     else
//     {
//         console.log('[connection connect] successed！')
//     }
// });

//查询，由于可以通过query方法隐式建立连接，所以可以省略上一步
// connection.query('select * from blog',function (err,rows,fields) {
//   if(err)
//   {
//       console.log('[query]-'+err);
//       return;
//   }
//   console.log('The solution is：'+JSON.stringify(rows));
// });

//关闭连接
// connection.end(function (err) {
//     if(err)
//     {
//         return;
//     }
//     console.log('[connection end] successed!');
// });