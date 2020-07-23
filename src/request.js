const API_URL = 'http://api.airvisual.com/v2/'
const KEY = 'd4257be2-a1b9-4243-887a-abca5ec13174'

function Fetch (url) {
	// const request_options = {
	// 	method: 'GET',
	// 	redirect: 'follow',
	// 	credentials: 'same-origin',
	// }
	console.log(url)
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
			`${API_URL}city?city=${city}&state=${state}&country=${country}&key=${KEY}`
		)
	},

	getCountries () {
		return Fetch(
			`${API_URL}countries?key=${KEY}`,
		)
	},

	getStates (country) {
		return Fetch(
			`${API_URL}states?country=${country}&key=${KEY}`
		)
	},

	getCities (country, state) {
		return Fetch(
			`${API_URL}cities?state=${state}&country=${country}&key=${KEY}`,
		)
	},
}

export default APIrequest
