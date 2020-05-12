import React, { Component } from 'react'
import ErrorIndicator from '../ErrorIndicator'

export default class ErrorBoundry extends Component {

	state = {
		hasError: false
	}

	componentDidCatch() {
		this.setState({
			hasError: true
		})
	}

	render() {
		return (
			<div>
				{
					this.state.hasError
						? <ErrorIndicator></ErrorIndicator>
						: this.props.children
				}
			</div>
		)
	}
}
