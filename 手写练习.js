// promise all
Promise.all2 = (promises) => {
  return new Promise((resolve, reject) => {
    var result = []
    for (var i = 0; i < promises.length; i++) {
      !(function (i) {
        Promise.resolve(promises[i]).then(
          (value) => {
            result.push(value)
            if (result.length === promises.length) {
              resolve(result)
            }
          },
          (err) => {
            reject(err)
          }
        )
      })(i)
    }
  })
}

// promise race
Promise.race2 = (promises) => {
  let isend = false
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then(
        (value) => {
          !isend && resolve(value)
          isend = true
        },
        (err) => {
          !isend && reject(value)
          isend = true
        }
      )
    }
  })
}

// promise allsettled
Promise.allsettled = (promises) => {
  return Promise.all(
    promises.map((promise) =>
      promise.then(
        (vaule) => {
          return {
            status: 'ok',
            value: vaule,
          }
        },
        (err) => {
          return {
            status: 'error',
            error: err,
          }
        }
      )
    )
  )
}

// 防抖
function debounce(callback, wait) {
  let timerId = null
  return function () {
    const context = this
    if (timerId) clearTimeout(timerId)
    timerId = setTimeout(() => {
      callback.apply(context, arguments)
    }, wait)
  }
}

// 节流
function throttle(callback, wait) {
  let canUse = true
  return function () {
    const context = this
    if (canUse) {
      callback.apply(context, arguments)
      canUse = false
      setTimeout(() => {
        canUse = true
      }, wait)
    }
  }
}

// 快排
function quick(arr,start,end) {
  var middleVal = arr[Math.floor((start + end) / 2)]
  var i = start
  var j = end
  while(i<=j){
    while(arr[i]<middleVal){
      i++
    }
    while(arr[j]>middleVal){
      j--
    }
    if(i<=j){
      var temp = arr[i]
      arr[i] = arr[j]
      arr[j] = temp
      i++
      j--
    }
  }
  return i
}
function quickSort(arr,left,right){
  if(arr.length>1){
    var index = quick(arr,left,right)
    if(index-1>left){
      quickSort(arr,left,index-1)
    }
    if(index<right){
      quickSort(arr,index,right)
    }
  }
  return arr
}
quickSort([23,334,54,3445,5645,24,5634,5656,23,65,43,554],0,12)

// 数组扁平化
function flatten(arr) {
  return arr.reduce((a, b) => {
    return a.concat(Array.isArray(b) ? flatten(b) : b)
  }, [])
}

// 深拷贝
let cache = []
function deepClone(source) {
  if(source instanceof Object) {
    let dist
    const index = cache.findIndex(item=>item[0]===source)
    if(index>-1){
      dist = cache[index][1]
      return dist
    }
    if(source instanceof Array) {
      dist = []
    }
    else if(source instanceof Function){
      dist =function(){
        return source.apply(this, arguments)
      } 
    }
    else if(source instanceof RegExp){
      dist = new RegExp(source.source, source.flags)
    }
    else if(source instanceof Date){
      dist = new Date(source)
    }
    cache.pus([source,dist])
    for(let i in source){
      dist[key]= deepClone(source[i])
    }
    return dist
  }
  return source
}

// call
Function.prototype.call2 = function(){
  var fn = this
  var obj = arguments[0]|| window
  var args = []
  if(arguments.length>1){
    args = [].slice.call(arguments,1)
  }
  obj.fn = fn
  return obj.fn(...args)
}

// bind
Function.prototype.bind2 = function () {
  var self = this
  var context = arguments[0]
  var args = Array.prototype.slice.call(arguments, 1)
  var resultFn = function () {
    return fn.apply(this instanceof resultFn ? this : context, args.concat(Array.prototype.slice.call(arguments)))
  }
  resultFn.prototype = self.prototype
  return resultFn
}

function pointNodeInfo(node){
  console.log(node.tagName+"-"+node.className)
}

traversDom(obox)

// settimeout模拟
function mysetInterval(fn,ms) {
  const rec = {}
  function exec(){
    return settimeout(()=>{
      fn.apply(null)
      rec.current = exec()
    },ms)
  }
  rec.current = exec()
  return rec
}

var number = 1;
function fn() {
  console.log(this.number);
}
let obj = {
  number: 2,
  show: function (fn) {
    fn();
    arguments[0]();
  },
};
obj.show(fn);

obj.show.call(obj,fn);