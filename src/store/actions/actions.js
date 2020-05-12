const todosLoaded = payload => ({ type: 'FETCH_TODOS_SUCCESS', payload })
const todosError = error => ({ type: 'FETCH_TODOS_FAILURE', payload: error })
const fetchTodos = (crudTableService, dispatch) => () => {
	crudTableService.getTodos()
		.then(data => dispatch(todosLoaded(data)))
		.catch(err => dispatch(todosError(err)))
}

const onTodoAdded = todos => ({ type: 'ON_TODO_ADDED', payload: todos })
const onTodoSearch = text => ({ type: 'ON_TODO_SEARCH', payload: text })
const onTodoDone = todos => ({ type: 'ON_TODO_DONE', payload: todos })
const onDeleteTodo = todos => ({ type: 'ON_TODO_DELETE', payload: todos })
const onTodoSave = todos => ({ type: 'ON_TODO_SAVE', payload: todos })
const onTodoEdit = todos => ({ type: 'ON_TODO_EDIT', payload: todos })
const onTodosFilter = todos => ({ type: 'ON_TODOS_FILTER', payload: todos })

export {
	fetchTodos,
	onTodoAdded,
	onTodoSearch,
	onTodosFilter,
	onTodoDone,
	onDeleteTodo,
	onTodoSave,
	onTodoEdit
}