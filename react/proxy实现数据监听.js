/**
 * Object.defineProperty 是对对象属性的劫持
   Proxy 是对整个对象劫持
   Object.defineProperty 无法监听新增和删除
   Object.defineProperty 无法监听数组部分方法需要重写
   Object.defineProperty 性能不好要对深层对象劫持要一次性递归
   Proxy 能正确监听数组方法
   Proxy 能正确监听对象新增删除属性
   Proxy 只在 getter 时才进行对象下一层属性的劫持 性能优化
   Proxy 兼容性不好
 */
function reactive(target = {}) {
  if (typeof target !== 'object' || target == null) {
    return target
  }

  const proxyConfig = {
    get(target, key, receiver) {
      const ownKeys = Reflect.ownKeys(target)
      if (ownKeys.includes(key)) {
        // dep.subs(watcher) // 添加监听
      }
      console.log(key);
      const result = Reflect.get(target, key, receiver)
      return reactive(result) // 只在 getter 时才再次劫持
    },
    set(target, key, val, receiver) {
      if (val === target[key]) {
        return
      }

      const ownKeys = Reflect.ownKeys(target)
      if (ownKeys.includes(key)) {
        // 已有值
      } else {
        // 新增值
      }

      const result = Reflect.set(target, key, val, receiver)
      // dep.noitfy() // 通知监听队列进行更新
      return result
    },
    deleteProperty(target, key) {
      const result = Reflect.deleteProperty(target, key)
      return result
    },
  }

  const observed = new Proxy(target, proxyConfig)
  return observed
}

function newOB(target){
  if (typeof target !== 'object' || target == null) {
    return target
  }
  return new Proxy(target, {
    get: function (target, propKey, receiver) {
      console.log(`getting ${propKey}!`);
      const result = Reflect.get(target, propKey, receiver)
      return reactive(result) 
    },
    set: function (target, propKey, value, receiver) {
      console.log(`setting ${propKey}!`);
      const result = Reflect.get(target, propKey,value, receiver)
      return reactive(result) 
    }
})
}

var obj = newOB({a:{b:1}})

console.log(obj.a.b)