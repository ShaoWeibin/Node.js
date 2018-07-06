/**
 * Created by weibin.shao on 2018/7/5.
 * Person Class
 */

/**
 * 原型链继承
 */
function Person1(name) {
  this.name = name;
}

Person1.prototype.getName = function () {
  return this.name;
}

function Student1(name) {
  this.name = name;
}

Student1.prototype = new Person1();

console.log('*******************Person1*****************************');
var student = new Student1('David');
console.log(student.getName());
console.log(student.constructor);
console.log(student.__proto__);
console.log(
  student instanceof Student1, 
  student instanceof Person1,
  student instanceof Object,
);
console.log('*******************Person1*****************************\n');

/**
 * 借用构造函数继承(经典继承/伪造对象)
 * constructor stealing
 */
function Person2(name) {
  this.name = name;
}

function Student2(name, school) {
  // 继承 Person, 同时还传递了参数
  Person2.call(this, name);

  this.school = school;
}

console.log('*******************Person2*****************************');
var student = new Student2('David', '北京大学');
console.log(student.name, student.school);
console.log('*******************Person2*****************************\n');

/**
 * 组合继承(伪经典继承)
 * combination inheritance
 */
function Person3(name) {
  this.name = name;
}

Person3.prototype.getName = function () {
  return this.name;
}

function Student3(name, school) {
  // 继承属性
  Person3.call(this, name);

  // 自有属性
  this.school = school;
}

// 继承方法
Student3.prototype = new Person3();
Student3.prototype.constructor = Student3;

Student3.prototype.getSchool = function() {
  return this.school;
}

console.log('*******************Person3*****************************');
var student1 = new Student3('David', '北京大学');
var student2 = new Student3('Sam', '清华大学');
console.log(student1.getName(), student1.getSchool());
console.log(student2.getName(), student2.getSchool());
console.log('*******************Person3*****************************\n');

/**
 * 原型式继承
 * prototypal inheritance
 * 跟 Object.create() 功能相同
 */
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

console.log('*******************object*****************************');
var person = {
    name: "Nicholas",
    friends: ["Shelby", "Court", "Van"]
  };
  var anotherPerson = object(person);
  anotherPerson.name = "Greg";
  anotherPerson.friends.push("Rob");
  var yetAnotherPerson = object(person);
  yetAnotherPerson.name = "Linda";
  yetAnotherPerson.friends.push("Barbie");
  console.log(person.friends); //"Shelby,Court,Van,Rob,Barbie"
console.log('*******************object*****************************\n');

/**
 * 寄生虫继承
 * parasitic inheritance
 */
function createAnother(original) {
  // 通过调用函数创建一个新对象
  var clone = object(original);
  // 以某种方式来增强这个对象
  clone.sayHi = function() {
    console.log('hi');
  }
  // 返回这个对象
  return clone;
}

console.log('*******************createAnother*****************************');
var person = {
  name: "Nicholas",
  friends: ["Shelby", "Court", "Van"]
};
var anotherPerson = createAnother(person);
anotherPerson.sayHi(); //"hi"
console.log('*******************createAnother*****************************\n');

/**
 * 寄生组合式继承
 */
function inheritPrototype(subType, SuperType) {
  // 创建对象
  var prototype = object(SuperType.prototype);
  // 增强对象
  prototype.constructor = subType;
  // 指定对象
  subType.prototype = prototype;
}

function Person4(name) {
  this.name = name;
}

Person4.prototype.getName = function () {
  return this.name;
}

function Student4(name, school) {
  // 继承属性
  Person3.call(this, name);

  // 自有属性
  this.school = school;
}

inheritPrototype(Student4, Person4);

Student4.prototype.getSchool = function() {
  return this.school;
}

console.log('*******************Person4*****************************');
var student1 = new Student4('David', '北京大学');
var student2 = new Student4('Sam', '清华大学');
console.log(student1.getName(), student1.getSchool());
console.log(student2.getName(), student2.getSchool());
console.log('*******************Person4*****************************\n');
