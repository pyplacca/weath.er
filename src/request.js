const API_URL = 'https://api.airvisual.com/v2/'

function Fetch (url) {
	// const request_options = {
	// 	method: 'GET',
	// 	redirect: 'follow',
	// 	credentials: 'same-origin',
	// }
	return fetch(url)
		.then(response => response.json())
  	.catch(error => {
  		alert('Couldn\'t load data. Please check your internet connection and try again')
  		console.log('error', error)
  	});
}

const APIrequest = {

	getWeather (country, state, city) {
		return Fetch(
			`
			${API_URL}city?
			city=${city}&
			state=${state}&
			country=${country}&
			key=${process.env.REACT_APP_API_KEY}
			`
		)
	},

	getCountries () {
		return Fetch(
			`
			${API_URL}countries?
			key=${process.env.REACT_APP_API_KEY}
			`,
		)
	},

	getStates (country) {
		return Fetch(
			`
			${API_URL}states?
			country=${country}&
			key=${process.env.REACT_APP_API_KEY}
			`
		)
	},

	getCities (country, state) {
		return Fetch(
			`
			${API_URL}cities?
			state=${state}&
			country=${country}&
			key=${process.env.REACT_APP_API_KEY}
			`,
		)
	},
}

export default APIrequest
