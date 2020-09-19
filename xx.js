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
console.log(threeSum([-1,0,1,2,-1,-4,-2,-3,3,0,4]))
[-1, -1, -2, -3, -4, 0, 0, 1, 2, 3, 4]