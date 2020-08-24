// promise all

// promise race

// promise allsettled

// 防抖

// 节流

// 快排

// 数组扁平化
function flatten(arr){
  return arr.reduce((a,b)=>{
    return a.concat(Array.isArray(b)?flatten(b):b)
  },[])
}

// 深拷贝

// call

// bind

// redux