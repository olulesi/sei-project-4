import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'

function AddNewColumn({ handleSubmit, newColumnName, setnewColumnName }) {

  const [newColumn, setnewColumn] = React.useState(false)

  const handleClick = () => {
    setnewColumn(!newColumn)
  }

  const handleChange = event => {
    setnewColumnName(event.target.value)
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
            />
          </div>
          <div>
            <button className='button' >Add List</button>
            <FontAwesomeIcon onClick={handleClick} className='delete' icon={faTimes} />
            {/* <button onClick={handleClick} className='delete is-medium'></button> */}
          </div>
        </form>
      )}
    </>
  )
}

export default AddNewColumn