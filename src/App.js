import React from 'react';
import APIrequest from './request.js'
import {weather_codes, WeatherInfo} from './components/weather.js'
import Select from './components/select.js'
import Info from './components/info.js'
import icons from './components/icons.js'
import './App.scss';


class App extends React.Component {
	constructor (props) {
		super(props)

		this.state = {
			weather_data: {
				current: {
					weather: {}
				}
			},
			countries: [],
			country_states: [],
			cities: [],
			current: {
				country: '',
				state: '',
				city: '',
			}
		}

		this.fetchCountryStates = this.fetchCountryStates.bind(this)
		this.fetchStateCities = this.fetchStateCities.bind(this)
		this.fetchWeatherData = this.fetchWeatherData.bind(this)
	}

	async componentDidMount () {
		const res = await APIrequest.getCountries()
		if (res) {
			this.setState({
				countries: res.data.map(obj => obj.country),
				country_states: []
			})
		}
	}

	async fetchCountryStates (country) {
		// fetch country states
		const res = await APIrequest.getStates(country)
		if (res) {
			this.setState({
				country_states: res.data.map(obj => obj.state),
				cities: [],
				current: {...this.state.current, country}
			})
		}
	}

	async fetchStateCities (state) {
		const {data} = await APIrequest.getCities(this.state.current.country, state)
		this.setState({
			cities: data.map(obj => obj.city),
			current: {...this.state.current, state}
		})
	}

	async fetchWeatherData (city) {
		const {country, state} = this.state.current
		const res =  await APIrequest.getWeather(country, state, city)
		if (res) {
			this.setState({
				weather_data: res.data,
				current: {...this.state.current, city}
			})
			console.log(this.state.weather_data)
		}
	}

	render () {
		const { countries, weather_data, country_states, cities } = this.state
		const { ts, tp, ic } = weather_data.current.weather
		const { type='' } = weather_codes[ic] || {}
		console.log(ic)
		return (
			<div
				className="App"
				bg-name={type.split(' ').join('-') || 'shower-rain'}
			>
				<main>
					<header>
						<h4 className="app-logo">Weath.er</h4>

						<Select
							cls="countries"
							options={countries}
							callback={this.fetchCountryStates}
							collapsible={true}
						>
							<div className="selection">
								<p className="text">Select a country</p>
								<icons.chevron />
							</div>
						</Select>
					</header>

					<WeatherInfo
						city={weather_data.city}
						temperature={tp}
						timestamp={ts}
						icon={ic}
					/>
				</main>

				<aside>
					<Select
						cls="states"
						options={country_states}
						collapsible={false}
						callback={this.fetchStateCities}
					>
						<h3 className="title">States</h3>
					</Select>

					<Select
						cls="cities"
						options={cities}
						collapsible={false}
						callback={this.fetchWeatherData}
					>
						<h3 className="title">Cities</h3>
					</Select>

					<div className="weather-details">
						<h3 className="title">Weather details</h3>
						<div className="">
							{
								Object.entries(weather_data.current.weather).map(
									(entry, i) => <Info data={entry} key={i} />
								)
							}
						</div>
					</div>
				</aside>
			</div>
		)
	}
}

export default App;
