# promise
## 简介
对通过new生成的promise对象为了设置其值在 resolve(成功) / reject(失败)时调用的回调函数 可以使用promise.then() 实例方法。
```
promise.then(onFulfilled, onRejected)
```
## resolve(成功)时
onFulfilled 会被调用
## reject(失败)时
onRejected 会被调用

## Promise的状态
### Fulfilled
resolve(成功)时。此时会调用 onFulfilled
### Rejected
reject(失败)时。此时会调用onRejected
### Pending
promise对象刚被创建后的初始化状态
promise对象的状态，从Pending转换为Fulfilled或Rejected之后， 这个promise对象的状态就不会再发生任何变化
***Settled(不变的)***
resolve(成功) 或 reject(失败)

## Promise.resolve
Promise.resolve(42); 可以认为是以下代码的语法糖
```
new Promise(resolve=>{
  resolve(42)
})
```
返回值也是一个promise对象

## Thenable
thenable指的是一个具有 .then 方法的对象

## Promise.reject
Promise.reject(new Error("出错了")) 就是下面代码的语法糖形式
```
new Promise(function(resolve,reject){
    reject(new Error("出错了"));
});
```

## 每次调用then都会返回一个新创建的promise对象
实际上不管是 then 还是 catch 方法调用，都返回了一个新的promise对象

## Promise.all
- 方法返回一个 Promise 实例，
- 所有的 promise 都“完成（resolved）”或参数中不包含 promise 时,回调完成（resolve）；
- 如果参数中  promise 有一个失败（rejected），此实例回调失败（reject），失败的原因是第一个失败 promise 的结果
- 成功的时候返回的是一个结果数组，而失败的时候则返回最先被reject失败状态的值

## Promise.race
Promise.race 只要有一个promise对象进入 FulFilled 或者 Rejected 状态的话，就会继续进行后面的处理。不会取消其他promise对象的执行

## 让Promise等待指定时间
delayPromise.js
```
function delayPromise(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
}
```

##  Promise.race中的超时
用Promise.race方法实现请求超时
- 定义一个promis xx秒后抛出异常
```
function delayPromise(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
}
function timeoutPromise(promise, ms) {
    var timeout = delayPromise(ms).then(function () {
            throw new Error('Operation timed out after ' + ms + ' ms');
        });
    return Promise.race([promise, timeout]);
}
```

## Promise顺序处理
### 将promise串连成一个任务队列
```
function promiseList(ajaxArray){
  let resultList = [];
  let p = Promise.resolve()
  ajaxArray.forEach(promise => {
    p = p.then(promise).then(data=>{
      resultList.push(data)
      return resultList
    })
  })
  return p
}
```
### async和await
```
async function readFiles(files) {
  for(const file of files) {
    await readFile(file);
  }
};
```

