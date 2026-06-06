const initialData = {
  columns: {
    'col-1': {
      id: 'col-1',
      title: 'To Do',
      color: 'bg-sky-400',
      cardIds: ['card-1', 'card-2', 'card-3'],
    },
    'col-2': {
      id: 'col-2',
      title: 'In Progress',
      color: 'bg-amber-400',
      cardIds: ['card-4'],
    },
    'col-3': {
      id: 'col-3',
      title: 'Review',
      color: 'bg-orange-400',
      cardIds: [],
    },
    'col-4': {
      id: 'col-4',
      title: 'Done',
      color: 'bg-violet-400',
      cardIds: [],
    },
  },
  cards: {
    'card-1': { id: 'card-1', text: 'Set up project structure',   label: 'Feature'  },
    'card-2': { id: 'card-2', text: 'Fix login page bug',         label: 'Bug'      },
    'card-3': { id: 'card-3', text: 'Design dashboard wireframe', label: 'Design'   },
    'card-4': { id: 'card-4', text: 'Build the REST API',         label: 'Backend'  },
  }, 
  columnOrder: ['col-1', 'col-2', 'col-3', 'col-4'],
}

export default initialData