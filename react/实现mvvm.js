// MVVM拆开来是Model-View-ViewModel
/**
 * model数据层
 * view视图层，对于前端就是HTML
 * ViewModel连接model和view,对Model进行修改的时候，ViewModel就会把修改自动同步到View层去,
 * 反之，亦然
 * vue采用办法数据劫持，对数据（Model）进行劫持，当数据发生变动时，数据会触发劫持时绑定的方法，对视图进行更新
 */
var data = {name: 'kindeng',obj:{a:1}};
observe(data);
// data.name = 'wzy'; // 哈哈哈，监听到值变化了 kindeng --> dmq
// console.log(data.name) 

function observe(data) {
  const keyList = Object.keys(data)
  keyList.map(item=>{
    let val = data[item]
    console.log(val)
    // observe(val)
    Object.defineProperty(data, item, {
      enumerable: true,
      configurable: true,
      get() {
        return value
      },
      set(value) {
        val = value
        console.log('set成功：'+value);
      }
    });
  })
}