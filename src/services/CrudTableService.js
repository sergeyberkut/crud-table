export default class CrudTableService {

	data = []

	getTodos() {

		this.data = []

		const todos = localStorage.getItem('todos')

		if (todos) {
			this.data = (JSON.parse(todos))
		}

		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(this.data)
			}, 700)
		})
	}

}