import React from 'react'

function CreateTicket({ handleTicketSubmit, newTicketName, setNewTicketName, id }) {

  const [newTicket, setnewTicket] = React.useState(false)
  
  const handleClick = () => {
    setnewTicket(!newTicket)
  }

  const handleChange = e => {
    setNewTicketName(e.target.value)
  }


  return (

    <>
      {!newTicket && (
        <button className="button ticket-button" onClick={handleClick}>Add another card</button>
      )}
      {newTicket && (
        <form className="form ticket-form" name={id} onSubmit={ handleTicketSubmit }>
          {/* adding an event listener when the input changes fire handle change function */}
          {/* you put the submit handle on the form not the button cause it is in a form */}
          <div>
            <input
              className="input"
              onChange={handleChange}
              placeholder="Enter a title for this card ..."
              value={newTicketName}
            />
          </div>
          <div>
            <button className="button" >Add</button>
            <button onClick={handleClick} className="delete is-medium"></button>
          </div>
  
  
        </form>
      )}
      
    </>
  )


}
export default CreateTicket
