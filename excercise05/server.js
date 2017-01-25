/**
 * Create by weibin.shao on 2017/1/25.
 * 静态文件合并服务器
 * arvg[0] JSON配置文件路径
 */

 const fs = require('fs');
 const http = require('http');
 const path = require('path');

const MIME = {
	'.css': 'text/css',
	'.js': 'application/javascript'
};

/**
 * 合并文件
 * 第一次迭代使用，第二次迭代废除
 * @param pathnames pathname Array
 * @param callback 
 * @return 
 */
function combineFiles(pathnames, callback) {
	var output = [];
	(function next(i, len){
		if (i < len) {
			fs.readFile(pathnames[i], function(error, data) {
				if (error) {
					callback(error);
				} else {
					output.push(data);
					next(i + 1, len);
				}
			});
		} else {
			callback(null, Buffer.concat(output));
		}
	})(0, pathnames.length);
}

/**
 * 解析URL
 * @param root
 * @param url 
 * @return 
 */
 function parseURL(root, url) {
 	var base, pathnames, parts;

 	if (url.indexOf('??') === -1) {
 		url = url.replace('/', '/??');
 	}

 	parts = url.split('??');
 	base = parts[0];
 	pathnames = parts[1].split(',').map(function(value) {
 		return path.join(root, base, value);
 	});

 	return {
 		mime: MIME[path.extname(pathnames[0])] || 'text/plain',
 		pathnames: pathnames
 	};
 }

 /**
 * 输出文件内容
 * @param pathnames
 * @return 
 */
 function outputFiles(pathnames, write) {
 	(function next(i, len) {
 		if (i < len) {
 			var reader = fs.createReadStream(pathnames[i]);

 			reader.pipe(write, {end: false});
 			reader.on('end', function() {
 				next(i + 1, len);
 			})
 		} else {
 			write.end();
 		}
 	})(0, pathnames.length);
 }

 /**
 * 检验文件是否有效
 * @param pathnames
 * @return 
 */
 function validateFiles(pathnames, callback) {
 	(function next(i, len) {
 		if (i < len) {
 			fs.stat(pathnames[i], function(error, status) {
 				if (error) {
 					callback(error);
 				} else if (!status.isFile()) {
 					callback(new error());
 				} else {
 					next(i + 1, len);
 				}
 			})
 		} else {
 			callback(null, pathnames);
 		}
 	})(0, pathnames.length);
 }

 function main(arvg) {
 	var config = JSON.parse(fs.readFileSync(arvg[0], 'utf-8'));
 	var root = config.root || '.';
 	var port = config.port || '80';

 	console.log('root:', root, 'port:', port);

 	http.createServer(function(request, response) {
 		var urlInfo = parseURL(root, request.url);
 		console.log(urlInfo);

 		validateFiles(urlInfo.pathnames, function(error, pathnames) {
 			if (error) {
 				response.writeHead(404);
 				response.end(error.message);
 			} else {
 				response.writeHead(200, {
 					'Content-Type': urlInfo.mime
 				});

 				outputFiles(pathnames, response);
 			}
 		});
 	}).listen(port);
 }

 main(process.argv.slice(2));