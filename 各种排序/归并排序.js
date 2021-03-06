/*归并排序
归并排序（MERGE-SORT），分治策略
- 分(divide): 将问题分成一些小的问题然后递归求解
- 治(conquer): 分的阶段得到的各答案"修补"在一起
时间复杂度O(nlogn)
*/

function mergeSort(unsortArray){
  if(unsortArray.length<2){
    return unsortArray
  }
  const middleLength = Math.floor((unsortArray.length/2))
  const left = unsortArray.slice(0, middleLength)
  const right = unsortArray.slice(middleLength,unsortArray.length)
  return merge(mergeSort(left),mergeSort(right))
}

function merge(left, right) {
  const result = []
  let leftIndex = 0
  let rightIndex = 0
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] <= right[rightIndex]) {
      result.push(left[leftIndex])
      leftIndex++
    }
    if (left[leftIndex] > right[rightIndex]) {
      result.push(right[rightIndex])
      rightIndex++
    }
  }
  return result.concat(left.slice(leftIndex), right.slice(rightIndex))
}

console.log(mergeSort([23,334,54,3445,5645,24,5634,5656,23,65,43,554]))

function merge2(left, right) {
  var i = 0
  var j = 0
  var result = []
  while (i < left.length&&j<right.length) {
    if(left[i]<=right[j]){
      result.push(left[i])
      i++
    }
    if(left[i]>right[j]){
      result.push(right[j])
      j++
    }
  }
  return result.concat(left.slice(i),right.slice(j))
}

function mergeSort2(arr){
  if(arr.length>1){
    var mid = Math.floor(arr.length/2)
    var left = arr.slice(0,mid)
    var right = arr.slice(mid)
    return merge2(mergeSort2(left),mergeSort2(right))
  }
  return arr
}

console.log(mergeSort2([23,334,54,3445,5645,24,5634,5656,23,65,43,554]))