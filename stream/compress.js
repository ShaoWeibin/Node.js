/**
 * Create by weibin.shao on 2017/2/15.
 * Node.js Stream
 * 压缩文件
 * 
 */

var fs = require("fs");
var zlib = require('zlib');

// 压缩 input.txt 文件为 input.txt.gz
fs.createReadStream('input.txt')
.pipe(zlib.createGzip())
.pipe(fs.createWriteStream('input.txt.gz'));
  
console.log("文件压缩完成。");