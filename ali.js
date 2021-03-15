function quick(arr,left,right){
  var middle = Math.floor((left+right)/2)
  var middleVal = arr[middle]
  var i = left
  var j = right
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
    if(index - 1 > left){
      quickSort(arr,left,index-1)
    }
    if(right > index){
      quickSort(arr,index,right)
    }
  }
  return arr
}

// console.log(quickSort([23,334,54,3445,5645,24,5634,5656,23,65,43,554],0,11))

function merge(arr1,arr2){
 var i = 0;
 var j = 0;
 var result = []
 while (i < arr1.length&&j < arr2.length){
   if(arr1[i]>=arr2[j]){
    result.push(arr2[j])
    j++
   }else{
     result.push(arr1[i])
     i++
   }
 }
 return result.concat(arr1.slice(i),arr2.slice(j))
}
function mergeSort(arr){
  if(arr.length>1){
    var middle = Math.floor(arr.length/2)
    var arr1 = arr.slice(0,middle)
    var arr2 = arr.slice(middle)
    return merge(mergeSort(arr1),mergeSort(arr2))
  }else{
    return arr
  }
}

console.log(mergeSort([23,334,54,3445,5645,24,5634,5656,23,65,43,554],0,11))

function flatten(arr, deep) {
  return deep > 0
    ? arr.reduce((a, b) => {
        return a.concat(Array.isArray(b) ? flatten(b, deep - 1) : b)
      }, [])
    : arr
}

function qiangeng(tree){
  if(tree){
    console.log(tree.val)
    qiangeng(tree.left)
    qiangeng(tree.right)
  }
}

function qiangengWu(tree){
  var stack = [tree]
  while(stack.length){
    var current = stack.pop()
    console.log(current.val)
    if(current.right){
      stack.push(current.right)
    }
    if(current.left){
      stack.push(current.left)
    }
  }
}

function zhonggengWu(tree){
  var stack = []
  var current = tree
  while(stack.length||current){
    if(current){
      stack.push(current)
      current = current.left
    }else{
      current = stack.pop()
      console.log(current.val)
      current = current.right
    }
  }
}

function guangdu(tree){
  var queue = [tree]
  while(queue.length){
    var current = queue.shift()
    console.log(current.val)
    if(current.left){
      queue.push(current.left)
    }
    if(current.right){
      queue.push(current.right)
    }
  }
}

function breadthSearch(item, childProp='children'){
  var queue = [item]
  while(queue.length){
    var current = queue.shift()
    console.log(current)
    Array.from(queue[childProp]).map(item=>{
      queue.push(item)
    })
  }
}

// generate执行器
function run(gen){
  let g = gen()
  function next(data) {
    var result = g.next(data)
    if(result.done){
      return result.value
    }
    result.value.then(val=>{
      return next(val)
    })
  }
  next()
}

// 防抖
function debounce(fn, ms) {
  var timer = null
  return function () {
    const context = this
    const args = arguments
    if (timer) {
      window.clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(context, args)
      timer = null
    }, ms)
  }
}

// 节流
function throttle(fn,ms){
  var timer = null
  return function(){
    const context = this
    const args = arguments
    if(!timer){
      timer = setTimeout(() => {
        fn.apply(context, args)
        timer = null
      }, ms)
    }
  }
}

// 柯里化
function currify(fn, params = []) {
  return function (...args) {
    if (fn.length === params.length + args.length) {
      return fn(...params, ...args)
    } else {
      return currify(fn, [...params,...args])
    }
  }
}

// 实现bind
Function.prototype.bind2 = function(){
  var fn = this
  var context = Array.prototype.shift.call(arguments)
  var args = Array.prototype.slice.call(arguments)
  var resultFn = function(){
    return fn.apply(this instanceof resultFn?this:context, args.concat(Array.prototype.slice.call(arguments)))
  }
  resultFn.prototype = fn.prototype
  return resultFn
}

// setTimeout模拟setInterval
function myInterval(fn, ms) {
  var timer = {current:null}
  var exec = function(){
    return setTimeout(()=>{
      fn()
      timer.current = exec()
    },ms)
  }
  exec()
  return timer
}

function sendRequest(urls, limit , callback) {
  const finished = 0
  function req(){
    if(urls.length){
      var url = urls.shift();
      fetch(url).then(val=>{
        finished++
        req()
      }).catch(e=>{throw new Error(e)})
    }
    if(finished>=urls.length){
      callback()
    }
  }
  for(let i=0;i<limit;i++) {
    req()
  }
}