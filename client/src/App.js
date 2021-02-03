/* eslint-disable no-unused-vars */
import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Nav from './components/common/Nav'
import Home from './components/common/Home'

import Register from './components/auth/Register'
import Login from './components/auth/Login'
import KanbanView from './components/kanbans/KanbanView'

import Profile from './components/users/Profile'
import EditProfile from './components/users/EditProfile'

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Nav /> */}
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/kanbans/:id' component={KanbanView} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <Route path="/profile/edit" component={EditProfile} />
          <Route path="/profile/:id" component={Profile} />
          
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App