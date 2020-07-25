# 组件的生命周期
## 挂载阶段
- constructor()
- static getDerivedStateFromProps()
- render()
- componentDidMount()
>过时的：
>- UNSAFE_componentWillMount()

## 更新阶段
组件的props或state发生变化时会触发更新
- static getDerivedStateFromProps()
- shouldComponentUpdate()
- render()
- getSnapshotBeforeUpdate()
- componentDidUpdate()
> 过时的：
>- UNSAFE_componentWillMount()
>- UNSAFE_componentWillUpdate()
>- UNSAFE_componentWillReceiveProps()

## 卸载
- componentWillUnmount()

## 错误处理
- static getDerivedStateFromError()
- componentDidCatch()
