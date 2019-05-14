import makeRouteConfig from 'found/lib/makeRouteConfig';
import Route from 'found/lib/Route';
import React from 'react';
import { graphql } from 'react-relay';

import Home from '../pages/home/Home';
import AnotherPage from '../pages/anotherPage/AnotherPage';
import Login from "../pages/login/Login";

export default makeRouteConfig(
  <Route path="/">
    <Route Component={Login} />
    <Route path="home">
      <Route Component={Home}/>
    </Route>
    
    <Route path="page-without-header-example">
      <Route Component={AnotherPage} />
    </Route>
  </Route>,
)
