/* eslint-disable no-unused-vars */
import React from 'react'
import { useParams } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import { getKanban, editTicket } from '../../lib/api'
import dragAndDrop from '../../utils/dragAndDrop'
import AddNewColumn from './AddNewColumn'
import CreateTicket from './CreateTicket'

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
  if (!result.destination) return
  const requestsArray = []
  let destinationPositionCount = 1
  for (const ticket of newColumns[result.destination.droppableId].items) {
    requestsArray.push(editTicket(ticket.id, {
      name: ticket.name,
      column: result.destination.droppableId,
      position: destinationPositionCount
    }))
    destinationPositionCount++
  }
  let sourcePositionCount = 1
  for (const ticket of newColumns[result.source.droppableId].items) {
    requestsArray.push(editTicket(ticket.id, {
      name: ticket.name,
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
  }, [id])

  const handleSubmit = e => {
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

  const handleTicketSubmit = e => {
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
                        <CreateTicket
                          id={id}
                          newTicketName={newTicketName}
                          setNewTicketName={setNewTicketName}
                          handleTicketSubmit={handleTicketSubmit}
                          columns={columns}
                        />

                        <div>
                          <Droppable droppableId={id} >
                            {(provided, snapshot) => {
                              return (
                                <div
                                  {...provided.droppableProps}
                                  ref={provided.innerRef}
                                  className={`${snapshot.isDraggingOver ? 'isDraggingOver-column' : 'isntDraggingOver'}`}>
                                  {column.items.map((item, index) => {
                                    return (
                                      // that index is used to tell us what we are dragging from and what we are dragging to
                                      <Draggable key={item.id} draggableId={item.id} index={index}>
                                        {(provided, snapshot) => {
                                          return (
                                            <div
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                              ref={provided.innerRef}
                                              style={{
                                                userSelect: 'none',
                                                padding: 16,
                                                margin: '0 0 8px 0',
                                                minHeight: '50px',
                                                color: 'white',
                                                ...provided.draggableProps.style
                                              }}
                                              className={`message-body ${snapshot.isDraggingOver ? 'isDragging' : 'isntDragging'}`}>
                                              {item.name}
                                            </div>
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
                      </div>
                    )
                  })}
                </DragDropContext>
                <AddNewColumn
                  handleSubmit={handleSubmit}
                  newColumnName={newColumnName}
                  setnewColumnName={setnewColumnName} />
              </div>
            }
          </section>
        </>
        :
        <div>🇳🇬</div>
      }
    </>
  )
}

export default KanbanView