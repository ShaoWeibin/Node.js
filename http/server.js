/**
 * Create by weibin.shao on 2017/1/10.
 * first example 
 */

var http = require('http');
var fs = require('fs');

http.createServer(function(request, response) {
	var data = fs.readFile('input.txt', function(err, data) {
		if (err) {
			console.log(err);
			return;
		}

		console.time('cost');
		console.log('******************************************');
		console.log(data.toString());
		console.log('******************************************');
		console.timeEnd('cost');

		response.writeHead(200, { 'Content-Type': 'text/plain' });
	    // 发送响应数据 "Hello World"
	    response.end(data.toString());
	});
}).listen(8080);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8080/');
