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
 *合并文件
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
 *解析URL
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

 function main(arvg) {
 	var config = JSON.parse(fs.readFileSync(arvg[0], 'utf-8'));
 	var root = config.root || '.';
 	var port = config.port || '80';

 	console.log('root:', root, 'port:', port);

 	http.createServer(function(request, response) {
 		var urlInfo = parseURL(root, request.url);
 		console.log(urlInfo);

 		combineFiles(urlInfo.pathnames, function(error, data) {
 			if (error) {
 				response.writeHead(404);
 				response.end(error.message);
 			} else {
 				response.writeHead(200, {
 					'Content-Type': urlInfo.mime
 				});

 				response.end(data);
 			}
 		});
 	}).listen(port);
 }

 main(process.argv.slice(2));