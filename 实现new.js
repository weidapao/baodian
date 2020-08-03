function objectFactory(){
  var temp = {};
  var constructor = [].shift.call(arguments)
  temp.__proto__ = constructor.prototype
  var ret =  constructor.apply(temp, arguments)
  return typeof ret === 'object' ? ret : temp;
}

var a = function(a,b){
  this.x = a
  this.y = b
}
a.prototype.hi = 'hello'

var b = objectFactory(a,1,2)
console.log(b.hi)

// 箭头函数
// 不可以使用 new 命令，因为：

// 没有自己的 this，无法调用 call，apply。
// 没有 prototype 属性 ，而 new 命令在执行时需要将构造函数的 prototype 赋值给新的对象的 __proto__