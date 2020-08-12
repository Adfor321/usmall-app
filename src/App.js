import React from 'react';
import { Route, Switch } from 'react-router-dom'
import lazy from './utils/lazy'
import DefRoute from './utils/DefRoute'
const Index = lazy(() => import('./views/Index/Index'))
const Login = lazy(() => import('./views/Login/Login'))
const Register = lazy(() => import('./views/Register/Register'))
const Detail = lazy(() => import('./views/Detail/Detail'))
const SortDetail = lazy(() => import('./views/SortDetail/SortDetail'))

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/index' component={Index}></Route>
        <Route exact path='/' component={Login}></Route>
        <Route path='/register' component={Register}></Route>
        <DefRoute path='/detail' component={Detail}></DefRoute>
        <DefRoute path='/sortdetail' component={SortDetail}></DefRoute>
      </Switch>
    </div>
  );
}

export default App;
