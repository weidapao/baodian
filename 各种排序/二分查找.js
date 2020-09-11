/**
 * 二分查找
 */

function bsearch(array, low, high, target) {
  if (low > high) return -1
  var mid = Math.floor((low + high) / 2)
  if (array[mid] > target) {
    return bsearch(array, low, mid - 1, target)
  } else if (array[mid] < target) {
    return bsearch(array, mid + 1, high, target)
  } else {
    return mid
  }
}

function bsearchWithout(array, low, high, target) {
  if (low > high) return -1
  while (low <= high) {
    var mid = Math.floor((low + high) / 2)
    if (target === array[mid]) {
      return mid
    }
    if (target < array[mid]) {
      high = mid - 1
    }
    if (target > array[mid]) {
      low = mid + 1
    }
  }
  return -1
}

function bsearch2(array, low, high, target){
  if(low>high){
    return -1
  }
  var mid = Math.floor((low + high) / 2)
  if(array[mid]<target){
    return bsearch(array,mid+1,high,target)
  }
  if(array[mid]>target){
    return bsearch(array,low,mid-1,target)
  }
  return mid
}

function bsearchWithout2(array, low, high, target){
  if(low>high){
    return -1
  }
  while(low<=high){
    var mid = Math.floor((low + high) / 2)
    if(array[mid]<target){
      low = mid+1
      continue
    }
    if(array[mid]>target){
      high = mid-1
      continue
    }
    return mid
  }
}