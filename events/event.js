/**
 * Create by weibin.shao on 2017/1/10.
 * 事件事例
 */

// 引入 events 模块
var events = require('events');
// 创建 eventEmiter 对象
var eventEmitter = new events.EventEmitter;

// 创建事件处理程序
var connectHandle = function connected() {
	console.log('连接成功');

	// 触发 data_received 事件
	eventEmitter.emit('data_received');
}

// 绑定 connection 事件处理程序
eventEmitter.on('connection', connectHandle);

// 使用匿名函数绑定 data_received 事件
eventEmitter.on('data_received', function() {
	console.log('数据接收成功');
});

// 触发 connection 事件
eventEmitter.emit('connection');

eventEmitter.on('event', function() {
    console.log(this);
});

eventEmitter.on('event', () => {
    console.log(this);
});

eventEmitter.emit('event');

console.log('程序执行完毕');
