var qiniu = require("qiniu"),
	uuid = require('node-uuid');

//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = '5GaTTHPDrhq4dRpxpaNsz1gwoMG_1dNNAkiTTWHH';
qiniu.conf.SECRET_KEY = 'Wup8eDsYma4ZkJeTrutrBZv0Ar42p6MBMc9RTzY1';

//要上传的空间
var bucket = 'runningdreamer';

//构建上传策略函数
function uptoken(bucket, key) {
	var putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key);
	putPolicy.returnBody = '{"name":$(fname),"size":$(fsize),"w":$(imageInfo.width),"h":$(imageInfo.height),"hash":$(etag),"imageFormat":"$(imageInfo.format)","url":"//res.runningdreamer.com/' + key + '"}';
	putPolicy.saveKey = key;
	putPolicy.scope = bucket;
	return putPolicy.token();
}

//生成上传token
exports.getUploadToken = function(req, res, next) {
	var key = 'image/$(year)/$(mon)/$(day)/' + uuid.v4() + '$(ext)',
		result = {
			res: -1,
			data: null,
			msg: ''
		};
	try {
		var token = uptoken(bucket, key);
		result.res = 0;
		result.data = token;

	} catch (ex) {
		result.msg = ex;
	}
	res.json(result);
	next();
}