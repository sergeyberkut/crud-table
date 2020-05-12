import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from './components/App'
import ErrorBoundry from './components/ErrorBoundry'
import CrudTableService from './services'
import { CrudTableServiceProvider } from './components/CrudTableContext'

import store from './store/store'

const crudTableService = new CrudTableService()

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<ErrorBoundry>
				<CrudTableServiceProvider value={crudTableService}>
					<App></App>
				</CrudTableServiceProvider>
			</ErrorBoundry>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
)
