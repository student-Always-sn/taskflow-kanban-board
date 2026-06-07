import { Draggable } from '@hello-pangea/dnd'

const LABEL_COLORS = {
  'Feature':  'bg-sky-900 text-sky-300',
  'Bug':      'bg-red-900 text-red-300',
  'Backend':  'bg-amber-900 text-amber-300',
  'Design':   'bg-violet-900 text-violet-300',
  'Testing':  'bg-orange-900 text-orange-300',
  'Deploy':   'bg-green-900 text-green-300',
  'Research': 'bg-pink-900 text-pink-300',
}


function Card({ card, onDelete, index }) {
 
  const labelClass = LABEL_COLORS[card.label] || 'bg-gray-700 text-gray-300'

  return (
    
    <Draggable draggableId={String(card.id)} index={index}>

      
      {(provided, snapshot) => (

        <div
         
          ref={provided.innerRef}          
          {...provided.draggableProps}     
          {...provided.dragHandleProps}    

        
          className={`
            group
            bg-gray-800
            border
            rounded-xl
            p-3
            cursor-grab
            active:cursor-grabbing
            transition-all
            duration-150
            ${snapshot.isDragging
              
              ? 'border-violet-500 shadow-xl shadow-violet-900/40 rotate-1 scale-105'
              
              : 'border-gray-700 hover:border-violet-500/60 hover:shadow-md hover:shadow-black/30'
            }
          `}
        >          
          <div className="flex items-start justify-between gap-2 mb-2">

            
            {card.label && (
              <span className={`
                text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0
                ${labelClass}
              `}>
                {card.label}
              </span>
            )}

            
            <button
              onClick={() => onDelete(card.id)} 
              onMouseDown={(e) => e.stopPropagation()}
              className="
                opacity-0 group-hover:opacity-100
                ml-auto flex-shrink-0
                text-gray-500 hover:text-red-400
                text-xl leading-none
                transition-all duration-150
              "
              title="Delete card"
            >
              &times;
            </button>
          </div>
          <p className="text-gray-200 text-sm leading-relaxed">
            {card.text}
          </p>

        </div>
      )}
    </Draggable>
  )
}

export default Card

