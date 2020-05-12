import React from 'react'
import './App.scss'
import Header from '../Header'
import FilterBtns from '../FilterBtns'
import HowMuchDone from '../HowMuchDone'
import TodoList from '../TodoList'

function App() {
	return (
		<div className="wrapper">
			<div className='container'>
				<div className="crud-table">
					<Header></Header>
					<div className="crud-table__secondline">
						<FilterBtns></FilterBtns>
						<HowMuchDone></HowMuchDone>
					</div>
					<div className="crud-table__body">
						<TodoList></TodoList>
					</div>
				</div>
			</div>
		</div>
	)
}

export default App
