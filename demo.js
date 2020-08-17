// O(n2)
Promise.race([new Promise(function(resolve, reject){
  setTimeout(function(){
    reject('超时了')
  },3000)
}),fetch('http://www.baidu.com')]).then(value =>console.log(value))