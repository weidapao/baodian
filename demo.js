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

setTimeout(function () {
  console.log('setTimeout1111')
  Promise.resolve(1).then(() => {
    console.log('Promise')
  })
}, 0)
setTimeout(function () {
  console.log('setTimeout2222')
}, 0)

function searchKey(obj,target,value) {
  const stack = [...Object.keys(obj)];
  while (stack.length) {
    const next = stack.pop();
    const val = next.split(',')
    if(val[val.length-1]===target) {
      let cValue = obj
      val.map(item => {
        cValue = cValue[item]
      })
      if(cValue==value){
        console.log(next);
        return next
      }
    }
    if(obj[next] instanceof Object) {
      stack.push(...Object.keys(obj[next]).map(item=>{
        return next+','+item
      }))
    }
  }
}

const obj = {
  a: {b:2},
  c: {d:3}
}

searchKey(obj,  'd', 3)