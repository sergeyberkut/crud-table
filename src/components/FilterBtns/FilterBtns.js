import React, { useRef } from 'react'
import './FilterBtns.scss'
import { onTodosFilter } from '../../store/actions'
import { connect } from 'react-redux'


function FilterBtns({ onTodosFilter, todos }) {

	const showAllTodosFilter = arr => arr
	const showDoneTodosFilter = arr => arr.filter(todo => todo.completed)
	const showUnDoneTodosFilter = arr => arr.filter(todo => !todo.completed)
	const showOldTodosFilter = arr => arr.sort((todo, nextTodo) => new Date(todo.createDate).getTime() - new Date(nextTodo.createDate).getTime())
	const showNewTodosFilter = arr => arr.sort((todo, nextTodo) => new Date(nextTodo.createDate).getTime() - new Date(todo.createDate).getTime())
	const showAlphabetTodosFilter = arr => {
		const newArr = [...arr]
		return newArr.sort((letter, nextLetter) => {
			if (letter.title > nextLetter.title) {
				return 1
			}
			if (letter.title < nextLetter.title) {
				return -1
			}
			return 0
		})
	}

	const filterButtons = useRef()


	const filterCreator = (event, filterFunction) => {
		const classes = event.target.classList
		const filterButtonsChildren = filterButtons.current.children

		if (classes.value.includes('active')) {
			classes.remove('active')
			filterButtonsChildren[0].classList.add('active')
			onTodosFilter(showAllTodosFilter([...todos]))
		} else {
			for (let button of filterButtonsChildren) {
				button.classList.remove('active')
			}
			event.target.classList.add('active')
			onTodosFilter(filterFunction([...todos]))
		}
	}

	const showAllTodosHandler = event => filterCreator(event, showAllTodosFilter)
	const showDoneTodosHandler = event => filterCreator(event, showDoneTodosFilter)
	const showUnDoneTodosHandler = event => filterCreator(event, showUnDoneTodosFilter)
	const showOldTodosHandler = event => filterCreator(event, showOldTodosFilter)
	const showNewTodosHandler = event => filterCreator(event, showNewTodosFilter)
	const showAlphabetTodosHandler = event => filterCreator(event, showAlphabetTodosFilter)


	return (
		<div className="crud-table__filter-btns" ref={filterButtons}>
			<button onClick={showAllTodosHandler} className="active">Все</button>
			<button onClick={showDoneTodosHandler}>Выполненные</button>
			<button onClick={showUnDoneTodosHandler}>Невыполненные</button>
			<button onClick={showOldTodosHandler}>Старые</button>
			<button onClick={showNewTodosHandler}>Новые</button>
			<button onClick={showAlphabetTodosHandler} >По алфавиту</button>
		</div>
	)
}


const mapStateToProps = ({ todos }) => {
	return {
		todos
	}
}

const mapDispatchToProps = {
	onTodosFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterBtns)