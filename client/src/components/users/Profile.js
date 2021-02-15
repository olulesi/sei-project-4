import React from 'react'
import { Link } from 'react-router-dom'

import Avatar from '../common/Avatar'
import { getUserProfile, headers, deleteKanban } from '../../lib/api'
import NewKanbanModal from '../Kanbans/NewKanbanModal'
import MainNav from '../common/navBars/MainNav'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faUserAlt } from '@fortawesome/free-solid-svg-icons'

function Profile() {

  const [profile, setProfile] = React.useState({})
  const [newKanban, setnewKanban] = React.useState(false)
  const [deletedKanbanId, setDeletedKanbanId] = React.useState(null)

  const handleClick = () => {
    setnewKanban(!newKanban)
  }

  const handleDelete = async (id) => {

    try {
      await deleteKanban(id)
      setDeletedKanbanId(id)
    } catch (err) {
      console.log(err)
    }

  }

  React.useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await getUserProfile(headers())
        setProfile(data)
      } catch (err) {
        console.log(err)
      }
    }
    getProfile()
  }, [deletedKanbanId])

  return (
    <>
      <MainNav page={'profile'}/>
      <div className="profile-section">
        <div className="profile-header">
          <div className="avatar-field">
            <div className='avatar-container'>
              <Avatar 
                size='big'
                avatar={profile.avatar}
                fullName={profile.fullName}
              />
            </div>
          </div>
          <p className="full-name">{profile.fullName}</p>
          <p className="email">{profile.email}</p>
          <div className="kanban-stats">
            {profile.kanbansOwnerOf ?
              <>
                {profile.kanbansOwnerOf.length === 1 ?
                  <p className="kanbansOwnerOf">{profile.kanbansOwnerOf.length} Kanban</p>
                  :
                  <p className="kanbansOwnerOf">{profile.kanbansOwnerOf.length} Kanbans</p>
                }
                {profile.kanbansMemberOf.length === 1 ?
                  <p className="kanbansOwnerOf">{profile.kanbansMemberOf.length} Collaboration</p>
                  :
                  <p className="kanbansOwnerOf">{profile.kanbansMemberOf.length} Collaborations</p>
                }
              </>
              :
              <div>😬</div>
            }
          </div>
        </div>
        <nav className=" navbar profile-nav">
          <div className="navbar-start">
            <span className="navbar-item">
              <Link to="/profile/edit">
                <div>
                  <FontAwesomeIcon className="profile-icon" icon={faPen} />
                </div>
              </Link>
            </span>
          </div>
        </nav>
        <div className="profile-kanbans">
          <div className="create-new-board-container">
            {!newKanban && (
              <div className="create-new-board-card">
                <div onClick={handleClick} className="kanban-background">
                  <div className="create-new"> Create New Board</div>
                </div>
              </div>
            
            )}
            {newKanban && (
              <NewKanbanModal handleClick={handleClick} />
            )}
            <hr className="divider" />
          </div>
          <div className="kanban-header">
            <FontAwesomeIcon className="icon is-medium column-icon" icon={faUserAlt} />
            <h1 className="title">Personal Kanbans</h1>
          </div>
          <div className="kanban-container">
            {profile.kanbansOwnerOf ?
              <>
                {profile.kanbansOwnerOf.map(kanban => (
                  <div key={kanban.id} className="kanban-card">
                    <div className={`kanban-background kanban-background-${kanban.background}`}>
                      <Link  to={`/kanbans/${kanban.id}`}>
                        <div className="card-header-title">
                          {kanban.name}
                        </div>
                      </Link> 
                      <button 
                        onClick={ () => {
                          handleDelete(kanban.id)
                        }}
                        className="delete is-medium remove-kanban"></button>
                    </div>
                  </div>
                ))}
              </>
              :
              <div>🥴</div>
            }        
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile