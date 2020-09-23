const { func } = require("prop-types");

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

const memo = fn=>{
  let pre
  let result
  return function(x){
    if(pre===x){
      return result
    }
    pre = x
    result = fn.call(this,x)
    return result
  }
}