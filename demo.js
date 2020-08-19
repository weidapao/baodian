// 原型链和继承
function Animal(color) {
  this.color = color
}
Animal.prototype.move = function () {
  console.log(1111)
} // 动物可以动
function Dog(color, name) {
  Animal.call(this, color) // 或者 Animal.apply(this, arguments)
  this.name = name
}

// Dog.prototype.__proto__ = Animal.prototype
// Dog.prototype = Object.create(Animal.prototype)
function temp() {}
temp.prototype = Animal.prototype
Dog.prototype = new temp()

Dog.prototype.constuctor = Dog
Dog.prototype.move = function () {
  console.log('汪')
}
var b = new Dog('23')
b.move()
var c = new Animal('23')
c.move()