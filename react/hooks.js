// hooks规则
// 只在最顶层使用 Hook，不要在循环，条件或嵌套函数中调用 Hook
// 只在 React 函数中调用 Hook，react函数组件和自定义hook

// hook原理
// 每个useState,第一次调用的时候，会往setter数组里push一个setter，state数组里push一个state

// 简单实现useState，useEffect
// 用数组，来解决 Hooks 的复用问题
// useEffect会在组件渲染到屏幕之后执行,useLayoutEffect在所有的 DOM 变更之后同步调用 effect，在浏览器执行绘制之前同步更新，会阻塞
let memoizedState = []; // hooks 存放在这个数组
let cursor = 0; // 当前 memoizedState 下标

function useState(initialValue) {
  memoizedState[cursor] = memoizedState[cursor] || initialValue;
  const currentCursor = cursor;
  function setState(newState) {
    memoizedState[currentCursor] = newState;
    render();
  }
  return [memoizedState[cursor++], setState]; // 返回当前 state，并把 cursor 加 1
}

function useEffect(callback, depArray) {
  const hasNoDeps = !depArray;
  const deps = memoizedState[cursor];
  const hasChangedDeps = deps
    ? !depArray.every((el, i) => el === deps[i])
    : true;
  if (hasNoDeps || hasChangedDeps) {
    callback();
    memoizedState[cursor] = depArray;
  }
  cursor++;
}