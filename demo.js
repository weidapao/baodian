var p1 = function(){
  return Promise.reject(1)
  }
p1().then(a=>{
  return new Promise(function(resolve, reject){
    reject(2222)
  })
}).then(a=>{console.log(2,a)},a=>{console.log(4,a)})