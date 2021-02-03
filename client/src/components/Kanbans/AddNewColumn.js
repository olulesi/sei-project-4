import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'

function AddNewColumn({ handleSubmit, newColumnName, setNewColumnName }) {

  const [newColumn, setNewColumn] = React.useState(false)

  const handleClick = () => {
    setNewColumn(!newColumn)
    setNewColumnName('')
  }

  const handleChange = event => {
    setNewColumnName(event.target.value)
  }

  return (
    <>  
      {!newColumn && (
        <button className='button front' onClick={handleClick}>
          <FontAwesomeIcon className='plus-icon' icon={faPlus}/>
          Add another column
        </button>
      )}
      {newColumn && (
        <form className='addNewColumn-form' onSubmit={ handleSubmit }>
          <div>
            <input
              className='input'
              onChange={handleChange}
              placeholder='Column name...'
              value={newColumnName}
              autoFocus
            />
          </div>
          <div>
            <button className='button add-list-button' >Add Column</button>
            <FontAwesomeIcon onClick={handleClick} className='delete' icon={faTimes}/>
          </div>
        </form>
      )}
    </>
  )
}

export default AddNewColumn