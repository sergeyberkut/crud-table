import React, { useState } from 'react'
import './Header.scss'
import { connect } from 'react-redux'
import { onTodoAdded, onTodoSearch } from '../../store/actions'

function Header({ onTodoAdded, todosToShow, todos, onTodoSearch, searchField }) {

	const [addTodoLabel, setAddTodoLabel] = useState('')

	const setTodos = arr => {
		localStorage.setItem('todos', JSON.stringify(arr))
	}

	const ids = todos.length + 1

	const onAddLabelChange = event => {
		setAddTodoLabel(event.target.value)
	}

	const todoAdded = event => {
		event.preventDefault()
		if (addTodoLabel.trim()) {
			const newArr = [...todos]
			newArr.unshift({
				id: ids,
				title: addTodoLabel,
				completed: false,
				createDate: new Date(),
				nowEdit: false
			})
			const newArrToShow = [...todosToShow]
			newArrToShow.unshift({
				id: ids,
				title: addTodoLabel,
				completed: false,
				createDate: new Date(),
				nowEdit: false
			})
			setTodos(newArr)
			onTodoAdded({ todos: newArr, todosToShow: newArrToShow })
			setAddTodoLabel('')
		}
	}

	return (

		<div className="crud-table__header">
			<h1 className="crud-table__title">Crud Table</h1>

			<form className="crud-table__inputblock crud-table__inputblock-search"
				onSubmit={event => event.preventDefault()}
			>
				<input type="text" placeholder="Что ищем?"
					value={searchField}
					onChange={event => onTodoSearch(event.target.value)}
				/>
				<button className="crud-table__inputblock-btn">
					<i className="fa fa-search"></i>
				</button>
			</form>



			<form className="crud-table__inputblock crud-table__inputblock-add"
				onSubmit={todoAdded}
			>
				<input
					type="text"
					placeholder="Что добавляем?"
					value={addTodoLabel}
					onChange={onAddLabelChange}
				/>
				<button className="crud-table__inputblock-btn">
					<i className="fa fa-plus"></i>
				</button>
			</form>

		</div>
	)
}

const mapStateToProps = ({ todos, todosToShow, searchField }) => {
	return {
		todos,
		todosToShow,
		searchField
	}
}

const mapDispatchToProps = {
	onTodoAdded,
	onTodoSearch
}


export default connect(mapStateToProps, mapDispatchToProps)(Header)