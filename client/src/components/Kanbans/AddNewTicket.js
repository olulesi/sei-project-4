import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'

function AddNewTicket({ columnId, columnPosition, handleSubmit }) {

  const [addTicket, setAddTicket] = React.useState(false)
  const [newTicketName, setNewTicketName] = React.useState('')
  
  const handleSubmitPlus = event => {
    event.preventDefault()
    if (!newTicketName) return
    handleSubmit(columnId, columnPosition, newTicketName)
    setAddTicket(false)
    setNewTicketName('')
  }

  const handleClick = () => {
    setAddTicket(!addTicket)
    setNewTicketName('')
  }

  const handleChange = event => {
    setNewTicketName(event.target.value)
  }

  return (
    <>
      {!addTicket && (
        <button className='button ticket-button' onClick={handleClick}>
          <FontAwesomeIcon className='plus-icon' icon={faPlus} />
          Add another ticket...</button>
      )}
      {addTicket && (
        <form
          className='form ticket-form'
          onSubmit={handleSubmitPlus}
        >
          {/* adding an event listener when the input changes fire handle change function */}
          {/* you put the submit handle on the form not the button cause it is in a form */}
          <div className='input-container'>
            <input
              className='input'
              onChange={handleChange}
              value={newTicketName}
              placeholder='Ticket name...'
              autoFocus
            />
          </div>
          <div className='buttons-container'>
            <button className='button' >Add Ticket</button>
            <FontAwesomeIcon onClick={handleClick} className='delete' icon={faTimes} />
            {/* <button onClick={handleClick} className='delete is-medium'></button> */}
          </div>
        </form>
      )}
    </>
  )
}

export default AddNewTicket