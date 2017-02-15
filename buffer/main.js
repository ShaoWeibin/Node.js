/**
 * Create by weibin.shao on 2017/2/15.
 * Node.js Buffer
 * 
 */

var buf = new Buffer(10);
console.log(buf.toString('hex'));

var buf = new Buffer([10, 20, 30, 40, 50]);
console.log(buf.toString('hex'));

var buf = new Buffer("Hello world", "utf-8");
console.log(buf.toString());

var buf = new Buffer(10);
buf.write("hello world");
console.log(buf.toString());
console.log(buf.toJSON());

var buf = new Buffer(10);
console.log(buf.fill('a').toString());