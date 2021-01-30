import React from 'react'

function AddNewColumn({ handleSubmit, newColumnName, setnewColumnName }) {

  const [newColumn, setnewColumn] = React.useState(false)

  const handleClick = () => {
    setnewColumn(!newColumn)
  }

  const handleChange = e => {
    setnewColumnName(e.target.value)
  }

  return (
    <>  
      {!newColumn && (
        <button className="button front column is-narrow column-container" onClick={handleClick}>Add another List</button>
      )}
      {newColumn && (
        <form className="form add-list column is-narrow " onSubmit={ handleSubmit }>
          {/* adding an event listener when the input changes fire handle change function */}
          {/* you put the submit handle on the form not the button cause it is in a form */}
          <div>
            <input
              className="input"
              onChange={handleChange}
              placeholder="Enter List Title ..."
              value={newColumnName}
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

export default AddNewColumn