// 当 bind 返回的函数作为构造函数的时候，bind 时指定的 this 值会失效，但传入的参数依然生效
Function.prototype.bind2 = function () {
  var self = this
  var thisArgs = arguments[0]
  var args = Array.prototype.slice.call(arguments,1)
  var resultFn = function(){
    // 或者 this instanceof resultFn
    return self.apply(resultFn.prototype.isPrototypeOf(this)?this:thisArgs,args.concat(Array.prototype.slice.call(arguments)))
  }
  resultFn.prototype = self.prototype
  return resultFn
}

test1('绑定this')
test2('传入参数')
test3('bind()()')
test5("new 的时候绑定了 p1, p2");
test6("new 的时候绑定了 p1, p2，并且 fn 有 prototype.sayHi");
test7("不用 new 但是用类似的对象");

function test1(message) {
  var a = function () {
    return this
  }
  var b = a.bind2({ name: 'haha' })
  var name1 = b().name
  var name2 = a.call({ name: 'haha' }).name
  if (name1 === name2) {
    console.log(message + '成功')
  } else {
    throw new Error(message + '失败')
  }
}

function test2(message){
  var a = function(b){
    return this.count+b
  }
  var b = a.bind2({count:1},2)
  var count1 = b()
  var count2 = a.call({count:1},2)
  if(count1 === count2){
    console.log(message+'成功')
  }else{
    throw new Error(message+'失败')
  }
}

function test3(message){
  var a = function(b,c){
    return this.count+b+c
  }
  var b = a.bind2({count:1},2)
  var count1 = b(3)
  var count2 = a.call({count:1},2,3)
  if(count1 === count2){
    console.log(message+'成功')
  }else{
    throw new Error(message+'失败')
  }
}

function test5(message) {
  console.log(message);
  // Function.prototype.bind2 = bind;
  const fn = function(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
  };
  const fn2 = fn.bind2(undefined, "x", "y");
  const object = new fn2();
  console.assert(object.p1 === "x", "x");
  console.assert(object.p2 === "y", "y");
}

function test6(message) {
  console.log(message);
  // Function.prototype.bind2 = bind;
  const fn = function(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
  };
  fn.prototype.sayHi = function() {};
  const fn2 = fn.bind2(undefined, "x", "y");
  const object = new fn2();
  console.assert(object.p1 === "x", "x");
  console.assert(object.p2 === "y", "y");
  // console.assert(object.__proto__ === fn.prototype);
  console.assert(fn.prototype.isPrototypeOf(object));
  console.assert(typeof object.sayHi === "function");
}

function test7(message) {
  console.log(message);
  // Function.prototype.bind2 = bind;
  const fn = function(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
  };
  fn.prototype.sayHi = function() {};
  const object1 = new fn("a", "b");
  const fn2 = fn.bind2(object1, "x", "y");
  const object = fn2(); // 没有new
  console.assert(object === undefined, "object 为空");
  console.assert(object1.p1 === "x", "x");
  console.assert(object1.p2 === "y", "y");
}