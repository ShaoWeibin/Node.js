var createFunc = function() {
    var result = new Array();

    for (var i = 0; i < 10; ++i) {
    	result[i] = (function(val) {
	    return function() {
	    	return val;
	    }
	})(i);
    }

    return result;
}

var a = function(index) {
    var time = new Date().getTime();
    console.log('func a: ' + index);
    b(index, function() {
        console.log('func b callback: ' + time);
    });
}

var c = function() {
        abc

}
var b = function(index, callback) {
    setTimeout(function() {
        callback();
    }, 1000);
    console.log('func b: ' + index);
}

function main() {
    var result = createFunc();
    console.log(result.map(f => f()));
    
    for (var i = 0; i < 10; ++i) {
        a(i);
    }
}

main();
