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

// 重写数组的方法
var arrMethods = Object.create(Array.prototype)
const arrProto = []
const methodList = ['push','pop']
methodList.forEach(function(item){
  arrProto[item] = function(){
    console.log('监听到push')
    return arrMethods[item].apply(this, arguments)
  }
})
let list = [1,2,3]
list.__proto__ = arrProto
list.push('4')

// 前根序
function qiangengxu(tree){
  var stack = [tree]
  while(stack.length){
    var current = stack.pop()
    console.log(current.val)
    if(current.right){
      stack.push(current.right)
    }
    if(current.left){
      stack.push(current.left)
    }
  }
}


// 中根序不递归
function travel(tree){
  var stack = []
  var current = tree
  while(stack.length||current){
    if(current){
      stack.push(current)
      current = current.left
    }else{
      current = stack.pop()
      console.log(current)
      current = current.right
    }
  }
}


function travel(tree) {
  var stack = []
  var current = tree
  while (stack.length > 0 || current) {
    if (current) {
      stack.push(current)
      current = current.left
    } else {
      current = stack.pop()
      console.log(current)
      current = current.right
    }
  }
}

function quick(arr,start,end){
  var middleVal = arr[Math.floor((start + end) / 2)]
  let i = start
  let j = end
  while(i<=j){
    if(arr[i]<middleVal){
      i++
    }
    if(arr[j]>middleVal){
      j--
    }
    if(i<=j){
      var temp = arr[i]
      arr[i] = arr[j]
      arr[j] = temp
      i++
      j--
    }
  }
  return i
}

function quickSort(arr,start,end){
  if(arr.length>1){
    var index = quick(arr,start,end)
    if(index-1>start){
      quickSort(arr,start,index-1)
    }
    if(index<end){
      quickSort(arr,index,end)
    }
  }
  return arr
}

function debounce(fn,delay){
  let timeId = null
  return function(){
    const context = this
    let args = arguments;
    if(timeId) clearTimeout(timeId)
    timeId = setTimeout(()=>{
      fn.apply(context,args)
      timeId = null
    },delay)
  }
}

function throttle(fn,delay){
  let timeId = null
  return function(){
    const context = this
    let args = arguments;
    if(!timeId){
      timeId = setTimeout(()=>{
        fn.apply(context,args)
        timeId = null
      },delay)
    }
  }
}

function currify(fn,params=[]){
  return function(...args){
    if(args.length+params.length===fn.length){
      return fn(...params,...args)
    }else{
      return currify(fn,[...params,...args])
    }
  }
}

function compose() {
  var fns = [].slice.call(arguments)
  return function (initialArg) {
      var res = initialArg
      for (var i = fns.length - 1; i > -1; i--) {
          res = fns[i](res)
      }
      return res
  }
}

// 写
function myInterval(fn, ms) {
  var timeId = null
  const exec = function () {
    return setTimeout(() => {
      fn.apply(null)
      timeId = exec()
    }, ms)
  }
  timeId = exec()
  return timeId
}

Function.prototype.bind2 = function(){
  var context = arguments[0]
  var args = [].slice.call(arguments,1)
  var fn = this
  var resultFn = function(){
    fn.apply(this instanceof resultFn?this:context, args.concat([].slice.call(arguments)))
  }
  resultFn.prototype = fn.prototype
  return resultFn
}

// Dog.prototype = Object.create(Animal.prototype)
function temp() {}
temp.prototype = Animal.prototype
Dog.prototype = new temp()

// 112. 路径总和
var hasPathSum = function (root, sum) {
  var result = false
  if (!root) return result
  var stack = [{ node: root, total: 0 }]
  while (stack.length) {
    var current = stack.pop()
    var total = current.node.val + current.total
    if (current.node.right) {
      stack.push({ node: current.node.right, total: total })
    }
    if (current.node.left) {
      stack.push({ node: current.node.left, total: total })
    }

    if (!current.node.left && !current.node.right && total == sum) {
      result = true
    }
  }
  return result
}

const combinationSum2 = (candidates, target) => {
  candidates.sort((a,b) => a - b ); // 升序排序
  const res = [];

  const dfs = (start, temp, sum) => { // start是索引 当前选择范围的第一个
    if (sum >= target) {        // 爆掉了，不用继续选了
      if (sum == target) {      // 满足条件，加入解集
        res.push(temp.slice()); // temp是地址引用，后续还要用，所以拷贝一份
      }
      return;                   // 结束当前递归
    }
    for (let i = start; i < candidates.length; i++) {             // 枚举出选择
      if (candidates[i - 1] == candidates[i] && i - 1 >= start) { // 当前选项和隔壁选项一样，跳过
        continue;
      }
      temp.push(candidates[i]);              // 作出选择
      dfs(i + 1, temp, sum + candidates[i]); // 递归，向下选择，并更新sum
      temp.pop();                            // 撤销选择，
    }
  };

  dfs(0, [], 0);
  return res;
};

// 广度优先