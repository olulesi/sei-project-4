/* eslint-disable eqeqeq */
import React from 'react'
import DateTimePicker from 'react-datetime-picker'
import Select from 'react-select'

import Avatar from '../common/Avatar'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlag, faTimes } from '@fortawesome/free-solid-svg-icons'

function TicketShow({ formdata, setFormdata, handleChange, handleSubmit, handleDelete, members, currentUser }) {

  const { name, description, priority, deadline, tasks, comments, holders } = formdata

  const handleSelectChange = selected => {
    const value = selected ? selected.map(item => item.value) : []
    handleChange({ target: { name: 'holders', value } })
  }

  const selectOptions = members.filter(member => {
    return !holders.find(holder => holder.id === member.id)
  }).map(member => {
    return {
      value: member,
      label: member.fullName
    }
  })

  const selectValues = holders ? holders.map(holder => {
    return {
      value: holder,
      label: holder.fullName
    }
  }) : []

  const [newTaskText, setNewTaskText] = React.useState('')

  const addTask = () => {
    if (!newTaskText || newTaskText.length > 50) return
    const newTask = {
      text: newTaskText,
      complete: false,
      ticket: formdata.id
    }
    setFormdata({
      ...formdata,
      tasks: [...tasks, newTask]
    })
    setNewTaskText('')
  }

  const toggleCompleteTask = index => {
    const toggledTask = { ...tasks[index], complete: !tasks[index].complete }
    setFormdata({
      ...formdata,
      tasks: [...tasks.slice(0, index), toggledTask, ...tasks.slice(index + 1)]
    })
    setHoveredTask(toggledTask)
  }

  const deleteTask = index => {
    const newTasks = [...tasks.slice(0, index), ...tasks.slice(index + 1)]
    setFormdata({
      ...formdata,
      tasks: newTasks
    })
    setHoveredTask(newTasks[index] || null)
  }

  const [newCommentText, setNewCommentText] = React.useState('')

  const postComment = () => {
    if (!newCommentText || newCommentText.length > 300) return
    const newComment = {
      commentor: currentUser,
      text: newCommentText,
      ticket: formdata.id
    }
    setFormdata({
      ...formdata,
      comments: [...comments, newComment]
    })
    setNewCommentText('')
  }

  const deleteComment = index => {
    setFormdata({
      ...formdata,
      comments: [...comments.slice(0, index), ...comments.slice(index + 1)]
    })
  }

  const [hoveredTask, setHoveredTask] = React.useState(null)
  const [newTaskIsHovered, setNewTaskIsHovered] = React.useState(false)
  const [newTaskIsFocused, setNewTaskIsFocused] = React.useState(false)

  return (
    <form onSubmit={handleSubmit} className='modal-card'>
      <header className='modal-card-head'>
        <div className='ticket-name'>
          <input
            className='edit-ticket-name input'
            name='name'
            onChange={handleChange}
            value={name}
          />
          {!name &&
            <p className='help is-danger'>Ticket Name is Required</p>
          }
          {name.length > 50 &&
            <p className='help is-danger'>Max. 50 characters</p>
          }
        </div>
        <FontAwesomeIcon 
          onClick={() => setFormdata(null)} 
          type='button'
          aria-label='close'
          className='delete'
          icon={faTimes} />
      </header>

      <section className='modal-card-body'>
        <div className='field'>
          <label className='label'>Description</label>
          <div className='control'>
            <textarea
              className='textarea'
              rows='2'
              name='description'
              onChange={handleChange}
              value={description}
              placeholder='Add a description for this ticket...'
            >
            </textarea>
          </div>
        </div>

        <div className='columns'>
          <div className='column is-half'>
            <div className='field'>
              <label className='label'>Tasks</label>
              <div
                className='notification'
                style={{ paddingBottom: `${newTaskText.length > 50 ? 0 : '22px'}` }}
              >
                <ul>
                  {tasks.map((task, index) => (
                    <li
                      key={index}
                      onMouseEnter={() => setHoveredTask(task)}
                      onMouseLeave={() => setHoveredTask(null)}
                      className={`${task.complete ? 'complete-task' : ''} 
                        ${hoveredTask === task ? 'hovered-task' : ''}`}
                    >
                      <div>
                        <p>
                          <span onClick={() => toggleCompleteTask(index)}>
                            {task.text}
                          </span>
                        </p>
                        <div>
                          <button
                            type='button'
                            className='delete is-small'
                            onClick={() => deleteTask(index)}
                          ></button>
                        </div>
                      </div>
                    </li>
                  ))}
                  <li
                    onMouseEnter={() => setNewTaskIsHovered(true)}
                    onMouseLeave={() => setNewTaskIsHovered(false)}
                    className={`new-task ${newTaskIsHovered || newTaskIsFocused ? 'hovered-task' : ''}`}
                  >
                    <div>
                      <input
                        type='text'
                        value={newTaskText}
                        onChange={e => setNewTaskText(e.target.value)}
                        onFocus={() => setNewTaskIsFocused(true)}
                        onBlur={() => setNewTaskIsFocused(false)}
                      />
                      <div>
                        <button
                          type='button'
                          className='delete is-small add-task'
                          onClick={addTask}
                        ></button>
                      </div>
                    </div>
                  </li>
                </ul>
                {newTaskText.length > 50 &&
                  <p className='help is-danger'>Max. 50 characters</p>
                }
              </div>
            </div>
          </div>

          <div className='column is-half'>
            <div className='field'>
              <label className='label'>Priority</label>
              <div className='control has-icons-left'>
                <div className='select'>
                  <select
                    className='priority-select'
                    name='priority'
                    onChange={handleChange}
                    value={priority}
                  >
                    <option value={0}>None</option>
                    <option value={3}>Low</option>
                    <option value={2}>Medium</option>
                    <option value={1}>High</option>
                  </select>
                </div>
                <div className='icon is-left'>
                  <FontAwesomeIcon
                    icon={faFlag}
                    className={`${priority == 0 ?
                      'no-priority' : priority == 1 ?
                        'high-priority' : priority == 2 ?
                          'medium-priority' : 'low-priority'
                    }`}
                  />
                </div>
              </div>
            </div>
            <div className='field'>
              <label className='label'>Deadline</label>
              <div className='control'>
                <DateTimePicker
                  onChange={datetime => handleChange({ target: { name: 'deadline', value: datetime } }) }
                  value={deadline}
                  disableCalendar={true}
                  disableClock={true}
                  maxDate={new Date('Jan 1 10000 00:00:00')}
                />
              </div>
            </div>
          </div>
        </div>

        <div className='field'>
          <label className='label'>Holders</label>
          <div className='control'>
            <Select
              options={selectOptions}
              isMulti
              name='holders'
              onChange={selected => handleSelectChange(selected)}
              value={selectValues}
            />
          </div>
        </div>
        
        <div className='field'>
          <label className='label'>Comments</label>
          {comments.map((comment, index) => (
            <article key={index} className={`media ${currentUser.id === comment.commentor.id ?
              'current-user-comment' : 'other-user-comment'}`}>
              {currentUser.id === comment.commentor.id &&
                <figure className='media-left'>
                  <Avatar
                    size='medium'
                    avatar={comment.commentor.avatar}
                    fullName={comment.commentor.fullName}
                  />
                </figure>
              }
              <div className='media-content'>
                <div className='content'>
                  <p >
                    <strong>{comment.commentor.fullName}</strong>
                    <br/>
                    {comment.text}
                    <br/>
                    {currentUser.id === comment.commentor.id &&
                      <a className='comment-delete' onClick={() => deleteComment(index)}>
                        Delete
                      </a>
                    }
                  </p>
                </div>
              </div>
              {currentUser.id !== comment.commentor.id &&
                <figure className='media-right'>
                  <Avatar
                    size='medium'
                    avatar={comment.commentor.avatar}
                    fullName={comment.commentor.fullName}
                  />
                </figure>
              }
            </article>
          ))}
          <article className='media'>
            <figure className='media-left'>
              <Avatar
                size='medium'
                avatar={currentUser.avatar}
                fullName={currentUser.fullName}
              />
            </figure>
            <div className='media-content'>
              <div className='field'>
                <p className='control'>
                  <textarea
                    className={`textarea ${newCommentText.length > 300 ? 'is-danger' : ''}`}
                    rows='2'
                    value={newCommentText}
                    onChange={e => setNewCommentText(e.target.value)}
                    placeholder='Add a comment...'
                  ></textarea>
                </p>
              </div>
              <div className='field' style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p className='control'>
                  <button
                    type='button'
                    className='button'
                    onClick={postComment}
                  >
                    Post Comment
                  </button>
                </p>
                {newCommentText.length > 300 &&
                  <p className='help is-danger' style={{ marginTop: 0 }}>
                    Max. 300 characters
                  </p>
                }
              </div>
            </div>
          </article>
        </div>
      </section>

      <footer className='modal-card-foot'>
        <button type='submit' className='button is-success'>Save Changes</button>
        <button type='button' className='button' onClick={handleDelete}>
            Delete
        </button>
      </footer>
    </form>
  )
}

export default TicketShow