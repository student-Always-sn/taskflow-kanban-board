import { useState } from 'react'
import { Droppable } from '@hello-pangea/dnd'
import Card from './Card'


const LABEL_OPTIONS = ['Feature', 'Bug', 'Backend', 'Design', 'Testing', 'Deploy', 'Research']

function Column({ column, cards, onAddCard, onDeleteCard }) {
  const [isAdding, setIsAdding] = useState(false) 
  const [newText, setNewText] = useState('') 
  const [newLabel, setNewLabel] = useState('Feature')
 
  const handleSubmit = () => {
    
    if (!newText.trim()) return
   onAddCard(column.id, newText.trim(), newLabel)
 
    setNewText('')
    setNewLabel('Feature')
    setIsAdding(false)
  }

  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()  
      handleSubmit()
    }
    if (e.key === 'Escape') {
      setIsAdding(false)
      setNewText('')
    }
  }

  
  return (
    
    <div className="w-72 flex-shrink-0 flex flex-col">
 
      <div className="flex items-center gap-2 mb-3 px-1">
        
        <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${column.color}`} />
        
        <h2 className="text-white font-semibold text-sm flex-1">
          {column.title}
        </h2>

        <span className="bg-gray-800 text-gray-400 text-xs px-2 py-0.5 rounded-full border border-gray-700">
          {cards.length}
        </span>
      </div>

      
      <Droppable droppableId={column.id}>
       
        {(provided, snapshot) => (
          <div   
            ref={provided.innerRef}
            {...provided.droppableProps}

            className={`
              flex-1
              rounded-xl
              p-3
              space-y-3
              min-h-[80px]
              border
              transition-colors duration-150
              ${snapshot.isDraggingOver
                
                ? 'bg-violet-950/40 border-violet-500/50'
                
                : 'bg-gray-900 border-gray-800'
              }
            `}
          >
            
            {cards.map((card, index) => (
              <Card
                key={card.id}
                card={card}
                index={index}
                onDelete={onDeleteCard}  
              />
            ))}

            
            {provided.placeholder}

          </div>
        )}
      </Droppable>

      
      <div className="mt-2">

        {isAdding ? (
          
          <div className="bg-gray-900 rounded-xl p-3 border border-gray-700 space-y-2">       
            <textarea
              
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="What needs to be done? (Enter to save)"
              rows={3}
              autoFocus  
              className="
                w-full bg-gray-800 text-white text-sm
                p-2.5 rounded-lg border border-gray-700
                focus:border-violet-500 focus:outline-none
                resize-none placeholder-gray-600
              "
            />

            
            <select
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              className="
                w-full bg-gray-800 text-gray-300 text-sm
                p-2 rounded-lg border border-gray-700
                focus:border-violet-500 focus:outline-none
              "
            >
              {LABEL_OPTIONS.map(label => (
                <option key={label} value={label}>{label}</option>
              ))}
            </select>

            
            <div className="flex gap-2">
              <button
                onClick={handleSubmit}
                className="
                  flex-1 bg-violet-600 hover:bg-violet-500
                  text-white text-sm font-semibold
                  py-2 rounded-lg transition-colors
                "
              >
                Add card
              </button>
              <button
                onClick={() => { setIsAdding(false); setNewText('') }}
                className="
                  px-3 bg-gray-800 hover:bg-gray-700
                  text-gray-400 text-sm rounded-lg
                  border border-gray-700 transition-colors
                "
              >
                Cancel
              </button>
            </div>
          </div>

        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="
              w-full py-2 rounded-xl text-sm
              text-gray-500 hover:text-violet-400
              border border-dashed border-gray-800
              hover:border-violet-500/50
              hover:bg-violet-950/20
              transition-all duration-150
            "
          >
            + Add card
          </button>
        )}
      </div>

    </div>
  )
}

export default Column
