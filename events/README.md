# events 模块 #

### 引入方法 ###
*方法一*
``` javascript
var events = reqire('events');
var myEmmiter = new events.EventEmitter();
```

*方法二*
``` javascript
var EventEmitter = reqire('events');
var myEmmiter = new EventEmitter();
```

### 事件回调 ###
``` javascript
myEmmiter.on('event', function() {
    // this 为 myEmitter    
});

myEmmiter.on('event', () => {
    // this 指向该箭头函数所在的作用域
});
```
