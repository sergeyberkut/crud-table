import React from 'react'
import './HowMuchDone.scss'
import { connect } from 'react-redux'

function HowMuchDone({ todosToShow, loading }) {

	if (loading) {
		return <p>Загрузка...</p>
	}
	let doneTodos = null
	let allTodos = null
	if (todosToShow) {
		doneTodos = todosToShow.filter(todo => todo.completed).length
		allTodos = todosToShow.length
	}

	return (
		<div className="crud-table__how-much-done">
			{
				(todosToShow && todosToShow.length)
					? <p>Сделано {doneTodos} из {allTodos}</p>
					: <p>Нет заданий</p>
			}
		</div>
	)
}


const mapStateToProps = ({ todosToShow, loading }) => {
	return {
		loading,
		todosToShow
	}
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(HowMuchDone)