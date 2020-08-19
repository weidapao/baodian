// 通过 import() 动态导入，实现异步加载
import React, { lazy, Suspense } from 'react';
const OtherComponent = lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OtherComponent />
    </Suspense>
  );
}

/**
 * 接受一个() => import('./OtherComponent')作为参数
 */

function asyncComponent(importComponent){
  class AsyncComponent extends React.Component {
    state = {
      component: null
    }
    render() {
      return this.state.component;
    }
    async componentDidMount() {
      const { default: Component } = await importComponent();
      this.setState({
        component: <Component {...this.props}/>
      });
    }
  }
  return AsyncComponent;
}