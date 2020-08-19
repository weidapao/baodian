/**
 * 原型链和继承
 * prototype 是构造函数的属性，而 __proto__ 是对象的属性，构造函数也是对象
 */
function Animal(color) {
  this.color = color
}
Animal.prototype.move = function () {} // 动物可以动
function Dog(color, name) {
  Animal.call(this, color) // 或者 Animal.apply(this, arguments)
  this.name = name
}

// Dog.prototype = Object.create(Animal.prototype)
function temp() {}
temp.prototype = Animal.prototype
Dog.prototype = new temp()

Dog.prototype.constuctor = Dog
Dog.prototype.say = function () {
  console.log('汪')
}

// class继承
class Animal {
  constructor(color) {
    this.color = color
  }
  move() {}
}
class Dog extends Animal {
  constructor(color, name) {
    super(color)
    this.name = name
  }
  say() {}
}
