import { useState, useEffect } from 'react'
import { DragDropContext } from '@hello-pangea/dnd'
import { v4 as uuidv4 } from 'uuid'
import Column from './Components/Column'
import InitialData from './InitialData'

function App() {

  
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem('kanban-board-data')
      
      return saved ? JSON.parse(saved) : InitialData
    } catch {
      
      return InitialData
    }
  })

  
  const [boardTitle, setBoardTitle] = useState(
    () => localStorage.getItem('kanban-board-title') || 'My Kanban Board'
  )
  const [isEditingTitle, setIsEditingTitle] = useState(false)

  
  useEffect(() => {
    localStorage.setItem('kanban-board-data', JSON.stringify(data))
  }, [data])  

  useEffect(() => {
    localStorage.setItem('kanban-board-title', boardTitle)
  }, [boardTitle])

  
  const handleAddCard = (columnId, text, label) => {
   
    const newCardId = uuidv4()

    
    setData(prev => ({
      ...prev,        

      
      cards: {
        ...prev.cards,                          
        [newCardId]: {                          
          text: text,
          label: label,
        }
      },

      
      columns: {
        ...prev.columns,                        
        [columnId]: {
          ...prev.columns[columnId],            
          cardIds: [
            ...prev.columns[columnId].cardIds, 
            newCardId                           
          ]
        }
      }
    }))
  }

  
  const handleDeleteCard = (cardId) => {
    setData(prev => {
      
      const updatedColumns = {}
      for (const [colId, col] of Object.entries(prev.columns)) {
        updatedColumns[colId] = {
          ...col,
          
          cardIds: col.cardIds.filter(id => id !== cardId)
        }
      }

      
      const updatedCards = { ...prev.cards }
      delete updatedCards[cardId]

      return {
        ...prev,
        columns: updatedColumns,
        cards: updatedCards,
      }
    })
  }

  
  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result

    
    if (!destination) return

    
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return

    
    const sourceColumn = data.columns[source.droppableId]
    const destColumn   = data.columns[destination.droppableId]

    
    const sourceCardIds = Array.from(sourceColumn.cardIds)
    const destCardIds   = Array.from(destColumn.cardIds)

    
    if (source.droppableId === destination.droppableId) {
      
      sourceCardIds.splice(source.index, 1)
      
      sourceCardIds.splice(destination.index, 0, draggableId)

      setData(prev => ({
        ...prev,
        columns: {
          ...prev.columns,
          [sourceColumn.id]: {
            ...sourceColumn,
            cardIds: sourceCardIds  
          }
        }
      }))
      return
    }

    
    sourceCardIds.splice(source.index, 1)
    
    destCardIds.splice(destination.index, 0, draggableId)

    setData(prev => ({
      ...prev,
      columns: {
        ...prev.columns,
        
        [sourceColumn.id]: { ...sourceColumn, cardIds: sourceCardIds },
        [destColumn.id]:   { ...destColumn,   cardIds: destCardIds   }
      }
    }))
  }

  
  const totalCards = Object.keys(data.cards).length
  const doneCards  = data.columns['col-4'].cardIds.length

  
  return (
   
    <div className="min-h-screen bg-gray-950">

      
      <div className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">

        <div className="flex items-center gap-4">
          
          {isEditingTitle ? (
            <input
              className="
                text-white text-xl font-bold bg-transparent
                border-b-2 border-violet-500 outline-none
                min-w-[200px]
              "
              value={boardTitle}
              onChange={(e) => setBoardTitle(e.target.value)}
              onBlur={() => setIsEditingTitle(false)}
              onKeyDown={(e) => e.key === 'Enter' && setIsEditingTitle(false)}
              autoFocus
            />
          ) : (
            <h1
              className="text-white text-xl font-bold cursor-pointer hover:text-violet-400 transition-colors"
              onClick={() => setIsEditingTitle(true)}
              title="Click to edit title"
            >
              {boardTitle}
            </h1>
          )}

          
          <span className="text-gray-500 text-sm hidden sm:block">
            {doneCards} / {totalCards} done
          </span>
        </div>

        
        <button
          onClick={() => {
            localStorage.removeItem('kanban-board-data')
            setData(InitialData)
          }}
          className="text-xs text-gray-600 hover:text-red-400 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-950/30 border border-transparent hover:border-red-900/50"
        >
          Reset board
        </button>
      </div>

      
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex gap-5 p-6 overflow-x-auto min-h-[calc(100vh-73px)]">

          
          {data.columnOrder.map(columnId => {

            
            const column = data.columns[columnId]

            const cards = column.cardIds.map(cardId => data.cards[cardId])

            return (
              <Column
                key={column.id}           
                column={column}           
                cards={cards}             
                onAddCard={handleAddCard}       
                onDeleteCard={handleDeleteCard} 
              />
            )
          })}

        </div>
      </DragDropContext>

    </div>
  )
}

export default App
