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
  let current = bTree
  while(stack.length>0 || current){
    if(current){
      fn(current.value)
      stack.push(current)
      current = current.left
    }else{
      current = stack.pop()
      current = current.right
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