import React, { useState, useEffect, useRef } from 'react'
import './ListItem.scss'

export default function ListItem({
	todos,
	todosToShow,
	onTodoDone,
	onDeleteTodo,
	onTodoSave,
	onTodoEdit,
	onTodosFilter
}) {

	const dateFromDateStamp = (num) => {
		num = new Date(num)
		return `
	${pad(num.getHours())}:${pad(num.getMinutes())}:${pad(num.getSeconds())}
	${pad(num.getDate())}.${pad(num.getMonth() + 1)}.${num.getFullYear()}`
	}

	const pad = (str) => {
		str = String(str).padStart(2, '0')
		return str
	}

	const [label, setLabel] = useState('')

	const editTitle = todosToShow.find(todo => todo.nowEdit)

	const focusRef = useRef()

	useEffect(() => {
		if (editTitle) {
			setLabel(editTitle.title)
			focusRef.current.focus()
		}
	}, [todosToShow, editTitle])


	const setTodos = arr => {
		localStorage.setItem('todos', JSON.stringify(arr))
	}

	const findInTodos = id => todos.findIndex(todo => todo.id === id)

	const onTodoDoneHandler = id => {

		const idx = findInTodos(id)
		const newArr = [...todos]
		newArr[idx].completed = !newArr[idx].completed

		const ids = todosToShow.findIndex(todo => todo.id === id)
		const newArrToShow = [...todosToShow]
		newArrToShow[ids].completed = newArr[idx].completed

		setTodos(newArr)
		onTodoDone({ todos: newArr, todosToShow: newArrToShow })
	}

	const onTodoEditHandler = id => {
		const idx = findInTodos(id)
		const newArr = todos.map(todo => { return { ...todo, nowEdit: false } })
		newArr[idx].nowEdit = true
		const ids = todosToShow.findIndex(todo => todo.id === id)
		const newArrToShow = todosToShow.map(todo => { return { ...todo, nowEdit: false } })
		newArrToShow[ids] = newArr[idx]
		setTodos(newArr)
		onTodoEdit({ todos: newArr, todosToShow: newArrToShow })
	}

	const onDeleteTodoHandler = id => {
		const idx = findInTodos(id)
		const newArr = todos.filter((todo, index) => index !== idx)
		const newArrToShow = todosToShow.filter((todo, index) => index !== idx)
		setTodos(newArr)
		onDeleteTodo({ todos: newArr, todosToShow: newArrToShow })
	}

	const onTodoSaveHandler = (id, label) => {
		const idx = findInTodos(id)
		let newArr = [...todos]
		newArr[idx].nowEdit = false
		newArr[idx].title = label
		newArr = newArr.filter(todo => todo.title)

		const ids = todosToShow.findIndex(todo => todo.id === id)
		let newArrToShow = [...todosToShow]
		newArrToShow[ids].nowEdit = false
		newArrToShow[ids].title = label
		newArrToShow = newArrToShow.filter(todo => todo.title)

		setTodos(newArr)
		onTodoSave({ todos: newArr, todosToShow: newArrToShow })
	}

	return (
		<React.Fragment>

			<li className="todo-list__list-item">
				<div className="todo-list__index header">№</div>
				<div className="todo-list__title header">
					Что сделать
		</div>
				<div className="todo-list__create-date header">
					Дата создания
		</div>
				<div className="todo-list__operations header">Операции</div>
			</li>

			{todosToShow.map(({ id, title, createDate, completed, nowEdit }, index) => {

				const classes = []

				if (completed) {
					classes.push('done')
				}

				if (nowEdit) {
					classes.push('active')
				}

				return (
					<li className="todo-list__list-item" key={id}>
						<div className="todo-list__index">{++index}</div>
						<form className="todo-list__title relative"
							onSubmit={(event) => {
								event.preventDefault()
								onTodoSaveHandler(id, label)
								setLabel('')
							}}
						>
							<input type="text" value={nowEdit ? label : title} disabled={!nowEdit} className={classes.join(' ')}
								onChange={({ target }) => {
									setLabel(target.value)
								}
								}
								ref={nowEdit ? focusRef : null}
							/>
							<div className={nowEdit ? '' : "input-wrapper"}
								onClick={nowEdit ? null : () => onTodoDoneHandler(id)}
							/>
						</form>

						<div className="todo-list__create-date">{dateFromDateStamp(createDate)}</div>
						<div className="todo-list__operations">
							{
								nowEdit
									? <i className="fa fa-check"
										onClick={() => {
											onTodoSaveHandler(id, label)
											setLabel('')
										}}
									/>
									: <i className="fa fa-edit"
										onClick={() => {
											onTodoEditHandler(id)

										}}
									/>
							}
							<i className="fa fa-trash"
								onClick={() => onDeleteTodoHandler(id)}
							/>
						</div>
					</li>
				)
			})}
		</React.Fragment >
	)
}
