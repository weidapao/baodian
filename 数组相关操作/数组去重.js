// set去重
[...new Set(arr)] 

// sort去重
function unique(arr) {
  if (!Array.isArray(arr)) {
      console.log('type error!')
      return;
  }
  arr = arr.sort()
  var arrry= [arr[0]];
  for (var i = 1; i < arr.length; i++) {
      if (arr[i] !== arr[i-1]) {
          arrry.push(arr[i]);
      }
  }
  return arrry;
}

// 对象的属性不能相同
function unique(arr) {
  if (!Array.isArray(arr)) {
      console.log('type error!')
      return
  }
  var arrry= [];
   var  obj = {};
  for (var i = 0; i < arr.length; i++) {
      if (!obj[arr[i]]) {
          arrry.push(arr[i])
          obj[arr[i]] = 1
      } else {
          obj[arr[i]]++
      }
  }
  return arrry;
}

// 利用Map数据结构去重
function arrayNonRepeatfy(arr) {
  let map = new Map();
  let array = new Array();  // 数组用于返回结果
  for (let i = 0; i < arr.length; i++) {
    if(map .has(arr[i])) {  // 如果有该key值
      map .set(arr[i], true); 
    } else { 
      map .set(arr[i], false);   // 如果没有该key值
      array .push(arr[i]);
    }
  } 
  return array ;
}