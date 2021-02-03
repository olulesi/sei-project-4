/* eslint-disable no-unused-vars */
import React from 'react'
import { useParams } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import TicketCard from './TicketCard'
import TicketShow from './TicketShow'
// import Avatar from '../common/Avatar'
import { getKanban, editKanban, findUser, createColumn, editColumn, deleteColumn,
  createTicket, getTicket, editTicket, deleteTicket } from '../../lib/api'
// import { isOwner } from '../../lib/auth'
import useForm from '../../utils/useForm'
import ColumnHeader from './ColumnHeader'
import AddNewColumn from './AddNewColumn'
import AddNewTicket from './AddNewTicket'
import useErrorAnimation from '../../utils/useErrorAnimation'
import dragAndDrop from '../../utils/dragAndDrop'
import KanbanNav from '../common/navBars/KanbanNav'

const onDragEnd = dragAndDrop()

function objectifyColumns(columnsArray) {
  const obj = {}
  const sortedColumns = [...columnsArray].sort((a, b) => a.position - b.position)
  for (const column of sortedColumns) {
    obj[column.position] = { id: column.id, name: column.name, items: [] }
    const sortedTickets = [...column.tickets].sort((a, b) => a.position - b.position)
    for (const ticket of sortedTickets) {
      obj[column.position].items.push({ ...ticket, id: String(ticket.id) })
    }
  }
  return obj
}

const updateTicketsAffectedByDND = async (result, newColumns) => {
  if (!result.destination) return
  const requestsArray = []
  let destinationPositionCount = 1
  for (const ticket of newColumns[result.destination.droppableId].items) {
    requestsArray.push(editTicket(ticket.id, {
      ...ticket,
      column: newColumns[result.destination.droppableId].id,
      position: destinationPositionCount
    }))
    destinationPositionCount++
  }
  let sourcePositionCount = 1
  for (const ticket of newColumns[result.source.droppableId].items) {
    requestsArray.push(editTicket(ticket.id, {
      ...ticket,
      column: newColumns[result.source.droppableId].id,
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
  const [newColumnName, setNewColumnName] = React.useState('')
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

  const members = kanban ? kanban.members.sort((a,b) => a.id === kanban.owner.id ? -1 : 0) : null

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

  const handleColumnCreate = async event => {
    event.preventDefault()
    if (!newColumnName) return
    const newColumnPosition = Object.keys(columns).length + 1
    try {
      const { data } = await createColumn({
        name: newColumnName,
        position: newColumnPosition,
        kanban: id
      })
      setColumns({
        ...columns,
        [newColumnPosition]: {
          id: data.id,
          name: newColumnName,
          items: []
        }
      })
      setNewColumnName('')
    } catch (err) {
      console.log(err)
    }
  }

  const handleColumnSubmit = async (columnId, position, newName) => {
    try {
      const { data } = await editColumn(columnId, {
        name: newName,
        position: position,
        kanban: id
      })
      setColumns({
        ...columns,
        [position]: {
          ...columns[position],
          name: newName
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  const handleColumnDelete = async (id, position) => {
    try {
      await deleteColumn(id)
      const { [position]: _, ...rest } = columns
      setColumns(rest)
    } catch (err) {
      console.log(err)
    }
  }

  const handleTicketCreate = async (columnId, columnPosition, newTicketName) => {
    const newTicketPosition = columns[columnPosition].items.length + 1
    try {
      const { data } = await createTicket({
        name: newTicketName,
        position: newTicketPosition,
        column: columnId
      })
      setColumns({
        ...columns,
        [columnPosition]: {
          ...columns[columnPosition],
          items: [
            ...columns[columnPosition].items,
            { ...data, id: String(data.id), creator: currentUser, tasks: [], comments: [] }
          ]
        }
      })
    } catch (err) {
      console.log(err)
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

  const handleTicketDelete = async () => {
    try {
      await deleteTicket(formdata.id)
      setFormdata(null)
      rerender()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      { kanban &&
        <KanbanNav
          kanbanName={kanban.name} 
          members={members} 
          addMemberEmail={addMemberEmail}
          handleAddMemberEmailChange={handleAddMemberEmailChange} 
          handleAddMember={handleAddMember} 
          addMemberError={addMemberError}
          hasErrorAnimationClass={hasErrorAnimationClass}
        />
      }
      
      {kanban ?
        <>
          <section className={`kanban-page kanban-background-${kanban.background}`}>
            {columns &&
              <div className='kanBan-container'>
                <DragDropContext
                  onDragEnd={result => {
                    const newColumns = onDragEnd(result, columns, setColumns)
                    updateTicketsAffectedByDND(result, newColumns)
                  }}
                >
                  {Object.entries(columns).map(([id, column]) => {
                    return (
                      <div className='column-container column is-narrow' key={id}>
                        <ColumnHeader
                          id={column.id}
                          position={id}
                          name={column.name}
                          numberOfTickets={column.items.length}
                          handleSubmit={handleColumnSubmit}
                          handleDelete={handleColumnDelete}
                        />
                        <div className='ticket-container'>
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

                        <AddNewTicket
                          columnId={column.id}
                          columnPosition={id}
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
                  setNewColumnName={setNewColumnName}/>
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
            handleDelete={handleTicketDelete}
            members={members}
            currentUser={currentUser}
          />
        </div>
      }
    </>
  )
}

export default KanbanView