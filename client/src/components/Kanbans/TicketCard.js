/* eslint-disable no-unused-vars */
import React from 'react'

import Avatar from '../common/Avatar'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faFlag, faAlignLeft } from '@fortawesome/free-solid-svg-icons'
import { faClock, faComment, faComments, faCheckCircle } from '@fortawesome/free-regular-svg-icons'

function TicketCard({ provided, snapshot, item, handleTicketShow }) {

  const { name, priority, deadline, description, comments, tasks, holders } = item

  const [isHovered, setIsHovered] = React.useState(false)

  const formattedDeadline = deadline ?
    `${new Date(deadline).toLocaleDateString().slice(0,5)} ${new Date(deadline).toLocaleTimeString().slice(0,5)}`
    : ''

  const completeTasks = tasks.filter(task => task.complete).length
  const totalTasks = tasks.length

  const hasTopIcons = priority || deadline
  const hasBottomIcons = description || comments.length || totalTasks

  return (
    <div
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={provided.innerRef}
      style={{
        margin: '0 8px 8px',
        ...provided.draggableProps.style
      }}
      className={
        `ticket-card
        ${hasTopIcons ? 'has-top-icons' : ''}
        ${hasBottomIcons ? 'has-bottom-icons' : ''}
        ${isHovered ? 'hovered' : ''}
        ${snapshot.isDraggingOver ? 'isDragging' : 'isntDragging'}`
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className='icons-wrapper'>
        {priority !== 0 &&
          <div>
            <FontAwesomeIcon
              icon={faFlag}
              size='xs'
              className={
                `icon-before-something
                ${priority === 1 ? 'high-priority' : priority === 2 ? 'medium-priority' : 'low-priority'}`}
            />
          </div>
        }
        {deadline &&
          <div>
            <FontAwesomeIcon icon={faClock} className='icon-before-something'/>
            <span>{formattedDeadline}</span>
          </div>
        }
      </div>
      <div className='name-wrapper'>
        <p>{name}</p>
        <button>
          <FontAwesomeIcon icon={faEdit} onClick={() => handleTicketShow(item.id)}/>
        </button>
      </div>
      <div className='icons-avatars-wrapper'>
        <div className='icons-wrapper'>
          {description &&
            <div>
              <FontAwesomeIcon icon={faAlignLeft}/>
            </div>
          }
          {totalTasks > 0 &&
            <div>
              <FontAwesomeIcon icon={faCheckCircle} className='icon-before-something'/>
              <span>{completeTasks}/{totalTasks}</span>
            </div>
          }
          {comments.length === 1 &&
            <div>
              <FontAwesomeIcon icon={faComment} className='icon-before-something'/>
              <span>1</span>
            </div>  
          }
          {comments.length > 1 &&
            <div>
              <FontAwesomeIcon icon={faComments} className='icon-before-something'/>
              <span>{comments.length}</span>
            </div>
          }
        </div>
        {holders.length > 0 &&
          <div className='avatars-container'>
            {holders.slice(0,3).map((holder, index) => (
              <div key={holder.id}>
                <Avatar
                  size='small'
                  avatar={holder.avatar}
                  fullName={holder.fullName}
                  style={{ position: 'relative', left: `${7.5 * index}px`, zIndex: `${3 - index}` }}
                />
              </div>
            ))}
            {holders.length > 3 &&
              <div className='ellipsis'><p>...</p></div>
            }
          </div>
        }
      </div>
    </div>
  )
}

export default TicketCard