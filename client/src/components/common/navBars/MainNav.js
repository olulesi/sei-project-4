import React from 'react'
import { Link, useHistory } from 'react-router-dom'

import { getUserProfile, headers } from '../../../lib/api'
import { isAuthenticated, logout, getUserId } from '../../../lib/auth'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faDiceD20 } from '@fortawesome/free-solid-svg-icons'

function HomeNav({ page }) {

  const [profile, setProfile] = React.useState({})
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
    <>
      <nav className="main-navbar" role="navigation" aria-label="main navigation">
        {page === 'homePage' ?
          <>
            <div className="navbar-end">
              {!isLoggedIn ?
                <>
                  <span className="navbar-item-log-in">
                    <Link to="/login" className="button log-in-main-navbar">
                      <span>Log In</span>
                    </Link>
                  </span>
                  <span className="navbar-item-register">
                    <Link to="/register" className="button register-main-navbar">
                      <span>Register</span>
                    </Link>
                  </span>
                </>
                :
                <>
                  <span className="navbar-item-log-out">
                    <button onClick={handleLogout} to="/login" className="button log-out-main-navbar">
                      <span>Log Out</span>
                    </button>
                  </span>
                  <div className="user-icon-container">
                    <Link to={`/profile/${getUserId()}`}>
                      <span className='icon user-icon-main-navbar'>
                        <FontAwesomeIcon icon={faUserCircle}/>
                      </span>
                    </Link>
                  </div>
                </>
              }
            </div>
          </>
          : page === 'login' ?
            <>
              <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">
                  <div className="dice-icon-container">
                    <Link to="/">
                      <span className="icon dice-icon-main-navbar">
                        <FontAwesomeIcon icon={faDiceD20}/>
                      </span>
                    </Link>
                  </div>
                </div>

                <div className="navbar-end">
                  <>
                    <span className="navbar-item-register">
                      <Link to="/register" className="button register-main-navbar">
                        <span>Register</span>
                      </Link>
                    </span>
                  </>
                </div>
              </div>
            </>
            : page === 'register' ?
              <>
                <div id="navbarBasicExample" className="navbar-menu">
                  <div className="navbar-start">
                    <div className="dice-icon-container">
                      <Link to="/">
                        <span className="icon dice-icon-main-navbar">
                          <FontAwesomeIcon icon={faDiceD20}/>
                        </span>
                      </Link>
                    </div>
                  </div>

                  <div className="navbar-end">
                    <>
                      <span className="navbar-item-log-in">
                        <Link to="/login" className="button log-in-main-navbar register-page-button">
                          <span>Log In</span>
                        </Link>
                      </span>
                    </>
                  </div>
                </div>
              </>
              :
              <>
                <div id="navbarBasicExample" className="navbar-menu">
                  <div className="navbar-start">
                    <div className="dice-icon-container">
                      <Link to="/">
                        <span className="icon dice-icon-main-navbar">
                          <FontAwesomeIcon icon={faDiceD20}/>
                        </span>
                      </Link>
                    </div>
                  </div>

                  <div className="navbar-end">     
                    <span className="navbar-item-log-out">
                      <button onClick={handleLogout} to="/login" className="button log-out-main-navbar">
                        <span>Log Out</span>
                      </button>
                    </span>
                    <div className="user-icon-container">
                      <Link to={`/profile/${getUserId()}`}>
                        <span className='icon user-icon-main-navbar'>
                          <FontAwesomeIcon icon={faUserCircle}/>
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </>
        }
      </nav>
    </>
  )
}

export default HomeNav