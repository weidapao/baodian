function merge(left, right) {
  let i = 0
  let j = 0
  let result = []
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i])
      i++
    } else {
      result.push(right[j])
      j++
    }
  }
  return result.concat(left.slice(i), right.slice(j))
}

function mergeSort(arr) {
  if (arr.length > 1) {
    var mid = Math.floor(arr.length / 2)
    var left = arr.slice(0, mid)
    var right = arr.slice(mid, arr.length)
    return merge(mergeSort(left), mergeSort(right))
  }
  return arr
}

function flattenDeep(arr, deep = 1) {
  return deep > 0
    ? arr.reduce((a, b) => {
        return a.concat(Array.isArray(b) ? flattenDeep(b, deep - 1) : b)
      }, [])
    : arr.slice()
}

function flattenDeep2(arr) {
  var stack = [...arr]
  var result = []
  while (stack.length) {
    var next = stack.pop()
    if (Array.isArray(next)) {
      stack.push(...next)
    } else {
      result.push(next)
    }
  }
  return result.reverse()
}

console.log(flattenDeep2([1, 2, 3, [4, 2, [7, 8], 5]], 1))

Function.prototype.bind2 = function() {
  var fn = this
  var context = arguments[0]
  var args = [].slice.call(arguments,1)
  var resultFn = function(){
    return fn.apply( this instanceof resultFn?this:context, args.concat([].slice.call(arguments)))
  }
  resultFn.prototype = fn.prototype
  return resultFn
}

Promise.all = function (promises) {
  return new Promise(function (resolve, reject) {
    let result = []
    for (var i = 0; i < promises.length; i++) {
      !(function (i) {
        promises[i].then(
          (value) => {
            result.push(value)
            if (result.length === promises.length) {
              resolve(result)
            }
          },
          (error) => {
            reject(error)
          }
        )
      })(i)
    }
  })
}

Promise.race2 = function (promises) {
  return new Promise((resolve, reject) => {
    var isend = false
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then(
        (value) => {
          !isend && resolve(value)
          isend = true
        },
        (err) => {
          !isend && reject(err)
          isend = true
        }
      )
    }
  })
}

Promise.allSettled = function (promises) {
  return Promise.all(
    promises.map((item) => {
      return item.then(
        (value) => {
          return { status: 'ok', value }
        },
        (err) => {
          return { status: 'error', error: err }
        }
      )
    })
  )
}

function debounce(callback, wait) {
  let timer = null
  return function () {
    const context = this
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      callback.apply(context, arguments)
      timer = null
    }, wait)
  }
}

function throttle2(callback, wait) {
  let previous = 0
  return function() {
    const context = this
    let now = Date.now()
    if(now-previous>wait) {
      previous = now
      callback.apply(context, arguments)
    }
  }
}

function throttle2(callback, wait) {
  let timer = null
  return function() {
    let context = this;
      let args = arguments;
    if(!timer) {
      timer = setTimeout(()=>{
        callback.apply(context, args)
        timer = null
      },wait)
    }
  }
}

function currify(fn,params=[]){
  return function(...args){
    if(params.length+args.length===fn.length){
      return fn(...params,...args)
    }else{
      return currify(fn,[...args,...params])
    }
  }
}

function test(a,b,c){
  console.log(a,b,c)
}
currify(fn,1,2)

function currify(fn, params = []) {
  return function (...args) {
    if (fn.length === params.length + args.length) {
      return fn(...params, ...args)
    }
    return currify(fn, [...params, ...args])
  }
}

function maopao(arr){
for(i=arr.length; i>0; i--){
  for(j=0; j < i-1;j++){
    if(arr[j]>arr[j+1]){
      var temp = arr[j]
      arr[j] = arr[j+1]
      arr[j+1] = temp
    }
  }
}
return arr
}
maopao([23,334,54,3445,5645,24,5634,5656,23,65,43,554])

// 深拷贝
let cache = []
function deepClone(source){
  let dist
  const index = cache.findIndex((item) => {
    return item[0] === source
  })
  if(index>-1){
    console.log('有缓存')
    dist = cache[index][1]
    return dist
  }
  if(source instanceof Object){
    if(source instanceof Array){
      dist = []
    }else if(source instanceof RegExp){
      dist = new RegExp(source.source, source.flags)
    }else if(source instanceof Date){
      dist = new Date(source)
    }else if(source instanceof Function){
      dist = function(){
        return source.apply(this, arguments)
      } 
    }else{
      dist = {}
    }
    cache.push([dist,source])
    for(let i in source){
      dist[i] = deepClone(source[i])
    }
    return dist
  }else{
    return source
  }
}

function traversDom(root){
  var stack = [root]
  while(stack.length){
    var current = stack.shift()
    if(current){
      parseInfo(current)
    }
    if(current.childNodes.length){
      stack.push(root.childNodes)
    }
  }
}

// 前根序
const traverseRoodQian = (bTree, fn)=>{
  var current = bTree
  var stack = []
  while(stack.length>0||current){
    if(current){
      fn(current.value)
      stack.push(current)
      current = current.left
    }else{
      current = stack.pop()
      current = current.right
    }
  }
}

const traverseRoodMiddle = (bTree, fn)=>{
  var current = bTree
  var stack = []
  while(stack.length>0||current){
    if(current){
      // fn(current.value)
      stack.push(current)
      current = current.left
    }else{
      current = stack.pop()
      fn(current.value)
      current = current.right
    }
  }
}

const tree = {
  value:1,
  left:{value:2,left:{value:4,left:null,right:null}}
}

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var insertionSortList = function(head) {
    var stack = [head]
    var current = head
    while (current.next){
      stack.push(current.next)
      current = current.next
      if(!current){
        for(let i = 1; i <stack.length; i++){
          let count = i
          while(count>0){
            if(stack[count].val<stack[count-1].val){
              var temp = stack[count].val
              stack[count].val = stack[count-1].val
              stack[count-1].val = temp
            }
            count--
          }
        }
      }
    }
    return head
};