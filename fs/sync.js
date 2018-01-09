/**
 * Create by weibin.shao on 2017/1/10.
 * 同步读取文件 
 */

var fs = require('fs');
var data = fs.readFileSync('input.txt');

console.log(data.toString());
console.log('同步读取文件程序执行结束');