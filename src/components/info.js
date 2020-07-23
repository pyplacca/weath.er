import React from 'react'


const code_names = {
	tp: {
		name: 'Temperature',
		symbol: '°'
	},
	tp_min: {
		name: 'Minimum temperature',
		symbol: '°'
	},
	hu: {
		name: 'Humidity',
		symbol: '%'
	},
	ws: {
		name: 'Wind speed',
		symbol: 'm/s'
	},
	wd: {
		name: 'Wind direction',
		symbol: 'deg'
	},
	pr: {
		name: 'Atmospheric pressure',
		symbol: 'hPa'
	},
	aqius: {
		name: 'AQI (US EPA standard)'
	},
	aqicn: {
		name: 'AQI (China MEP standard)'
	}
}

export default function Info ({data}) {
	const [key, val] = data
	const {name, symbol} = code_names[key] || {}
	return (
		name ?
		(
			<div className="info">
				<p className="name">{name}</p>
				<p className="value">{val + ' ' + (symbol || '')}</p>
			</div>
		) :
		null
	)
}
