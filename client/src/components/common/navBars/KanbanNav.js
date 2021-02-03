import React from 'react'
import { Link, useHistory } from 'react-router-dom'

import Avatar from '../../common/Avatar'
import { isAuthenticated, logout, getUserId } from '../../../lib/auth'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiceD20, faSearchPlus, faStream, faUserCircle } from '@fortawesome/free-solid-svg-icons'


function KanbanNav({ 
  kanbanName, members,
  addMemberEmail,
  handleAddMemberEmailChange, 
  handleAddMember, 
  addMemberError,
  hasErrorAnimationClass }) {

  const isLoggedIn = isAuthenticated()
  const history = useHistory()

  const handleLogout = () => {
    logout()
    history.push('/')
  }
  return (
      
    <>
      <nav className="navbar kanban-navbar is-transparent" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <div className="stream-icon-container">
            <span className='icon stream-icon'>
              <FontAwesomeIcon icon={faStream}/>
            </span>
          </div>
          <div className="dice-icon-container">
            <Link to="/">
              <span className="icon dice-icon">
                <FontAwesomeIcon icon={faDiceD20}/>
              </span>
            </Link>
          </div>
        </div>
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start kanban-navbar-start">
            <span className="nav-item-project-name">
              <div className="project-name-container">
                <span>{kanbanName}</span>
              </div>
            </span>
            <span className="navbar-item-avatars">
              <div className='members-avatars-container'>
                {members.map((member, index) => (
                  <div key={member.id}>
                    <Avatar
                      size='medium'
                      avatar={member.avatar}
                      fullName={member.fullName}
                      hasTooltip={true}
                      style={{
                        position: 'relative',
                        left: `${members.length % 2 === 1 ?
                          15 * (index - Math.floor(members.length / 2))
                          :
                          15 * (index - ((members.length - 1) / 2))
                        }px`,
                        zIndex: `${members.length - index}`
                      }}
                    />
                  </div>
                ))}
              </div>
            </span>
            <div className='add-member'>
              <form
                onSubmit={handleAddMember}
                className={`${hasErrorAnimationClass ? 'error-animation' : ''}`}
              >
                <div className='field'>
                  <div className='control has-icons-left'>
                    <input
                      type='text'
                      className={`add-member-input input ${addMemberError ? 'is-danger' : ''}`}
                      onChange={handleAddMemberEmailChange}
                      value={addMemberEmail}
                      placeholder='Add member by email...'
                    />
                    <span className='icon is-small is-left'>
                      <FontAwesomeIcon icon={faSearchPlus}/>
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="navbar-end">
            <span className="navbar-item-log-out">
              <button onClick={handleLogout} to="/login" className="button log-out-kanban-navbar">
                <span>Log Out</span>
              </button>
            </span>
            {isLoggedIn ?
              <div className="user-icon-container">
                <Link to={`/profile/${getUserId()}`}>
                  <span className='icon user-icon'>
                    <FontAwesomeIcon icon={faUserCircle}/>
                  </span>
                </Link>
              </div>
              :
              <span className="navbar-item">
                <Link to="/login" className="button is-dark is-outlined">
                  <span>Log In</span>
                </Link>
              </span>
            }
          </div>
        </div>
      </nav>
    </>
  )
}

export default KanbanNav