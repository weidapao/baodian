// 3
var lengthOfLongestSubstring = function(s) {
  var result = 0
  var currentArr = []
  for(var i = 0; i < s.length; i++) {
    const index = currentArr.indexOf(s[i])
    if(index<0){
      currentArr.push(s[i])
    }else{
      currentArr.splice(0,index+1)
      currentArr.push(s[i])
    }
    result = Math.max(result, currentArr.length)
  }
  return result
};

// 70
var climbStairs = function(n) {
  if(n===1) return 1
  if(n===2) return 2
  var dp = [0,1,2]
  for(var i = 3; i <= n;i++){
    dp[i] = dp[i-1]+dp[i-2]
  }
  return dp[n]
};

// 53
var maxSubArray = function(nums) {
  var result = nums[0]
  var dp = [nums[0],Math.max(nums[1],nums[0]+nums[1])]
  var result = Math.max(dp[0],dp[1])
  for (var i = 2; i < nums.length; i++) {
    dp[i] = Math.max(dp[i-1],dp[i-1]+nums[i])
    result = Math.max(dp[i],result)
  }
  return result
};

// 15 三数之和 没看懂
var threeSum = function(nums) {
  nums.sort((a,b)=>a-b);
  const result = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) return result;
    if(i>0&&nums[i-1] === nums[i]) continue;
    let start = i+1
    let end = nums.length - 1
    while (start < end) {
      var sum = nums[start]+nums[end]+nums[i]
      if(sum===0){
        result.push([nums[i],nums[start],nums[end]])
        while(start<end&&nums[start+1]===nums[start]){
          start++
        }
        while(start<end&&nums[end-1]===nums[end]){
          end--
        }
        start++;
        end--;
      }
      if(sum<0){
        start++
      }
      if(sum>0){
        end--
      }
    }
  }
  return result
};

// 152乘积最大子数组
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function(nums) {
  if(nums.length===1) return nums[0]
  var dpMax = [nums[0],Math.max(nums[1],nums[0]*nums[1])]
  var dpMin = [nums[0],Math.min(nums[1],nums[0]*nums[1])]
  var result = Math.max(dpMax[0],dpMax[1])
  for (i = 2; i < nums.length; i++) {
    dpMax[i] = Math.max(nums[i],nums[i]*dpMax[i-1],nums[i]*dpMin[i-1])
    dpMin[i] = Math.min(nums[i],nums[i]*dpMax[i-1],nums[i]*dpMin[i-1])
    result = Math.max(result,dpMax[i])
  }
  return result
};

// 17.14最小k个数
var smallestK = function (arr, k) {
  if (k === 0) return [];
  arr.sort((a, b) => a - b);
  return arr.slice(0, k);
};

// 113 路径总和
var pathSum = function(root, sum) {
  var result = []
  if(!root) return result
  var stack = [{node:root,res:[],total:0}]
  while(stack.length){
      var node = stack.pop()
      var total = node.total+node.node.val
      console.log(total)
      node.res.push(node.node.val)
      var res = node.res
      if(node.node.left){
      stack.push({node:node.node.left,res:res.slice(),total:total})
      }
      if(node.node.right){
      stack.push({node:node.node.right,res:res.slice(),total:total})
      }
      if(!node.node.left&&!node.node.right&&total===sum){
          result.push(node.res)
      }

  }
  return result
};

// 剑指 Offer 63. 股票的最大利润
var maxProfit = function(prices) {
  var result = 0
  var min = prices[0]
  for(i=1;i<prices.length;i++){
      min = Math.min(prices[i],min)
      result = Math.max(prices[i]-min,result)
  }
  return result
};

//组合总和 II
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
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

// 951. 翻转等价二叉树
var flipEquiv = function (root1, root2) {
  if (!root1 && root2) {
    return false
  }
  if (!root2 && root1) {
    return false
  }
  if (root1!==null && root2!==null&&root1.val !== root2.val) {
    return false
  }
  if(!root1&&!root2){
    return true
  }
  return (flipEquiv(root1.left, root2.left) && flipEquiv(root1.right, root2.right)) || (flipEquiv(root1.left, root2.right) && flipEquiv(root1.right, root2.left))
}

//147. 对链表进行插入排序
var insertionSortList = function(head) {
  if(!head) return head
  var stack = [head]
  var current = head
  while (current.next){
    stack.push(current.next)
    current = current.next
  }
  for(let i = 1; i <stack.length; i++){
    let count = i
    while(count>0){
      if(stack[count].val<stack[count-1].val){
        var temp = stack[count].val
        stack[count].val = stack[count-1].val
        stack[count-1].val = temp
      }
      count--
    }
  }
  return head
};

// 剑指 Offer 47. 礼物的最大价值
var maxValue = function(grid) {
  var dp = grid.map(item=>{
    return []
  })
  var kLength = grid[0].length
  for (i = 0; i < grid.length; i++) {
    for (j = 0; j < kLength; j++) {
      if(j===0&&i===0){
        dp[i][j] = grid[0][0]
        continue
      }
      if(j===0){
        dp[i][j] = dp[i-1][j]+grid[i][j]
        continue
      }
      if(i===0){
        dp[i][j] = dp[i][j-1]+grid[i][j]
        continue
      }
      dp[i][j] = Math.max(dp[i-1][j],dp[i][j-1])+grid[i][j]
    }
  }
  return dp[grid.length-1][kLength-1]
};

// 714. 买卖股票的最佳时机含手续费
var maxProfit = function(prices, fee) {
  var dp = prices.map(item=>{
    return []
  })
  dp[0][0] = 0
  dp[0][1] = 0 - prices[0] - fee
  for(i=1;i<prices.length;i++){
    dp[i][0] = Math.max(dp[i-1][0],dp[i-1][1]+prices[i])
    dp[i][1] = Math.max(dp[i-1][1],dp[i-1][0] - prices[i] - fee)
  }
  return Math.max(dp[prices.length-1][0],dp[prices.length-1][1])
};

// 198. 打家劫舍
var rob = function(nums) {
  if(nums.length===0) return 0
  if(nums.length===1) return nums[0]
  var dp = [nums[0],Math.max(nums[0],nums[1])]
  for(i=2;i<nums.length;i++){
    dp[i] = Math.max(nums[i]+dp[i-2],dp[i-1])
  }
  return dp[dp.length-1]
 };

 // 面试题 08.01. 三步问题
 var waysToStep = function(n) {
  var dp = [1,2,4]
 for(i=3;i<=n;i++){
  dp[i] = (dp[i-1] + dp[i-2] + dp[i-3])%1000000007
 }
 return dp[n-1]
};

// 面试题 04.08. 首个共同祖先
var lowestCommonAncestor = function(root, p, q) {
  if(!root||p===root||q===root) return root;
  var left = lowestCommonAncestor(root.left, p, q);
  var right = lowestCommonAncestor(root.right, p, q);
  if(left&&right) return root;
  if(left) return left
  if(right) return right
};

// 39
var combinationSum = function(candidates, target) {
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
      temp.push(candidates[i]);              // 作出选择
      dfs(i, temp, sum + candidates[i]); // 递归，向下选择，并更新sum
      temp.pop();                            // 撤销选择，
    }
  };

  dfs(0, [], 0);
  return res;

};

// 1379. 找出克隆二叉树中的相同节点
var getTargetCopy = function(original, cloned, target) {
  var stack = []
  var current = cloned
  while(stack.length||current){ 
    if(current){
      if(current.val === target.val){
        return current
      }
      stack.push(current)
      current = current.left
    }else{
      current = stack.pop()
      current = current.right
    }
  }
};

// 475. 供暖器
var findRadius = function(houses, heaters) {
  var result = 0
  for(i=0;i<houses.length;i++){
    var s = -1
    for(k=0;k<heaters.length;k++){
      if(k===0){
        s = Math.abs(heaters[k]-houses[i])
      }else{
        s = Math.min(Math.abs(heaters[k]-houses[i]),s)
      }
    }
    if(i===0){
      result = s
    }else{
      result = Math.max(s,result)
    }
  }
  return result
};

// 112. 路径总和
var hasPathSum = function(root, sum) {
  var result = false;
  if(!root) return result;
  var stack = [{node:root,total:0}]
  while(stack.length){
    var current = stack.pop()
    var total = current.node.val+current.total
    if(current.node.right){
      stack.push({node:current.node.right,total:total})
    }
    if(current.node.left){
      stack.push({node:current.node.left,total:total})
    }
    
    if(!current.node.left&&!current.node.right&&total==sum){
      result = true
    }
  }
  return result
  };

// 42
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
  var dp = [nums[0]]
  var max = nums[0]
  for(i=1;i<nums.length;i++){
      dp[i] = Math.max(dp[i-1]+nums[i],nums[i])
      max = Math.max(max,dp[i])
  }
  return max
};

// 118
var generate = function(numRows) {
  if( numRows === 0 ) return []
  let res = [], i = 0, len = numRows.length;
  while( i < numRows){
      let temp = [1]
      for(let j=1; j<i; j++){
          const row = res[i-1]
          temp.push( row[j-1] + row[j] )
      }
      if(i>0) temp.push(1)
      res.push(temp)
      i++
  }
  return res
};

// 226
var invertTree = function(root) {
  if(!root) return root
  var stack = [root]
  while(stack.length){
    var current = stack.shift()
    var temp = current.left
    current.left = current.right
    current.right = temp
    if(current.left){
      stack.push(current.left)
    }
    if(current.right){
      stack.push(current.right)
    }
  }
  return root
};

// 1 两数之和
const twoSum = (nums, target) => {
  const prevNums = {};                    // 存储出现过的数字，和对应的索引               

  for (let i = 0; i < nums.length; i++) { // 遍历元素   
    const curNum = nums[i];               // 当前元素   
    const targetNum = target - curNum;    // 满足要求的目标元素   
    const targetNumIndex = prevNums[targetNum]; // 在prevNums中获取目标元素的索引
    if (targetNumIndex !== undefined) {   // 如果存在，直接返回 [目标元素的索引,当前索引]
      return [targetNumIndex, i];
    } else {                              // 如果不存在，说明之前没出现过目标元素
      prevNums[curNum] = i;               // 存入当前的元素和对应的索引
    }
  }
}

function getRoutCount(m, n) {
  if (m == 0 && n == 0) return 0;
  if (m == 0 && n == 1) return 1;
  if (m == 1 && n == 0) return 1;
  if (m == 0) return getRoutCount(m, n - 1);
  if (n == 0) return getRoutCount(m - 1, n);
  return getRoutCount(m - 1, n) + getRoutCount(m, n - 1);
}
