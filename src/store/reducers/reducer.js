const initialState = {
	todos: [],
	loading: true,
	error: null,
	todosToShow: [],
	searchField: '',
}

const reducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case 'FETCH_TODOS_SUCCESS':
			return {
				...state,
				todos: payload,
				todosToShow: payload,
				loading: false,
			}
		case 'FETCH_TODOS_FAILURE':
			return {
				...state,
				error: payload
			}
		case 'ON_TODO_DONE':
			return {
				...state,
				todos: payload.todos,
				todosToShow: payload.todosToShow
			}
		case 'ON_TODOS_FILTER':
			return {
				...state,
				todosToShow: payload
			}
		case 'ON_TODO_DELETE':
			return {
				...state,
				todos: payload.todos,
				todosToShow: payload.todosToShow
			}
		case 'ON_TODO_ADDED':
			return {
				...state,
				todos: payload.todos,
				todosToShow: payload.todosToShow
			}
		case 'ON_TODO_SEARCH':
			return {
				...state,
				searchField: payload
			}
		case 'ON_TODO_SAVE':
			return {
				...state,
				todos: payload.todos,
				todosToShow: payload.todosToShow
			}
		case 'ON_TODO_EDIT':
			return {
				...state,
				todos: payload.todos,
				todosToShow: payload.todosToShow
			}
		default:
			return state
	}
}

export default reducer