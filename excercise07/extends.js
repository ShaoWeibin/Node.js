/**
 * 继承练习
 */

var Mammal = function (name) {:
    this.name = name;
}

Mammal.prototype.getName = function() {
    return this.name;
}

Mammal.prototype.says = function() {
    return this.saying || '';
}

var Cat = function(name) {
    this.name = name;
    this.saying = 'meow';
}

Cat.prototype = new Mammal();

function main(argv) {
	var cat = new Cat('Henrietta');
	var says = cat.says();
	var name = cat.getName();

	console.log(says);
	console.log(name);
}

main(process.argv.slice(2));
