/**
 * Create by weibin.shao on 2017/2/15.
 * Node.js Stream
 * 解压缩文件
 * 
 */

var fs = require("fs");
var zlib = require('zlib');

// 解压 input.txt.gz 文件为 input1.txt
fs.createReadStream('input.txt.gz')
.pipe(zlib.createGunzip())
.pipe(fs.createWriteStream('input1.txt'));
  
console.log("文件解压完成。");