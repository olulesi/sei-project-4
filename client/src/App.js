import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Nav from './components/common/Nav'
import Home from './components/common/Home'

import Register from './components/auth/Register'
import Login from './components/auth/Login'
import KanbanView from './components/Kanbans/KanbanView'

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/kanban/:id" component={KanbanView} />
          {/* <Route path="/kanbans" component={Kanbans} /> */}
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App

