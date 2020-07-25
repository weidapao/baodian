## 传统 diff 算法
时间复杂度 O(n3) 循环递归来比较。

## react diff算法
时间复杂读O(n)

### tree diff
两个树只会对同层级的节点进行比较，当发现节点已经不存在，则该节点及其子节点会被完全删除掉，不会用于进一步的比较，
这样只需要对树进行一次遍历。
(因此React 官方建议不要进行 DOM 节点跨层级的操作。)
注意：在开发组件时，保持稳定的 DOM 结构会有助于性能的提升。例如，可以通过 CSS 隐藏或显示节点，而不是真的移除或添加 DOM 节点

### component diff
- 如果是同一类型的组件，按照原策略继续比较 virtual DOM tree
- 如果不是，则将该组件判断为 dirty component，从而替换整个组件下的所有子节点。

### element diff
发现节点不同，直接删除，然后插入新节点，优化：使用key。

通过 key 发现新老集合中的节点都是相同的节点，因此无需进行节点删除和创建，只需要将老集合中节点的位置进行移动，更新为新集合中节点的位置

## 总结
- 将 O(n3) 复杂度的问题转换成 O(n)
- 分层求异，对tree diff进行优化
- 相同类生成相似树形结构，不同类生成不同树形结构，优化component diff
- 设置唯一 key,优化element diff

# fiber 架构

## 同步更新局限
React中，更新过程是同步的，浏览器主线程一直被占用进行更新操作。
## React Fiber的方式
fiber的意思是纤维，意思是比thread(棉线)更小
把任务进行分片，把耗时长的任务进行分片，每一小片任务执行完之后，给其他任务一个执行的机会，这样唯一的线程就不会被独占。
react fiber把更新过程碎片化，每次更新完一部分，就把控制权交给react里面负责任务协调的模块，如果有紧急任务，就去做紧急任务，
没有的话就继续更新。
## React Fiber对现有代码的影响
可能发生的情况：优先级低的更新任务被一个优先级高的更新打断，优先级高的任务优先处理完，低优先级的更新任务所做的工作就会
***完全作废，等待时机重新更新***
### react fiber分为两个阶段
- Reconciliation Phase，找出需要更新哪些dom，可以被打断
- Commit Phase 一鼓作气更新完dom，不会被打断
### 第一阶段可能调用的生命周期
- componentWillMount
- componentWillReceiveProps
- shouldComponentUpdate
- componentWillUpdate
### 第二阶段调用
- componentDidMount
- componentDidUpdate
- componentWillUnmount
## 注意点
在React Fiber中，第一阶段的生命周期函数在一次加载和更新的过程中可能会被调用多次