// 事件委托
// 思路是点击 span 后，递归遍历 span 的祖先元素看其中有没有 ul 里面的 li
function delegate(element, eventType, selector, fn) {
  element.addEventListener(eventType, e => {
    let el = e.target
    while (!el.matches(selector)) {
      if (element === el) {
        el = null
        break
      }
      el = el.parentNode
    }
    el && fn.call(el, e, el)
  })
  return element
}

// 请实现如下函数，可以批量请求数据。所有的url地址都在urls参数中，同时可以通过max控制请求的并发度，当所有请求结束后，调用callback回调函数。请求直接用fetch就可以
function sendRequest(urls, limit , callback) {
  const finished = 0
  function req(){
    if(urls.length){
      var url = urls.shift();
      fetch(url).then(val=>{
        finished++
        req()
      }).catch(e=>{throw new Error(e)})
    }
    if(finished>=urls.length){
      callback()
    }
  }
  for(let i=0;i<limit;i++) {
    req()
  }
}