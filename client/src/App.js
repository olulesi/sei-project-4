import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Nav from './components/common/Nav'
import Home from './components/common/Home'

import Register from './components/auth/Register'
import Login from './components/auth/Login'

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          {/* <Route path="/projects/:id" component={SingleProject} />
          <Route path="/projects" component={Projects} /> */}
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App

