/**
 * Create by weibin.shao on 2017/1/22.
 * 文件拷贝
 * arvg[0] 文件全路径
 * arvg[1] 0-同步拷贝 1-异步拷贝
 */

var fs = require('fs');

/**
 * 文件同步拷贝
 * 适用于小文件拷贝
 */
function copySync(src, dest) {
	fs.writeFileSync(dest, fs.readFileSync(src));
	console.log('copy finished');
}

/**
 * 文件异步拷贝
 * 适用于大文件拷贝
 */
function copyAsync(src, dest) {
	fs.createReadStream(src).pipe(fs.createWriteStream(dest));
}

function main(argv) {
	var sync = argv[2] === undefined ? true : parseInt(argv[1]);
	sync ? copySync(argv[0], argv[1])  : copyAsync(argv[0], argv[1]);
}

main(process.argv.slice(2));
