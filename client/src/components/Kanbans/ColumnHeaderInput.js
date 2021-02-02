import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'

function ColumnHeaderInput({ node, newName, handleChange, handleSubmit, handleClose }) {

  const handleClick = (event) => {
    if (node.current.contains(event.target)) return
    handleClose()
  }

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClick)
    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [])

  return (
    <>
      <input
        className='input'
        name='name'
        onChange={handleChange}
        value={newName}
        autoFocus
      />
      <div className='save-and-close-buttons'>
        <div>
          <FontAwesomeIcon icon={faCheckCircle} onClick={handleSubmit}/>
        </div>
        <div>
          <FontAwesomeIcon icon={faTimesCircle} onClick={handleClose}/>
        </div>
      </div>
    </>
  )

}

export default ColumnHeaderInput