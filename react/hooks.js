// hooks规则
// 只在最顶层使用 Hook，不要在循环，条件或嵌套函数中调用 Hook
// 只在 React 函数中调用 Hook，react函数组件和自定义hook

// hook原理
// 每个useState,第一次调用的时候，会往setter数组里push一个setter，state数组里push一个state

// 简单实现useState，useEffect
// 用数组，来解决 Hooks 的复用问题
let stateList = []
let cursor = 0
function useState(initalState) {
  const cur = cursor
  stateList[cursor] = stateList[cursor] || initalState;
  function setter(val) {
    stateList[cur] = val;
    render();
  }
  return [stateList[cursor++], setter];
}
function useEffect(callback, depArray) {
  const hasNoDeps = !depArray; // 如果 dependencies 不存在
  let flag = false;
  if (stateList[cursor]) {
    depArray.map((item, i) => {
      if (item !== stateList[i]) {
        flag = true
      }
    })
  }
  const hasChangedDeps = stateList[cursor]?flag:true  // 第一次执行stateList[cursor]还没有值，所以是true
  if(hasNoDeps || hasChangedDeps){
    callback()
    stateList[cursor] = depArray
  }
  cursor++;
}
