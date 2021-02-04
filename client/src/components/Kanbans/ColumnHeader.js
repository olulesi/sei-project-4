import React from 'react'
import Tippy from '@tippyjs/react'

import ColumnHeaderInput from './ColumnHeaderInput'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

function ColumnHeader({ id, position, name, numberOfTickets, handleSubmit, handleDelete }) {

  const node = React.useRef()

  const [isHovered, setIsHovered] = React.useState(false)
  const [isEditable, setIsEditable] = React.useState(false)
  const [newName, setNewName] = React.useState(name)
  const [popoverVisible, setPopoverVisible] = React.useState(false)

  const showPopover = () => setPopoverVisible(true)
  const hidePopover = () => setPopoverVisible(false)

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
      className={`message-header ${isHovered || popoverVisible ? 'hovered' : ''}`}
      ref={node}
      onSubmit={handleSubmitPlus}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!isEditable ?
        <>
          <h2>{name}</h2>
          <div className='edit-and-delete-buttons'>
            <button type='button' onClick={() => setIsEditable(true)}>
              <FontAwesomeIcon icon={faEdit}/>
            </button>
            <Tippy
              visible={popoverVisible}
              interactive={true}
              onClickOutside={hidePopover}
              placement='bottom'
              animation='scale'
              theme='light'
              maxWidth={180}
              content={
                <>
                  <p>Delete column <span>{name}</span>
                    {numberOfTickets ?
                      ` along with its ${numberOfTickets} ticket${numberOfTickets > 1 ? 's' : ''}?` 
                      : 
                      '?'
                    }
                  </p>
                  <div className='buttons are-small'>
                    <button type='button' 
                      className='button popover-button is-danger' 
                      onClick={() => handleDelete(id, position)}>
                      Yes
                    </button>
                    <button type='button' 
                      className='button popover-button' 
                      onClick={hidePopover}>No</button>
                  </div>
                </>
              }
            >
              <button
                type='button'
                onClick={showPopover}
                style={popoverVisible ? { background: 'rgba(0,0,0,.2)' } : {}}
              >
                <FontAwesomeIcon icon={faTrashAlt}/>
              </button>
            </Tippy>
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