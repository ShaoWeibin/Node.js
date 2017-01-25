/**
 * Create by weibin.shao on 2017/1/22.
 * 文件遍历
 * arvg[0] 文件夹路径
 * arvg[1] 0-同步遍历 1-异步遍历
 */

const fs = require('fs');
const path = require('path');

/**
 * 同步遍历
 */
function travelSync(dir, callback) {
	fs.readdirSync(dir).forEach(function (file) {
		var pathname = path.join(dir, file);

		// 文件夹
		if (fs.statSync(pathname).isDirectory()) {
			travelSync(pathname, callback);
		} else {
			callback && callback(pathname);
		}
	});
}

/**
 * 异步遍历
 */
function travelAsync(dir, callback, finish) {
	fs.readdir(dir, function(error, files) {
		if (error) {
			console.log(error);
			return;
		}

		console.log(files);

		(function next(i) {
			if (i < files.length) {
				var pathname = path.join(dir, files[i]);

				fs.stat(pathname, function(error, status) {
					if (error) throw errow;

					// 文件夹
					if (status.isDirectory()) {
						travelAsync(pathname, callback, finish);
					} else {
						callback(pathname);
						next(i + 1);
					}
				});
			} else {
				finish && finish();
			}
		}(0));
	});
}

function main(argv) {
	var sync = argv[1] === undefined ? true : parseInt(argv[1]);
	console.log(sync);

	var callback = function (pathname) {
		console.log(pathname);
	}

	var finish = function() {
		console.log('async travel finished');	
	}

	sync ? travelSync(argv[0], callback) : travelAsync(argv[0], callback, finish);
}

main(process.argv.slice(2));
