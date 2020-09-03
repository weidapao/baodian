## react路由
hashRouter：监听hash变化(hashChange事件)来实现路由切换，渲染子组件，向下层子组件传递location、history等信息
BrowserHistory：利用H5Api实现路由切换, 渲染子组件，向子组件传递loaction,history等路由信息
Router代表整个路由器，Route代表每一个路径对应页面的路由规则
每次pathname更改，就是组件重新渲染的过程

## rn路由
组件使用堆栈式的页面导航来实现各个页面跳转
通过createStackNavigator来创建导航容器，导航容器管理着自己的state，可以通过navigation属性dispatch各种Action（例如：BACK,PUSH,RESET等），然后处理action得到新的state，从而管理着整个导航状态。
createStackNavigator还负责路由切换的动效

### rn原理
JavaScriptCore负责JS代码解释执行
ReactJS负责描述和管理VirtualDom,指挥原生组件进行绘制和更新，同时很多计算逻辑也在js里面进行。ReactJS自身是不直接绘制UI的，UI绘制是非常耗时的操作，原生组件最擅长这事情。
Bridges用来翻译ReactJS的绘制指令给原生组件进行绘制，同时把原生组件接收到的用户事件反馈给ReactJS

## 动态路由
把某种模式匹配到的路由全都映射到同个组件
比如：有一个 User 组件，对于所有 ID 各不相同的用户，都要使用这个组件来渲染
```
const User = {
  template: '<div>User</div>'
}

const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/user/:id', component: User }
  ]
})
```