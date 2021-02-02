import React from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'

import { getUserProfile, headers } from '../../lib/api'
import { isAuthenticated, logout, getUserId } from '../../lib/auth'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

function Nav() {

  const [profile, setProfile] = React.useState({})
  const location = useLocation()
  const isLoggedIn = isAuthenticated()
  const history = useHistory()

  React.useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await getUserProfile(headers())
        setProfile(data)
        console.log(profile)
      } catch (err) {
        console.log(err)
        // setHasError(true)
      }
    }
    getProfile()
  }, [])

  const handleLogout = () => {
    logout()
    history.push('/')
  }

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      {location.pathname === '/' ?
        <>
          <div className="navbar-end">
            {!isLoggedIn ?
              <>
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
              </>
              :
              <>
                <span className="navbar-item">
                  <button onClick={handleLogout} to="/login" className="button is-dark is-outlined">
                    <span>Log Out</span>
                  </button>
                </span>
                <span className="navbar-item">
                  <Link to={`/profile/${getUserId()}`} className="navbar-item">
                    <span className='icon is-medium is-left'>
                      <FontAwesomeIcon className="user-icon" icon={faUserCircle} />
                    </span>
                  </Link>
                </span>
              </>
            }
          </div>
        </>
        :
        <>
          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">
              <span className="navbar-item">
                <Link to="/" className="button is-dark is-outlined">
                  <span>Home</span>
                </Link>
              </span>
            </div>

            <div className="navbar-end">
              {!isLoggedIn ?
                <>
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
                </>
                :
                <>
                  <span className="navbar-item">
                    <button onClick={handleLogout} to="/login" className="button is-dark is-outlined">
                      <span>Log Out</span>
                    </button>
                  </span>
                  <span className="navbar-item">
                    <Link to={`/profile/${getUserId()}`} className="navbar-item">
                      <span className='icon is-medium is-left'>
                        <FontAwesomeIcon className="user-icon" icon={faUserCircle} />
                      </span>
                    </Link>
                  </span>
                </>
              }
            </div>
          </div>
        </>
      }
    </nav>
  )
}

export default Nav