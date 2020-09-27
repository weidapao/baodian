/**
 * 二叉树
 * 前序遍历：根结点 ---> 左子树 ---> 右子树
 * 中序遍历：左子树---> 根结点 ---> 右子树
 * 后序遍历：左子树 ---> 右子树 ---> 根结点
 * 层次遍历：广度优先
 */

const tree = {
  value:1,
  left:{value:2,left:{value:4,left:null,right:null}}
}

function traversalTreeQian(tree, fn) {
  if (tree) {
    fn(tree.value)
    traversalTreeQian(tree.left,fn)
    traversalTreeQian(tree.right,fn)
  }
}

traversalTreeQian(tree,function(value){console.log(value)})

function traversalTreeMiddle(tree, fn) {
  if (tree) {
    traversalTreeMiddle(tree.left)
    fn(tree.value)
    traversalTreeMiddle(tree.right)
  }
}

function traversalTreeHou(tree, fn) {
  if (tree) {
    traversalTreeHou(tree.left)
    traversalTreeHou(tree.right)
    fn(tree.value)
  }
}

function traversalTreeMiddle(tree, fn) {
  var current = tree
  var stack = []
  while (true){
    while (current){
      stack.push(current)
      current = current.left
    }
    if(stack.length>0){
      current = stack.pop()
      fn(current.value)
      current = current.right
      continue
    }else{
      break
    }
  }
}

// 不使用递归中根序
const traverseRoodMiddle = (bTree, fn) => {
  const stack = []
  let current = bTree
  while (stack.length > 0 || current) {
    if (current) {
      stack.push(current)
      current = current.left
    } else {
      current = stack.pop()
      fn(current.value)
      current = current.right
    }
  }
}

// 不使用递归前根序
const traverseRoodQian = (bTree, fn) =>{
  const stack = []
  while(stack.length){
    var current = stack.pop()
    if(current.right){
      stack.push(current.right)
    }
    if(current.left){
      stack.push(current.left)
    }
  }
  
}

function traversalQian(tree, fn){
  if(tree){
    fn(tree.value)
    traversalQian(tree.left,fn)
    traversalQian(tree.right,fn)
  }
}

//广度遍历html节点
function breadthSearch(item, childProp='children'){
  const nodeList=[item]
  let index=0;
  while (index<nodeList.length){
      const node=nodeList[index++];
      if(node[childProp]){
          for(let k in node[childProp]){
              nodeList.push(node[childProp][k]);
          }
      }
  }
  return nodeList;
}

// 遍历DOM树并打印出DOM节点的tagName和className
function traversDom(boxNode){
  //创建一个队列，并把最外层放入队列
  let queue = [boxNode]
  // 遍历队列
  while (queue.length){
      // 获取队列第一个dom
      let node = queue.shift()
      // 打印dom信息
      pointNodeInfo(node)
      // 判断当前都没是否有子级，如果没有跳过 可能会有兄弟节点
      if(!node.children.length){
          continue
      }
      // 如果有遍历 子级节点 并插入到队列，继续循环
      Array.from( node.children ).forEach( item =>{
          queue.push(item)
      })

  }
}

// 深度遍历
function depthSearch(node,childProp='children'){
  const nodeList=[]
  const depthEach=function(item){
      nodeList.push(item);
      if(item[childProp]){
          for(let k in item[childProp]){
              depthEach(item[childProp][k]);
          }
      }
  }
  depthEach(node);
  return nodeList;
}

function depthSearchWithout(node,childProp='children'){
  var stack = [node];
  var current = node
  var result = []
  while (stack.length > 0) {
    var current = stack.pop()
    result.push(current)
    if (current[childProp]) {
      for(var i=current[childProp].length-1;i>-1;i--){
        stack.push(current[childProp][i])
      }
    }
  }
  return result
}