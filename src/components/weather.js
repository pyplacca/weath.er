import React from 'react'


const weather_codes = {
	'01d': {
		type: 'clear sky',
		icon: 'Mostly Sunny'
	},

	'01n': {
		type: 'clear sky',
		icon: 'Clear Night'
	},

	'02d': {
		type: 'few clouds',
		icon: 'Party Cloudy'
	},

	'02n': {
		type: 'few clouds',
		icon: 'Party Cloudy Night'
	},

	'03d': {
		type: 'scattered clouds',
		icon: 'Mostly Cloudy'
	},

	'03n': {
		type: 'scattered clouds',
		icon: 'Mostly Cloudy Night'
	},

	'04d': {
		type: 'broken clouds',
		icon: 'Mostly Cloudy'
	},

	'04n': {
		type: 'broken clouds',
		icon: 'Mostly Cloudy Night'
	},

	'09d': {
		type: 'shower rain',
		icon: 'Drizzle'
	},

	'09n': {
		type: 'shower rain',
		icon: 'Drizzle Night'
	},

	'10d': {
		type: 'rain',
		icon: 'Rain'
	},

	'10n': {
		type: 'rain',
		icon: 'Rain Night'
	},

	'11d': {
		type: 'thunderstorm',
		icon: 'Severe Thunderstorm'
	},

	'11n': {
		type: 'thunderstorm',
		icon: 'Severe Thunderstorm Night'
	},

	'13d': {
		type: 'snow',
		icon: 'Snow'
	},

	'13n': {
		type: 'snow',
		icon: 'Snow Night'
	},

	'50d': {
		type: 'mist',
		icon: 'Fog'
	},

	'50n': {
		type: 'mist',
		icon: 'Fog Night'
	}
}


class WeatherInfo extends React.Component {
	constructor (props) {
		super(props)
		this._time = React.createRef()
		this.updateTime = this.updateTime.bind(this)
	}

	updateTime() {
		const time = new Date().toString().match(/\d+:\d+/g)
		this._time.current.innerText = time
	}

	// componentDidUpdate(prevProps) {
	// 	if (this.props.timestamp && !this.schedule) {
	// 		// start time auto update
	// 		console.log('Scheduling time auto update')
	// 		// canceling previous schedule ensures that
	// 		// if (this.schedule) {
	// 		// 	clearTimeout(this.schedule)
	// 		// }
	// 		this.schedule = setInterval(this.updateTime, 1000 * 60)
	// 	}
	// }

	render () {
		const {city, temperature='', timestamp='', icon} = this.props
		// tod stands for time of day...
		const [{type}, tod] = [
			weather_codes[icon] || {},
			// ...which can be determined by the last character of the icon code (icon)
			icon ? {n:'night', d: 'day'}[icon[2]] : ''
		]
		return (
			<div className="information">
				<h1 className="temperature">
					{temperature}
					<span className="symbol">{temperature ? '°' : ''}</span>
				</h1>
				<div className="details">
					<h3 className="city">
						{city}
					</h3>
					<div className="timestamp">
						<p className="time" ref={this._time}>
							{timestamp.match(/\d+:\d+/g)}
						</p>
						<p className="date">
							{timestamp ? new Date(Date.parse(timestamp)).toDateString() : ''}
						</p>
					</div>
				</div>
				<div className="weather">
					<img
						src={icon ? './icons/' + weather_codes[icon].icon + '.png' : ''}
						alt={type ? (type + (tod ? ' (' + tod + ')' : '')) : ''}
						className="icon"
					/>
					<p className="type">{type}</p>
				</div>
			</div>
		)
	}
}

export {
	weather_codes,
	WeatherInfo
}
