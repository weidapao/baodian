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