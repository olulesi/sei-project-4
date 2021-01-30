function dragAndDrop() {

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
      const newColumns = {
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          // the new items order 
          items: sourceItems
        },
        // now to keep the dest items in place with addition of new ticket so sending in the set state 
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      }
      setColumns(newColumns)
      return newColumns
    } else {
      const column = columns[source.droppableId]
      const copiedItems = [...column.items]
      const [removed] = copiedItems.splice(source.index, 1)
      copiedItems.splice(destination.index, 0, removed)
      const newColumns = {
        // to keep all columns in place
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      }
      setColumns(newColumns)
      return newColumns
    }
  }
  
  return onDragEnd
}

export default dragAndDrop