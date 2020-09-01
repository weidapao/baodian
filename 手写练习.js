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

// 遍历DOM树并打印出DOM节点的tagName和className
function traversDom(boxNode){
  //创建一个队列，并把最外层放入队列
  let queue = [boxNode]
  // 遍历队列
  while (queue.length){
      // 获取队列第一个dom
      let node = queue.shift()
      // 打印dom信息
      pointNodeInfo(node)
      // 判断当前都没是否有子级，如果没有跳过 可能会有兄弟节点
      if(!node.children.length){
          continue
      }
      // 如果有遍历 子级节点 并插入到队列，继续循环
      Array.from( node.children ).forEach( item =>{
          queue.push(item)
      })

  }
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