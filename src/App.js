import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom'
import lazy from './utils/lazy'

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
        <Route path='/login' component={Login}></Route>
        <Route path='/register' component={Register}></Route>
        <Route path='/detail' component={Detail}></Route>
        <Route path='/sortdetail' component={SortDetail}></Route>
        <Redirect to='/login'></Redirect>
      </Switch>
    </div>
  );
}

export default App;
