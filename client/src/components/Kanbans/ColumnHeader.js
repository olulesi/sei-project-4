/* eslint-disable no-unused-vars */
import React from 'react'

import ColumnHeaderInput from './ColumnHeaderInput'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

function ColumnHeader({ id, position, name, handleSubmit, handleDelete }) {

  const node = React.useRef()

  const [isHovered, setIsHovered] = React.useState(false)
  const [isEditable, setIsEditable] = React.useState(false)
  const [newName, setNewName] = React.useState(name)

  const handleChange = event => {
    setNewName(event.target.value)
  }

  const handleSubmitPlus = event => {
    event.preventDefault()
    if (!newName) return
    handleSubmit(id, position, newName)
    setIsEditable(false)
  }
  
  const handleClose = () => {
    setIsEditable(false)
    setNewName(name)
  }

  return (
    <form
      className={`message-header ${isHovered ? 'hovered' : ''}`}
      ref={node}
      onSubmit={handleSubmitPlus}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!isEditable ?
        <>
          <h2>{name}</h2>
          <div className='edit-and-delete-buttons'>
            <button type='button'>
              <FontAwesomeIcon icon={faEdit} onClick={() => setIsEditable(true)}/>
            </button>
            <button type='button'>
              <FontAwesomeIcon icon={faTrashAlt} onClick={() => handleDelete(id, position)}/>
            </button>
          </div>
        </>
        :
        <ColumnHeaderInput
          node={node}
          newName={newName}
          handleChange={handleChange}
          handleSubmit={handleSubmitPlus}
          handleClose={handleClose}
        />
      }
    </form>
  )
}

export default ColumnHeader