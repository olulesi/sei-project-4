import React from 'react'
import { useHistory } from 'react-router-dom'

import { createKanban, getUserProfile, headers } from '../../lib/api'
import useForm from '../../utils/useForm'

function NewKanbanModal({ handleClick }) {

  const history = useHistory()

  const [profile, setProfile] = React.useState({})

  const { formdata, handleChange } = useForm({
    name: '',
    background: '0',
    owner: ''
  })

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
  }, [])

  const handleSubmit = async event => {
    
    event.preventDefault()
    formdata.owner = profile.id
    try {
      console.log(formdata)
      const { data } = await createKanban(formdata)
      console.log(data)
      history.push(`/kanbans/${data.id}`)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="create-new-kanban-form">
        <div className="background-with-options-container">
          <div className={`search-new-kanban kanban-background-${formdata.background}`}>
            <div className="input-deleteButton-container">
              <input
                className="input create-new-kanban-input"
                onChange={handleChange}
                placeholder="Add Kanban Title"
                value={formdata.name}
                name='name'
              />  
              <button onClick={handleClick} className="delete is-medium"></button>
            </div>
            
            <label className="create-new-kanban-label">Constanza Kanban</label>
          </div>
          <div className="control-background-options">
            <div className="background-option kanban-background-0">
              <input
                type="radio"
                name="background"
                value="0"
                onChange={handleChange}
                checked={formdata.background === '0'}
                className="background-0" 
              />
              <label>
              </label>
            </div>
            <div className="background-option kanban-background-1">
              <input
                type="radio"
                name="background"
                value="1"
                onChange={handleChange}
                checked={formdata.background === '1'}
                className="background-1" 
              />
              <label>
              </label>
            </div>
            <div className="background-option kanban-background-2">
              <input
                type="radio"
                name="background"
                value="2"
                onChange={handleChange}
                checked={formdata.background === '2'}
                className="background-2" 
              />
              <label>
              </label>
            </div>
            <div className="background-option kanban-background-3">
              <input
                type="radio"
                name="background"
                value="3"
                onChange={handleChange}
                checked={formdata.background === '3'}
                className="background-3" 
              />
              <label>
              </label>
            </div>
          </div>
        </div>
        <div className="create-new-kanban-buttons">
          <button className="button" >Create Kanban</button>
        </div>
      </form>
    </>
  )

}

export default NewKanbanModal