import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Spin } from 'antd';

// 懒加载组件
const Layouts = lazy(() => import('@/components/layouts'));
const ProductList = lazy(() => import('@/pages/productlist'));
const ProductDetail = lazy(() => import('@/pages/productdetail'));


const RouterComponent = () => {
  return (
    <Router>
      <Suspense fallback={<Spin size="large" />}>
        <Layouts>
          <Switch>
            <Route path="/" exact={true} component={ProductList}></Route>
            <Route path="/detail/:id" component={ProductDetail}></Route>
          </Switch>
        </Layouts>
      </Suspense>
    </Router>
  )
};


export default RouterComponent;