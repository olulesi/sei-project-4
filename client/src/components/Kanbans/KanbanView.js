import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

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



const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return
  const { source, destination } = result
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId]
    const destColumn = columns[destination.droppableId]
    const sourceItems = [...sourceColumn.items]
    const destItems = [...destColumn.items]
    //now we remove it from the original array and place on the destination array
    const [removed] = sourceItems.splice(source.index, 1)
    destItems.splice(destination.index, 0, removed)
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        // the new items order 
        items: sourceItems
      },
      // now to keep the dest items in place with addition of new ticket so sending in the set state 
      [ destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    })
  } else {
    const column = columns[source.droppableId]
    const copiedItems = [...column.items]
    const [removed] = copiedItems.splice(source.index, 1)
    copiedItems.splice(destination.index, 0, removed)
    setColumns({
    // to keep all columns in place
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    })
  }
}
function KanbanView() {

  const [columns, setColumns] = React.useState(columnsFromBackend)

  return (

    <>
      <div className="kanBan-container">
        <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
          {Object.entries(columns).map(([id, column]) => {
            return (
              <div className="column-container" key={id}>
                <h2>{column.name}</h2>
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
                                      className={`${snapshot.isDraggingOver ? 'isDragging' : 'isntDragging'}`}>
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