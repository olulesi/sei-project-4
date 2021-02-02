/* eslint-disable no-unused-vars */
import React from 'react'
import { useParams } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import TicketCard from './TicketCard'
import TicketShow from './TicketShow'
import Avatar from '../common/Avatar'
import { getKanban, editKanban, findUser, getTicket, editTicket } from '../../lib/api'
import { isOwner } from '../../lib/auth'
import useForm from '../../utils/useForm'
import useErrorAnimation from '../../utils/useErrorAnimation'
import dragAndDrop from '../../utils/dragAndDrop'
import AddNewColumn from './AddNewColumn'
import CreateTicket from './CreateTicket'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearchPlus } from '@fortawesome/free-solid-svg-icons'

const onDragEnd = dragAndDrop()

function objectifyColumns(columnsArray) {
  const obj = {}
  const sortedColumns = [...columnsArray].sort((a, b) => a.position - b.position)
  for (const column of sortedColumns) {
    obj[column.position] = { name: column.name, items: [] }
    const sortedTickets = [...column.tickets].sort((a, b) => a.position - b.position)
    for (const ticket of sortedTickets) {
      obj[column.position].items.push({ ...ticket, id: String(ticket.id) })
    }
  }
  return obj
}

const updateTicketsAffectedByDND = async (result, newColumns) => {
  console.log(newColumns)
  if (!result.destination) return
  const requestsArray = []
  let destinationPositionCount = 1
  for (const ticket of newColumns[result.destination.droppableId].items) {
    requestsArray.push(editTicket(ticket.id, {
      ...ticket,
      column: result.destination.droppableId,
      position: destinationPositionCount
    }))
    destinationPositionCount++
  }
  let sourcePositionCount = 1
  for (const ticket of newColumns[result.source.droppableId].items) {
    requestsArray.push(editTicket(ticket.id, {
      ...ticket,
      column: result.source.droppableId,
      position: sourcePositionCount
    }))
    sourcePositionCount++
  }
  await Promise.all(requestsArray)
}

function KanbanView() {

  const [kanban, setKanban] = React.useState(null)
  const [columns, setColumns] = React.useState(null)
  const { formdata, setFormdata, handleChange } = useForm(null)
  const [rerenderSwitch, setRerenderSwitch] = React.useState(0)
  const [addMemberEmail, setAddMemberEmail] = React.useState('')
  const [addMemberError, setAddMemberError] = React.useState(false)
  const { hasErrorAnimationClass, errorAnimation } = useErrorAnimation()
  const [newColumnName, setnewColumnName] = React.useState('')
  const [newTicketName, setNewTicketName] = React.useState('')
  const { id } = useParams()

  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getKanban(id)
        setKanban(data)
        setColumns(objectifyColumns(data.columns))
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [id, rerenderSwitch])

  const rerender = () => {
    setRerenderSwitch(1 ^ rerenderSwitch)
  }

  const members = kanban ? kanban.members : null

  const currentUser = kanban ? kanban.members.find(member => member.id === 1) : null
  // ! const currentUser = kanban ? kanban.members.find(member => isOwner(member.id)) : null

  const handleAddMemberEmailChange = event => {
    setAddMemberEmail(event.target.value)
    setAddMemberError(false)
  }

  const handleAddMember = async event => {
    event.preventDefault()
    try {
      const { data } = await findUser(addMemberEmail)
      const membersIds = kanban.members.map(member => member.id)
      membersIds.push(data.id)
      await editKanban(id, {
        name: kanban.name,
        background: kanban.background,
        owner: kanban.owner.id,
        members: [...new Set(membersIds)]
      })
      setAddMemberEmail('')
      rerender()
    } catch (err) {
      setAddMemberError(true)
      errorAnimation()
    }
  }

  const handleTicketShow = async id => {
    try {
      const { data } = await getTicket(id)
      setFormdata(data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleTicketSubmit = async event => {
    event.preventDefault()
    try {
      await editTicket(formdata.id, formdata)
      setFormdata(null)
      rerender()
    } catch (err) {
      console.log(err)
    }
  }

  const handleColumnCreate = e => {
    e.preventDefault()
    if (!newColumnName) return
    const newColumnLength = Object.keys(columns).length + 1
    const listOfColumns = {
      ...columns,
      [newColumnLength]: {
        name: newColumnName,
        items: []
      }
    }
    setnewColumnName('')
    setColumns(listOfColumns)
    console.log('submitted')
  }

  const handleTicketCreate = e => {
    e.preventDefault()
    const currColumn = e.target.name
    if (!newTicketName) return
    console.log(columns[currColumn])
    console.log(newTicketName)
    const listOfColumns = {
      ...columns,
      [currColumn]: {
        name: columns[currColumn].name,
        items: [{
          name: newTicketName,
          id: '100'
        }, ...columns[currColumn].items]
      }
    }
    setNewTicketName('')
    setColumns(listOfColumns)
    console.log('submitted')
  }

  return (
    <>
      <div className='members-avatars-container'>
        {kanban &&
          kanban.members.map((member, index) => (
            <div key={member.id}>
              <Avatar
                size='medium'
                avatar={member.avatar}
                fullName={member.fullName}
                hasTooltip={true}
                style={{
                  position: 'relative',
                  left: `${members.length % 2 === 1 ?
                    15 * (index - Math.floor(members.length / 2))
                    :
                    15 * (index - ((members.length - 1) / 2))
                  }px`,
                  zIndex: `${members.length - index}`
                }}
              />
            </div>
          ))
        }
      </div>

      <div className='add-member'>
        <form
          onSubmit={handleAddMember}
          className={`${hasErrorAnimationClass ? 'error-animation' : ''}`}
        >
          <div className='field'>
            <div className='control has-icons-left'>
              <input
                type='text'
                className={`input ${addMemberError ? 'is-danger' : ''}`}
                onChange={handleAddMemberEmailChange}
                value={addMemberEmail}
                placeholder='Add member by email...'
              />
              <span className='icon is-small is-left'>
                <FontAwesomeIcon icon={faSearchPlus}/>
              </span>
            </div>
          </div>
        </form>
      </div>
      
      {kanban ?
        <>
          <section className={`kanban-background-${kanban.background}`}>
            {columns &&
              <div className="kanBan-container">
                <DragDropContext
                  onDragEnd={result => {
                    const newColumns = onDragEnd(result, columns, setColumns)
                    updateTicketsAffectedByDND(result, newColumns)
                  }}
                >
                  {Object.entries(columns).map(([id, column]) => {
                    return (
                      <div className="column-container column is-narrow" key={id}>
                        <div className="message-header">
                          <h2>{column.name}</h2>
                          <span className="pagination-ellipsis">&hellip;</span>
                        </div>

                        <div className="ticket-container">
                          <Droppable droppableId={id} >
                            {(provided, snapshot) => {
                              return (
                                <div
                                  {...provided.droppableProps}
                                  ref={provided.innerRef}
                                  className={`${snapshot.isDraggingOver ? 'isDraggingOver-column' : 'isntDraggingOver'}`}>
                                  {column.items.map((item, index) => {
                                    return (
                                      // index used to tell us where we are dragging from and where we are dragging to
                                      <Draggable key={item.id} draggableId={item.id} index={index}>
                                        {(provided, snapshot) => {
                                          return (
                                            <TicketCard
                                              provided={provided}
                                              snapshot={snapshot}
                                              item={item}
                                              handleTicketShow={handleTicketShow}
                                            />
                                          )
                                        }}
                                      </Draggable>
                                    )
                                  })}
                                  {provided.placeholder}
                                </div>
                              )
                            }}
                          </Droppable>
                        </div>

                        <CreateTicket
                          id={id}
                          newTicketName={newTicketName}
                          setNewTicketName={setNewTicketName}
                          handleSubmit={handleTicketCreate}
                          columns={columns}
                        />
                      </div>
                    )
                  })}
                </DragDropContext>
                <AddNewColumn
                  handleSubmit={handleColumnCreate}
                  newColumnName={newColumnName}
                  setnewColumnName={setnewColumnName}/>
              </div>
            }
          </section>
        </>
        :
        <div>🇳🇬</div>
      }

      {formdata &&
        <div className='modal is-active'>
          <div className='modal-background'></div>
          <TicketShow
            formdata={formdata}
            setFormdata={setFormdata}
            handleChange={handleChange}
            handleSubmit={handleTicketSubmit}
            members={members}
            currentUser={currentUser}
          />
        </div>
      }
    </>
  )
}

export default KanbanView