/**
 * 本质就是监听 URL 的变化，然后匹配路由规则，显示相应的页面，并且无须刷新
 * hash路由 History路由
 * hash路由一个明显的标志是带有#,我们主要是通过监听url中的hash变化来进行路由跳转
 * 通过hashchange事件来监听
 * 手动刷新通过load事件来监听
 */

// 1.将路由的hash以及对应的callback函数储存
// 2.触发路由hash变化后,执行对应的callback函数
class Routers {
  constructor() {
    // 以键值对的形式储存路由
    this.routes = {};
    // 当前路由的URL
    this.currentUrl = '';
    this.history = []
    this.currentIndex = this.history.length-1;
    this.refresh = this.refresh.bind(this);
    this.backOff = this.backOff.bind(this);
    this.isBack = false;
    window.addEventListener('load', this.refresh, false);
    window.addEventListener('hashchange', this.refresh, false);
  }
  // 将path路径与对应的callback函数储存
  route(path,callback){
    this.routes[path] = callback
  }
  // 刷新
  refresh(){
    // 获取当前URL中的hash路径
    this.currentUrl = location.hash.slice(1) || '/';
    if(!this.isBack){
      this.currentIndex++
      this.history.push(this.currentUrl)
    }
    this.routes[this.currentUrl]&&this.routes[this.currentUrl]()
    this.isBack = false
  }
  backOff(){
    this.isBack = true
    if(this.currentIndex<=0){
      return
    }
    location.hash = this.history[this.currentIndex-1]
    this.currentIndex--
    this.routes[this.history[this.currentIndex]]();
  }
}


var localRoute = new Routers()
localRoute.route('/',()=>{
  console.log('1111')
})
localRoute.route('/blue',()=>{
  console.log('22222')
})
localRoute.route('/green',()=>{
  console.log('33333')
})

// History路由
// 刷新页面或者输入url，需要后端配合重定向
// 后退history.back(),前进history.forward()，触发popstate事件
// 点击浏览器跳转，调用pushstate向浏览器历史添加一个状态
// history.pushState用于在浏览历史中添加历史记录,但是并不触发跳转,此方法接受三个参数，依次为state，title，url
class Routers {
  constructor() {
    this.routes = {};
    // 在初始化时监听popstate事件
    this._bindPopState();
  }
  // 初始化路由
  init(path) {
    history.replaceState({path: path}, null, path);
    this.routes[path] && this.routes[path]();
  }
  // 将路径和对应回调函数加入hashMap储存
  route(path, callback) {
    this.routes[path] = callback || function() {};
  }

  // 触发路由对应回调
  go(path) {
    history.pushState({path: path}, null, path);
    this.routes[path] && this.routes[path]();
  }
  // 监听popstate事件
  _bindPopState() {
    window.addEventListener('popstate', e => {
      const path = e.state && e.state.path;
      this.routes[path] && this.routes[path]();
    });
  }
}