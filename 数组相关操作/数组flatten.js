var arr1 = [1, 2, 3, [1, 2, 3, 4, [2, 3, 4]]]

// 不带深度
function flatten(arr) {
  return arr.reduce((a, b) => {
    // return Array.isArray(b) ? a.concat(flatten(b)) : a.concat(b);
    return a.concat(Array.isArray(b) ? flatten(b) : b);
  }, []);
};

// 带深度
function flattenDeep(arr,deep=1) {
  return deep>0?arr.reduce((a, b) => {
    // return Array.isArray(b) ? a.concat(flatten(b)) : a.concat(b);
    return a.concat(Array.isArray(b) ? flattenDeep(b,deep-1) : b);
  }, []):arr.slice();
};

function flatten3(arr) {
  return !Array.isArray(arr) ? arr : [].concat.apply([], arr.map(flatten3));
}