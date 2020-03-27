import React from 'react'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import {Router, Route, Switch, Redirect} from 'react-router-dom'
import History from '../common/History';

const RouterIndex = () => (
    <Router history={History}>
        <Switch>
            <Route path="/" exact render={()=>(
            	<Redirect to='/home'/>
            )}/>
            <Route path="/home" component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
        </Switch>
    </Router>
);


export default RouterIndex;