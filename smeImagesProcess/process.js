/**
 * 
 */

const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;

var logPath = '';

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

function log(data) {
	data = data + "\r\n";
	fs.appendFileSync(logPath, data, 'ascii', function(err) { 
		if(err){ 
			console.log('写入文件失败'); 
		} 
	});
}

function readJson(path) {
	var result = JSON.parse(fs.readFileSync(path));
	return result;
}

function deleteBack(pathName) {
	if (fs.existsSync(pathName)) {
		fs.unlinkSync(pathName);
		log(pathName);
	}
}

function deleteArrow(arrows, backName) {
	for (var key in arrows) {
		if (key.indexOf(backName.slice(backName.length -7)) !== -1) {
			if (fs.existsSync(arrows[key])) {
				fs.unlinkSync(arrows[key]);
				log(arrows[key]);
			}
		}
	}
}

function getFiles(path) {
	var files = {};
	travelSync(path, function(pathName) {
		var index = pathName.lastIndexOf("\\");
		var name = pathName.slice(index + 1);
		files[name] = pathName;
	});

	return files;
}

function execute(path, data) {
	for (var key in data) {
		var item = data[key];
		var backPath = path + "\\" + item.backPath;
		var arrowPath = path + "\\" + item.arrowPath;
		var names = item.names;

		var arrows = getFiles(arrowPath);
		//console.log(arrows);

		names.forEach(function(name) {
			var backPathName = backPath + "\\" + name + ".png";
			deleteBack(backPathName);
			deleteArrow(arrows, name);
		});
	}
}

function main(argv) {
	logPath = 'log_' + Date.now().toString();

	var path = "D:\\sme打包\\SmartMapEditor_17Q2_V1.91.2.8326\\SmartMapEditor_17Q2_V1.91.2\\ResLib";
	var result = readJson('imgs.json');
	execute(path, result);
}

main(process.argv.slice(2));