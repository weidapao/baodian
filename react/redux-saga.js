// 副作用：函数副作用指当调用函数时，除了返回函数值之外，还对主调用函数产生附加的影响。
// 例如修改全局变量（函数外的变量），修改参数或改变外部存储
// 发送一个 http 请求
// 更改文件系统
// 往数据库插入记录
// 使用LocalStorage进行本地存储
// 打印/log
// 获取用户输入
// DOM 查询

// 纯函数：函数与外界交换数据只有一个唯一渠道——参数和返回值
// 函数从函数外部接受的所有输入信息都通过参数传递到该函数内部
// 函数输出到函数外部的所有信息都通过返回值传递到该函数外部

// generator自执行
function run(gen) {
  let g = gen()
  function next(data) {
      let result = g.next(data)
      console.log(result)
      if (result.done) {
          return result.value
      }
      result.value.then((data) => next(data))
  }
  next()
}

function* nanshou() {
  const a = yield Promise.resolve(1)
  console.log(a)
  const b = yield Promise.resolve(2)
  console.log(b)
}
run(nanshou)

// 中间件实现
function ware({ dispatch, getState }) {
  return function (next) {
    return function (action) {
      next(action)
    }
  }
}

// 为什么用call
// 方便测试。
// promise的结果是一个请求的返回值，执行服务来测试不可行也不实用
// 实际上只要保证yield一个正确的函数，并且这个函数有着正确的参数
// 相比于直接调用异步函数，不如yield一条描述函数调用的信息
// 比较effect信息，比较fetch结果不可控
// middleware 将确保执行这些指令并将指令的结果回馈给 Generator
assert.deepEqual(
  iterator.next().value,
  call(Api.fetch, '/products'),
  "fetchProducts should yield an Effect call(Api.fetch, './products')"
)

/**
 * 
 * 框架: dva是个框架，集成了redux、redux-saga、react-router-redux、react-router
 * 快速初始化: 可以快速实现项目的初始化，不需要繁琐地配置
 * 简化开发：将initState、saga、reducer集成到一个model里面统一管理，避免文件散落在各个文件里面，便于快速查找与开发
 * 简洁的API：整个项目中只有dva、app.model、app.router、app.use、app.start几个API
 * 无缝对接：跟react的生态没有冲突，例如可以直接使用redux devtool工具
 * 动态机制：app.start以后，仍然可以注册model，灵活性较高
 * 再说说个人觉得不太爽的地方吧:
 * namespace不统一: dva中的action.type格式是namespace/XXX，且在model中不需要添加前缀namespace，但是在组件中dispatch，却需要添加prefix
 * action问题：action会散落在两个地方，一个是saga里面，另外一个是component dispatch的时候，当然这个问题在使用redux-saga的时候就会存在，只是dva仍然没有很好地统一起来。
 */
