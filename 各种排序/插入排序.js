/**
 * 插入排序
 * O(n2)
 * 默认第一个元素是排好序的，从第二个元素开始和左边的元素比较，插入合适的位置
 */

function insertSort(arr){
  for(var i = 1; i < arr.length;i++){
    var count = i
    while(count>0){
      if(arr[count]<arr[count-1]){
        var temp = arr[count]
        arr[count] = arr[count-1]
        arr[count-1] = temp
      }
      count--
    }
  }
  return arr
}