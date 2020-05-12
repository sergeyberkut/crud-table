import React, { useEffect } from 'react'
import './TodoList.scss'

import ListItem from '../ListItem/'
import Spinner from '../Spinner'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import withCrudTableService from '../Hoc'
import { compose } from '../../utils'

import {
	onTodoDone,
	onDeleteTodo,
	onTodoSave,
	onTodoEdit,
	fetchTodos,
} from '../../store/actions'


function TodoList({
	fetchTodos,
	onTodoDone,
	onDeleteTodo,
	onTodoSave,
	onTodoEdit,
	todos,
	todosToShow,
	searchField,
	loading,
}) {

	useEffect(() => {
		fetchTodos()
	}, [fetchTodos])


	if (loading) {
		return <Spinner></Spinner>
	}

	if (searchField) {
		todosToShow = todosToShow.filter(todo => {
			if (todo.title.toLowerCase().includes(searchField.toLowerCase())) {
				return true
			}
			return false
		})
	}

	if (!todosToShow || !todosToShow.length) {
		return <p className="no-todos">Нет заданий</p>
	}

	return (
		<ul className="crud-table__list todo-list">
			<ListItem
				todos={todos}
				todosToShow={todosToShow}
				onTodoDone={onTodoDone}
				onDeleteTodo={onDeleteTodo}
				onTodoSave={onTodoSave}
				onTodoEdit={onTodoEdit}
			/>
		</ul>
	)
}

const mapStateToProps = ({ todos, todosToShow, searchField, loading }) => {
	return {
		loading,
		todos,
		todosToShow,
		searchField
	}
}

const mapDispatchToProps = (dispatch, { crudTableService }) => {
	return {
		fetchTodos: fetchTodos(crudTableService, dispatch),
		...bindActionCreators({
			onTodoDone,
			onDeleteTodo,
			onTodoSave,
			onTodoEdit,
		}, dispatch)

	}
}

export default compose(
	withCrudTableService(),
	connect(mapStateToProps, mapDispatchToProps)
)(TodoList)