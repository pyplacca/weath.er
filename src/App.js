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
		// method bindings
		this.getWeatherData = this.getWeatherData.bind(this)
		this.getCountryStates = this.getCountryStates.bind(this)
		this.getStateCities = this.getStateCities.bind(this)
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

	async getCountryStates (country) {
		const res = await APIrequest.getStates(country)
		if (res) {
			this.setState({
				country_states: res.data.map(obj => obj.state),
				cities: [],
				current: {...this.state.current, country}
			})
		}
	}

	async getStateCities (state) {
		const {data} = await APIrequest.getCities(this.state.current.country, state)
		this.setState({
			cities: data.map(obj => obj.city),
			current: {...this.state.current, state}
		})
	}

	async getWeatherData (city) {
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
		// pick a background image based on weather type
		const bg_name = type.split(' ').join('-') || 'mist'
		// darken sidebar's background color if background image is light
		const aside_bg = bg_name.includes('clouds') ? 'rgba(59, 59, 59, .2)' : ''
		return (
			<div
				className="App"
				bg-name={bg_name}
			>
				<main>
					<header>
						<h4 className="app-logo">Weath.er</h4>
						<Select
							cls="countries"
							options={countries}
							callback={this.getCountryStates}
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

				<aside style={{backgroundColor:aside_bg}}>
					{/* <icons.chevron /> */}
					<Select
						cls="state"
						options={country_states}
						collapsible={false}
						callback={this.getStateCities}
					>
						<h3 className="title">State/Region</h3>
					</Select>

					<Select
						cls="city"
						options={cities}
						collapsible={false}
						callback={this.getWeatherData}
					>
						<h3 className="title">City</h3>
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
