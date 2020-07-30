function myPromise(executor) {
  var self = this
  self.data = null
  self.status = 'pending'
  self.onResolvedCallback = []
  self.onRejectedCallback = []
  function resolve(value) {
    if(self.status==='pending'){
      self.status = 'resolved'
      self.onResolvedCallback.forEach(item=>{
        item(value)
      })
    }
  }
  function reject(reason) {
    if(self.status==='pending'){
      self.status = 'rejected'
      self.onRejectedCallback.forEach(item=>{
        item(reason)
      })
    }
  }
  try {
    executor(resolve, reject)
  } catch (err) {
    reject(err)
  }
}

Promise.prototype.then = function(onResolved, onRejected) {
  var self = this
  var promise2
  // 根据标准，如果then的参数不是function，则我们需要忽略它，此处以如下方式处理
  onResolved = typeof onResolved === 'function' ? onResolved : function(v) {return v} // 值可以穿透
  onRejected = typeof onRejected === 'function' ? onRejected : function(r) {return r}
  if (self.status === 'resolved') {
    return promise2 = new Promise(function(resolve, reject) {
      try{
        var x = onResolved(self.data)
        if(x instanceof Promise){
          x.then(resolve,reject)
        }else{
          resolve(x) 
        }
      }catch(e){
        reject(e)
      }
    })
  }

  if (self.status === 'rejected') {
    return promise2 = new Promise(function(resolve, reject) {
      try{
        var x = onRejected(self.data)
        if(x instanceof Promise){
          x.then(resolve,reject)
        }else{
          reject(x) 
        }
      }catch(e){
        reject(e)
      }
    })
  }

  if (self.status === 'pending') {
    return promise2 = new Promise(function(resolve, reject) {
      self.onResolvedCallback.push(function (value) {
        try{
          var x = resolve(value)
          if(x instanceof promise){
            x.then(resolve, reject)
          }
        }catch(e){
          reject(e)
        }
      })
      self.onRejectedCallback.push(function (reason) {
        try {
          var x = onRejected(self.data)
          if (x instanceof Promise) {
            x.then(resolve, reject)
          }
        } catch (e) {
          reject(e)
        }
      })
    })
  }
} 

// 为了下文方便，我们顺便实现一个catch方法
Promise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected)
}