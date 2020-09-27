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