import React from 'react'


const weather_codes = {
	'01d': {
		type: 'clear sky',
		time: 'day'
	},

	'01n': {
		type: 'clear sky',
		time: 'night'
	},

	'02d': {
		type: 'few clouds',
		time: 'day'
	},

	'02n': {
		type: 'few clouds',
		time: 'night'
	},

	'03d': {
		type: 'scattered clouds',
		time: 'day'
	},

	'03n': {
		type: 'scattered clouds',
		time: 'night'
	},

	'04d': {
		type: 'broken clouds',
		time: 'day'
	},

	'04n': {
		type: 'broken clouds',
		time: 'night'
	},

	'09d': {
		type: 'shower rain',
		time: 'day'
	},

	'09n': {
		type: 'shower rain',
		time: 'night'
	},

	'10d': {
		type: 'rain',
		time: 'day'
	},

	'10n': {
		type: 'rain',
		time: 'night'
	},

	'11d': {
		type: 'thunderstorm',
		time: 'day',
	},

	'11n': {
		type: 'thunderstorm',
		time: 'night',
	},

	'13d': {
		type: 'snow',
		time: 'day'
	},

	'13n': {
		type: 'snow',
		time: 'night'
	},

	'50d': {
		type: 'mist',
		time: 'day'
	},

	'50n': {
		type: 'mist',
		time: 'night'
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

	componentDidUpdate(prevProps) {
		if (this.props.timestamp) {
			// start time auto update
			console.log('Scheduling time auto update')
			// canceling previous schedule ensures that
			if (this.schedule) {
				clearTimeout(this.schedule)
			}
			this.schedule = setInterval(this.updateTime, 1000 * 60)
		}
	}

	render () {
		const {city, temperature='', timestamp='', icon} = this.props
		const {type, time} = weather_codes[icon] || {}
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
						src=""
						alt={type ? (type + (time ? ' (' + time + ')' : '')) : ''}
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
