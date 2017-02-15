/**
 * Create by weibin.shao on 2017/2/15.
 * Node.js Stream
 * 
 */

 var fs = require('fs');

/**
 * 读取流
 */
 function read(pathname) {
 	var data = '';

	// 创建可读流
	var readStream = fs.createReadStream(pathname);

	// 设置编码
	readStream.setEncoding('utf-8');

	// 处理事件 --> data, end, and error
	readStream.on('data', function(chunk) {
	 	data += chunk;
	});

	readStream.on('end', function() {
	 	console.log(data);
	});

	readStream.on('error', function(err) {
	 	console.log(err.stack);
	});

	console.log('read 程序执行完毕');
 }
 
 /**
 * 写入流
 */
function write(pathname) {
 	var data = 'Hello World';

	// 创建一个可以写入的流，写入到文件 pathname 中
	var writeStream = fs.createWriteStream(pathname);

	 // 使用 utf8 编码写入数据
	writeStream.write(data, 'utf-8');

	 // 标记文件末尾
	writeStream.end();

	// 处理事件 --> finish and error
	writeStream.on('finish', function() {
		console.log(data);
	});

	writeStream.on('error', function(err) {
	 	console.log("写入完成");
	 });

	console.log('write 程序执行完毕');
}

/**
 * 管道流
 */
function pipe() {
 	// 创建一个可读流
	var readerStream = fs.createReadStream('input.txt');

	// 创建一个可写流
	var writerStream = fs.createWriteStream('output.txt');

	// 管道读写操作
	// 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
	readerStream.pipe(writerStream);

	console.log("pipe 程序执行完毕");
}

read('input.txt');
write('output.txt');
pipe();

 