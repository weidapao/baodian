const myInstanceof = function (left, right) {
  right = right.prototype
  left = left.__proto__
  while (true) {
    if (left === null) {
      return false
    }
    if (right === left) {
      return true
    }
    left = left.__proto__
  }
}

console.log(myInstanceof({},{b:1}))