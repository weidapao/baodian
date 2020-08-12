/**
 * 虚拟dom
 * 1.用 JavaScript 对象结构表示 DOM 树的结构；然后用这个树构建一个真正的 DOM 树，插到文档当中（用JS对象模拟DOM树）
 * 2.当状态变更的时候，重新构造一棵新的对象树。然后用新的树和旧的树进行比较，记录两棵树差异（比较两棵虚拟DOM树的差异）
 * 3.把2所记录的差异应用到步骤1所构建的真正的DOM树上，视图就更新了（把差异应用到真正的DOM树上）
 * 
 * 直接操作dom要重新创建所有DOM元素，虚拟dom通过diff算法比较，进行必要的dom更新
 */
// 用js对象模拟dom树
function Element (tagName, props, children) {
  this.tagName = tagName
  this.props = props
  this.children = children
}

Element.prototype.render = function () {
  var el = document.createElement(this.tagName) // 根据tagName构建
  var props = this.props

  for (var propName in props) { // 设置节点的DOM属性
    var propValue = props[propName]
    el.setAttribute(propName, propValue)
  }

  var children = this.children || []

  children.forEach(function (child) {
    var childEl = (child instanceof Element)
      ? child.render() // 如果子节点也是虚拟DOM，递归构建DOM节点
      : document.createTextNode(child) // 如果字符串，只构建文本节点
    el.appendChild(childEl)
  })

  return el
}

var ul = Element('ul', {id: 'list'}, [
  el('li', {class: 'item'}, ['Item 1']),
  el('li', {class: 'item'}, ['Item 2']),
  el('li', {class: 'item'}, ['Item 3'])
])

var ulRoot = ul.render()
document.body.appendChild(ulRoot)