var obj = {
  text: 'test',
  foo:'bar',
}

var methods = {
  reset: () => (obj.text = ''),
}

class EventHub {
  cache = []
  on(fn) {
    this.cache.push(fn)
  }
  emit(data) {
    this.cache.map((fn) => fn&&fn(data))
  }
}
EventHub.target = null


function observer(data) {
  for (const key in data) {
    let eventEmitter = new EventHub()
    let value = data[key]
    Object.defineProperty(obj, key, {
      set(newValue) {
        if (value == newValue) return
        value = newValue
        // 发布
        eventEmitter.emit(newValue)
      },
      get() {
        // 订阅
        eventEmitter.on(EventHub.target)
        return value
      },
    })
  }
}

observer(obj)

function compile(dom) {
  const nodes = dom.childNodes
  for (const node of nodes) {
    // 元素节点
    if (node.nodeType == 1) {
      const attrs = node.attributes
      for (const attr of attrs) {
        if (attr.name == 'v-model') {
          const fn = function (value) {
            node.value = value
          }
          EventHub.target = fn
          node.value = obj[attr.value]
          EventHub.target = null
          node.addEventListener('input', (e) => {
            obj[attr.value] = e.target.value
          })
        }
        if (attr.name == '@click') {
          const name = attr.value
          node.addEventListener('click', methods[name])
        }
      }
    }
    // text节点
    if (node.nodeType == 3) {
      const reg = /\{\{(.*)\}\}/
      const match = node.nodeValue.match(reg)
      if (match) {
        const fn = function (value) {
          console.log('xxxx',name)
          node.nodeValue = value
        }
        EventHub.target = fn
        const name = match[1].trim()
        node.nodeValue = obj[name]
        EventHub.target = null
      }
    }
  }
}

compile(document.getElementById('app'))
