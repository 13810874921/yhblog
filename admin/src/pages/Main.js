import React from 'react';
import {BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Login from './Login'
import AdminIndex from './AdminIndex'
function Main(){
    return(
            <Router>
                <Route path="/index" component={AdminIndex} />
                <Route path="/" exact component={Login} />
            </Router>
    )
}

export default Main