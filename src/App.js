import logo from './logo.svg';
import './App.css';

import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Thread from './component/Thread';
import LoginForm from './component/LoginForm';
import ThreadSelect from './component/ThreadSelect';
import Header from './component/Header';
import UserCreateForm from './component/UserCreateForm';
import UserEditForm from './component/UserEditForm';
import { NotFound } from './component/NotFound';
import {  UserIndex } from './component/UserIndex';
import { api } from './api';
import { Admin } from './component/Admin';

export const LoginedUser = createContext(null);

const App = ()=>{

  const [isMouted , setIsMounted] = useState(false);

  const [loginUser , setLoginUser] = useState(null);

  useEffect(()=>{
    api.get("/auth/login/user")
    .then((res)=>{
      setLoginUser(res.data);
    })
    .finally(res => {
      setIsMounted(true);
    });
  } , []);
  
  return<div className>
    {isMouted &&
      <LoginedUser.Provider value={loginUser}>
          <BrowserRouter>
          <div style={{paddingTop : "182px"}}>
            <Switch> 
              <Route exact path={"/"} component={ThreadSelect}/>
              <Route path={"/login"} component={LoginForm}/>
              <Route path={"/register"} component={UserCreateForm}/>
              <Route path={"/thread/:id"} component={Thread}/>
              <Route path={"/user/:id/edit"} component={UserEditForm}/>
              <Route path={"/admin"} component={Admin}/>
              <Route path={"*"} component={NotFound}/>
            </Switch>
          </div>
          <Header/>
          </BrowserRouter>
      </LoginedUser.Provider>
    }
  </div>;
  
}

export default App;
