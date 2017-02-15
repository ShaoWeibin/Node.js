# Node.js Stream(流) #
## Stream ##
Stream 是一个抽象接口，Node 中有很多对象实现了这个接口。例如，对http 服务器发起请求的request 对象就是一个 Stream，还有stdout（标准输出）。
Node.js，Stream 有四种流类型：

* Readable - 可读操作。
* Writable - 可写操作。
* Duplex - 可读可写操作。
* Transform - 操作被写入数据，然后读出结果。

所有的 Stream 对象都是 EventEmitter 的实例。常用的事件有：

* data - 当有数据可读时触发。
* end - 没有更多的数据可读时触发。
* error - 在接收和写入过程中发生错误时触发。
* finish - 所有数据已被写入到底层系统时触发。

读取流
``` javascript
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
```
写入流
``` javascript
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
```

## 管道流 ##
管道提供了一个输出流到输入流的机制。通常我们用于从一个流中获取数据并将数据传递到另外一个流中。
我们把文件比作装水的桶，而水就是文件里的内容，我们用一根管子(pipe)连接两个桶使得水从一个桶流入另一个桶，这样就慢慢的实现了大文件的复制过程。
以下实例我们通过读取一个文件内容并将内容写入到另外一个文件中。
``` javascript
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
```

## 链式流 ##
链式是通过连接输出流到另外一个流并创建多个对个流操作链的机制。链式流一般用于管道操作。
接下来我们就是用管道和链式来压缩和解压文件。
创建 compress.js 文件, 代码如下：
``` javascript
var fs = require("fs");
var zlib = require('zlib');

// 压缩 input.txt 文件为 input.txt.gz
fs.createReadStream('input.txt')
.pipe(zlib.createGzip())
.pipe(fs.createWriteStream('input.txt.gz'));
  
console.log("文件压缩完成。");
```
执行完以上操作后，我们可以看到当前目录下生成了 input.txt 的压缩文件 input.txt.gz。
接下来，让我们来解压该文件，创建 decompress.js 文件，代码如下：
``` javascript
var fs = require("fs");
var zlib = require('zlib');

// 解压 input.txt.gz 文件为 input1.txt
fs.createReadStream('input.txt.gz')
.pipe(zlib.createGunzip())
.pipe(fs.createWriteStream('input1.txt'));
  
console.log("文件解压完成。");
```