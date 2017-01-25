/**
 * Create by weibin.shao on 2017/1/25.
 * 静态文件合并服务器守护进程
 * 当服务进程异常退出之后，守护进程重启服务进程
 * argv[0] JSON配置文件路径
 */

 const cp = require('child_process');

 var work;

/**
 * 创建子进程
 * @param server
 * @param config 
 */
 function spawn(server, config) {
 	console.log('开始启动服务进程');
 	work = cp.spawn('node', [server, config]);
 	console.log('启动服务进程完成');

 	work.on('exit', function(code) {
 		if (code !== 0) {
 			console.log('开始重新启动服务进程');
 			spawn(server, config);
 		}
 	});
 }

 function main(argv) {
 	spawn('lib/server.js', argv[0]);
 	process.on('SIGTERM', function() {
 		console.log('守护进程接受SIGTERM');
 		work.kill();
 		process.exit(0);
 		console.log('守护进程终止');
 	});
 }

 main(process.argv.slice(2));