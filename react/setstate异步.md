# setState
- setstate()将组件state的更改排入队列，通知react使用更新后的state渲染此组件及其子组件。
- 将setstate视为请求而不是立即更新组件的命令，为了提高性能，react会延迟调用它，然后一次传递更新多个组件。
- setState() 并不总是立即更新组件。它会批量推迟更新。
使用 componentDidUpdate 或者 setState 的回调函数（setState(updater, callback)
读取最新的this.state。

## 合成事件中的setState
首先得了解一下什么是合成事件，react为了解决跨平台，兼容性问题，自己封装了一套事件机制，代理了原生的事件，像在jsx中常见的onClick、onChange这些都是合成事件
```
class App extends Component {

  state = { val: 0 }

  increment = () => {
    this.setState({ val: this.state.val + 1 })
    console.log(this.state.val) // 输出的是更新前的val --> 0
  }
  render() {
    return (
      <div onClick={this.increment}>
        {`Counter is: ${this.state.val}`}
      </div>
    )
  }
}
```

## 生命周期函数中的setState
```
class App extends Component {

  state = { val: 0 }

 componentDidMount() {
    this.setState({ val: this.state.val + 1 })
   console.log(this.state.val) // 输出的还是更新前的值 --> 0
 }
  render() {
    return (
      <div>
        {`Counter is: ${this.state.val}`}
      </div>
    )
  }
}
```
## 原生事件
addEventListener

## setTimeout中的setState
基于event loop的模型下，setTimeout 中里去 setState 总能拿到最新的state值

## setState中的批量更新
```
class App extends Component {

  state = { val: 0 }

  batchUpdates = () => {
    this.setState({ val: this.state.val + 1 })
    this.setState({ val: this.state.val + 1 })
    this.setState({ val: this.state.val + 1 })
 }

  render() {
    return (
      <div onClick={this.batchUpdates}>
        {`Counter is ${this.state.val}`} // 1
      </div>
    )
  }
}
```
react会维护一个更新队列，几个{ val: this.state.val + 1 }被merge，相同的key会被覆盖，只会对最后一次的setState进行更新

# 总结
1. setState 只在合成事件和钩子函数中是“异步”的，在原生事件和setTimeout 中都是同步的。
2. setState 的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形成了所谓的“异步”，当然可以通过第二个参数 setState(partialState, callback) 中的callback拿到更新后的结果。
3. setState 的批量更新优化也是建立在“异步”（合成事件、钩子函数）之上的，在原生事件和setTimeout 中不会批量更新，在“异步”中如果对同一个值进行多次setState，setState的批量更新策略会对其进行覆盖，取最后一次的执行，如果是同时setState多个不同的值，在更新时会对其进行合并批量更新。

# 后记
突然想起来一句「有多少控制就有多少优化」。这里「合成事件」和「钩子函数」是 react 由控制的，所以 react 可以在这些地方进行优化（优化就是指对多次更新 进行批量操作啦；而因为有批量操作，所以 setState 不能立刻反映到 this.state 中）。而 setTimeout 以及原生事件由用户控制，react 也就没办法优化这些场景了。

# usestate
组件内部的函数拿到的总是定义它的那次渲染中的props和state