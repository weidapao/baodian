// 把某种模式匹配到的路由全都映射到同个组件
// 比如：有一个 User 组件，对于所有 ID 各不相同的用户，都要使用这个组件来渲染
const User = {
  template: '<div>User</div>'
}

const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/user/:id', component: User }
  ]
})