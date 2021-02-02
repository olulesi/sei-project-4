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
      <form onSubmit={handleSubmit} className={`form column-form add-list column is-narrow kanban-background-${formdata.background}`}>
        <div>
          <input
            className="input"
            onChange={handleChange}
            placeholder="Enter List Title ..."
            value={formdata.name}
            name='name'
          />
        </div>
        <div className="field">
          <label className="label">Pick a background!</label>
          <div className="control-background">
            <div className="background-option kanban-background-0">
              <input
                type="radio"
                name="background"
                value="0"
                onChange={handleChange}
                checked={formdata.background === '0'}
                className="background-0" 
              />
              <label className="radio green">
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
              <label className="radio green">
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
              <label className="radio green">
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
              <label className="radio green">
              </label>
            </div>
          </div>
        </div>
        <div>
          <button className="button" >Add</button>
          <button onClick={handleClick} className="delete is-medium"></button>
        </div>
      </form>
    </>
  )

}

export default NewKanbanModal