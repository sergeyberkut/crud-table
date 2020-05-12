import React from 'react'
import { CrudTableServiceConsumer } from '../CrudTableContext'

const withCrudTableService = () => (Wrapped) => {

	return props => {
		return (
			<CrudTableServiceConsumer>
				{
					(crudTableService) => {
						return (
							<Wrapped
								{...props}
								crudTableService={crudTableService}
							>
							</Wrapped>
						)
					}
				}
			</CrudTableServiceConsumer>
		)
	}
}

export default withCrudTableService