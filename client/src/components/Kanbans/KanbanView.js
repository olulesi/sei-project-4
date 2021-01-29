import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import dragAndDrop from '../../utils/dragAndDrop'

const itemsFromBackend = [
  { id: '1', content: 'First task' },
  { id: '2', content: 'Second task' }
]

const columnsFromBackend = 
  {
    '21': {
      name: 'Todo',
      items: itemsFromBackend
    },
    '22': {
      name: 'Progress',
      items: []
    },
    '23': {
      name: 'Done',
      items: []
    } 
  }


const onDragEnd = dragAndDrop()

function KanbanView() {

  const [columns, setColumns] = React.useState(columnsFromBackend)

  return (

    <>
      <div className="kanBan-container">
        <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
          {Object.entries(columns).map(([id, column]) => {
            return (
              <div className="column-container column is-narrow" key={id}>
                <div className="message-header">
                  <h2>{column.name}</h2>
                  <span className="pagination-ellipsis">&hellip;</span>
                </div>
                <div>
                  <Droppable  droppableId={id} >
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
                                      {item.content}
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
      </div>
    </>
  )


}
export default KanbanView