// 乱序区间
function mergeLuan(arg){
	let arr = arg, result = [];
	arg.sort((a, b) => a[0] - b[0]); // 先根据第一位进性排序
	for(let i=0;i<arr.length;i++){
		if(result.length){
			let res = result[result.length - 1];
			if(res[1] > arr[i][0]){
				if(res[1] < arr[i][1]){
					result[result.length - 1][1] = arr[i][1]; // 如果前一个的第二位大于下一个的第一位,小于第二位,那么被下一个第二位代替
				}
			}else{
				result.push(arr[i])
			}
		}else{
			result.push(arr[i])
		}
	}
	return result
}

// 连续子数组最大和
function contMax(array) {
	if (array.length == 0)
		return 0
	var sum = array[0] //保存每组的和
	var maxSum = array[0] //连续子数组最大和
	for (var i = 1; i < array.length; i++) {
		sum = Math.max(sum + array[i], array[i]);
		maxSum = Math.max(sum, maxSum)
	}
	return maxSum
}

// 千分位
toLocaleString()

// 无重复最长子串
var lengthOfLongestSubstring = function(s) {
  let map = new Map(), max = 0
  for(let i = 0, j = 0; j < s.length; j++) {
      if(map.has(s[j])) {
          i = Math.max(map.get(s[j]) + 1, i)
      }
      max = Math.max(max, j - i + 1)
      map.set(s[j], j)
  }
  return max
};

// 对象转树
function convert2Tree(arr) {
  let result = null;
  const nodeIndex = new Map();
  arr.forEach((item) => {
    nodeIndex.set(item.id, item);
  });
  arr.forEach((item) => {
    if (!item.parentId) {
      result = nodeIndex.get(item.id);
    }
    const itemCache = nodeIndex.get(item.parentId);
    if (itemCache) {
      itemCache.children = itemCache.children || [];
      itemCache.children.push(item);
    }
  });
  return result;
}