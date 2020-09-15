/* 快速排序
* QuickSort
* 找一个中枢点，小于它的移到左边，大于它的移到右边，不停递归
* 两端两个指针，往中间移动，发现不满足的元素，就交换这两个元素的位置
（1）在数据集之中，选择一个元素作为"基准"（pivot）。
（2）所有小于"基准"的元素，都移到"基准"的左边；所有大于"基准"的元素，都移到"基准"的右边。
（3）对"基准"左边和右边的两个子集，不断重复第一步和第二步，直到所有子集只剩下一个元素为
*/

function swap(items, leftIndex, rightIndex) {
  var temp = items[rightIndex]
  items[rightIndex] = items[leftIndex]
  items[leftIndex] = temp
}

// 1,3,5,8,6,7,8,3,2,1
function partition(items, left, right) {
  var pivot = items[Math.floor((left + right) / 2)]
  var i = left
  var j= right
  while (i <= j) {
    while (items[i] < pivot) {
      i++
    }
    while (items[j] > pivot) {
      j--
    }
    if (i <= j) {
      swap(items, i, j)
      i++
      j--
    }
  }
  return i
}

function quickSort(items,left,right) {
  if(items.length>1){
    var index = partition(items,left,right)
    if(left<index-1){
      quickSort(items,left,index-1)
    }
    if(right>index){
      quickSort(items,index,right)
    }
  }
  return items
}

console.log(quickSort([23,334,54,3445,5645,24,5634,5656,23,65,43,554],0,11))

function quick(arr,left,right){
  var middleVal = arr[Math.floor((left + right) / 2)]
  var i = left
  var j = right
  while(i<=j){
    while(arr[i]<middleVal){
      i++
    }
    while(arr[j]>middleVal){
      j--
    }
    if(i<=j){
      var temp = arr[i]
      arr[i] = arr[j]
      arr[j] = temp
      i++
      j--
    }
  }
  return i
}
function quickSort2(arr,left,right){
  if(arr.length>1){
    var index = quick(arr,left,right)
    if(index-1>left){
      quickSort2(arr,left,index-1)
    }
    if(right>index){
      quickSort2(arr,index,right)
    }
  }
  return arr
}
console.log(quickSort2([23,334,54,3445,5645,24,5634,5656,23,65,43,554],0,11),'xxx')