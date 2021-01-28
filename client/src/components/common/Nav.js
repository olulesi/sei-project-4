import React from 'react'
import { Link } from 'react-router-dom'

function Nav() {

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <span className="navbar-item">
            <Link to="/" className="button is-dark is-outlined">
              <span>Home</span>
            </Link>
          </span>
          <a className="navbar-item">
            KanBans 
          </a>
        </div>

        <div className="navbar-end">
          <span className="navbar-item">
            <Link to="/login" className="button is-dark is-outlined">
              <span>Log In</span>
            </Link>
          </span>
          <span className="navbar-item">
            <Link to="/register" className="button is-dark is-outlined">
              <span>Register</span>
            </Link>
          </span>
        </div>
      </div>
    </nav>
  )
}
export default Nav
