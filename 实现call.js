Function.prototype.call1 = function () {
  var fn = this
  var suzhu = arguments[0] || window
  var canshu = []
  if(arguments.length>1){
    // canshu = Array.from(arguments).slice(1) 两种方法
    canshu =  [].slice.call(arguments,1)
  }
  suzhu.fn = fn
  return suzhu.fn(...canshu)
}

var a = {b:1}
function c(arg1, arg2, arg3) {
  console.log(this.b + arg1 + arg2 + arg3)
}
c()
c.call(a)
c.call1(a,1,2,3)