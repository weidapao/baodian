/**
 * 计数排序
 * 新建一个数组，统计每个数字出现的次数
 * 假设我们有[1,2,3,1,0,4]这六个数，这里面最大的值为4，
 * 那么我们创建一个长度为4的数组，每个元素默认为0。
 * 这相当于选举排序，一共有6个投票箱，1就投1号箱，0就投入0号箱。
 * 这些箱的所有数依次出来，放到新数组，就神奇地排好序了
 * 负数处理
 */
function countSort(arr){
  var max = arr[0]
  var min = arr[0]
  var result = []
  for(var i = 0; i < n; i++){
    if(arr[i] > max){
        max = arr[i] 
    }
    if(arr[i] < min){
        min = arr[i]
    }
  }
  var countArr = new Array(max-min+1).fill(0)
  for(var i = 0; i <arr.length; i++){
    countArr[arr[i]-min]++
  }
  for(var i = 0; i <countArr.length;i++){
    while(countArr[i]>0){
      result.push(i+min)
      countArr[i]--
    }
  }
  return result
}