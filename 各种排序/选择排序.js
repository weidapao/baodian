/**
 * 选择排序
 * 每次都找到最小的然后放在第一个
 * 时间复杂度O(n2)
 */

function selectSort(arr){
  for(var i=0; i<arr.length; i++){
    for(var j=i+1; j<arr.length; j++){
      if(arr[i]>arr[j]){
        var temp;
        temp = arr[i];
        arr[i] = arr[j]
        arr[j] = temp;
      }
    }
  }
  return arr
}
var arr = [23,334,54,3445,5645,24,5634,5656,23,65,43,554]
console.log(selectSort(arr))