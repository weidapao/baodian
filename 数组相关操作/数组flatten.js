var arr1 = [1, 2, 3, [1, 2, 3, 4, [2, 3, 4]]]

// 不带深度
function flatten(arr) {
  return arr.reduce((a, b) => {
    // return Array.isArray(b) ? a.concat(flatten(b)) : a.concat(b);
    return a.concat(Array.isArray(b) ? flatten(b) : b);
  }, []);
};

// 带深度
function flattenDeep(arr,deep=1) {
  return deep>0?arr.reduce((a, b) => {
    // return Array.isArray(b) ? a.concat(flatten(b)) : a.concat(b);
    return a.concat(Array.isArray(b) ? flattenDeep(b,deep-1) : b);
  }, []):arr.slice();
};

// 用栈
 
// 注意：深度的控制比较低效，因为需要检查每一个值的深度
// 也可能在 shift / unshift 上进行 w/o 反转，但是末端的数组 OPs 更快
var arr1 = [1,2,3,[1,2,3,4, [2,3,4]]];
function flatten(input) {
  const stack = [...input];
  const res = [];
  while (stack.length) {
    // 使用 pop 从 stack 中取出并移除值
    const next = stack.pop();
    if (Array.isArray(next)) {
      // 使用 push 送回内层数组中的元素，不会改动原始输入
      stack.push(...next);
    } else {
      res.push(next);
    }
  }
  // 反转恢复原数组的顺序
  return res.reverse();
}


const flatten = (arr)=>{
  return arr.reduce((a,b)=>{
    return a.concat(Array.isArray(b)?flatten(b):b)
  },[])
}