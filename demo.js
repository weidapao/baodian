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

function bind() {
  var fn = this
  var thisArgs = arguments[0]
  var args = [].slice.call(arguments, 1)
  var resultFn = function () {
    fn.apply(this instanceof resultFn ? this : thisArgs, args.concat(Array.prototype.slice.call(arguments)))
  }
  resultFn.prototype = this.prototype
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