var s1 = () => {
  return Promise.resolve(1)
}

var s2 = () => {
  return Promise.resolve(2)
}

var s3 = () => {
  return Promise.reject(3)
}

// 实现Promise.allsettled
Promise.allsettled2 = (promiseList) => {
  return Promise.all(
    promiseList.map((pItem) => {
      return pItem.then(
        (value) => {
          return {
            status: 'ok',
            value: value,
          }
        },
        (err) => {
          return {
            status: 'error',
            error: err,
          }
        }
      )
    })
  )
}

// Promise.allsettled2([s1(), s2(), s3()]).then((value) => console.log(value))

Promise.resolve(1).then(value => console.log(value))
setTimeout(()=>{console.log(2)},0)
console.log('3')
// 3 1 2  promise是微任务，setTimeout是宏任务

var event1 = ()=>{
  return new Promise((res)=>{
    setTimeout(()=>{
      res('先发的')
    },5000)
  })
}
var event2 = ()=>{
  return new Promise((res)=>{
    setTimeout(()=>{
      res('后发的')
    },3000)
  })
}

var globalMark = 0

function request(fn){
  globalMark++
  var localMark = globalMark
  fn().then(val=>{
    if(globalMark===localMark){
      console.log(val)
    }
  })
}

request(event1)
request(event2)

// async await错误处理的办法，比try catch要好

function request(event){
  return new Promise((resolve, reject) =>{
    reject('错误')
  })
}

async function fn(){
 const result = await request().then(null,error =>{
   console.log(1)
   throw new Error(error)
 })
 console.log(1111,result)  // 抛出错误后不执行
 console.log(222222)       // 抛出错误后不执行
 
}

fn()