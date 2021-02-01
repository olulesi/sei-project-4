import React from 'react'
import { Link } from 'react-router-dom'

import { getUserProfile, headers, deleteKanban } from '../../lib/api'
import NewKanbanModal from '../kanbans/NewKanbanModal'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

const initialize = string => {
  if (!string) return
  return string.trim().split(/ +/).map(item => item[0].toUpperCase()).join('')
}

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
      <div className="profile-header">
        <div className="avatar-field">
          <div className='avatar-container'>
            {profile.avatar ?
              <img src={profile.avatar} className='avatar' />
              :
              <p className='initials'>
                {initialize(profile.fullName)}
              </p>
            }
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
        <div className="kanban-header">
          <h1 className="title is-1">Kanbans</h1>
        </div>
        <div className="kanban-container">
          {profile.kanbansOwnerOf ?
            <>
              {profile.kanbansOwnerOf.map(kanban => (
                <div key={kanban.id} className="kanban-card">
                  <div className={`kanban-background kanban-background-${kanban.background}`}>
                    <img className={`kanban-background-${kanban.background}`} />
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
          

          {!newKanban && (
            <div className="kanban-card">
              <div onClick={handleClick} className="kanban-background">
                <img src="https://media.istockphoto.com/photos/blank-warm-white-plain-background-picture-id1059059678?k=6&m=1059059678&s=612x612&w=0&h=AzFHa_kaPH9SPtgZrUWiJsv7P3WyyXrSH0C_PBnUZ2c=" />
                <div className="create-new"> Create New Board</div>
              </div>
            </div>
            
          )}
          {newKanban && (
            <NewKanbanModal handleClick={handleClick} />
          )}
          
        </div>
      </div>
    </>
  )
}

export default Profile