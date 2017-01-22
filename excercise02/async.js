/**
 * Create by weibin.shao on 2017/1/10.
 * 异步读取文件 
 */

var fs = require('fs');
var data = fs.readFile('input.txt', function(err, data) {
	if (err) console.log(err);
	console.log(data.toString());
});

console.log('异步读取文件程序执行结束');