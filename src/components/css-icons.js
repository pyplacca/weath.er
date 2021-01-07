import React from 'react'

const icons = {
	chevron () {
		return (
			<span>
				<svg xmlns="http://www.w3.org/2000/svg"
					 viewBox="0 0 407.437 407.437">
				<polygon points="386.258,91.567 203.718,273.512 21.179,91.567 0,112.815 203.718,315.87 407.437,112.815 "/>
				</svg>
			</span>
		)
	},

	sunShower () {
		return (
			<div class="icon sun-shower">
				<div class="cloud"></div>
				<div class="sun">
					<div class="rays"></div>
				</div>
				<div class="rain"></div>
			</div>
		)
	},

	thunderStorm () {
		return (
			<div class="icon thunder-storm">
				<div class="cloud"></div>
				<div class="lightning">
					<div class="bolt"></div>
					<div class="bolt"></div>
			  	</div>
			</div>
		)
	},

	clouds () {
		return (
			<div class="icon cloudy">
				<div class="cloud"></div>
				<div class="cloud"></div>
			</div>
		)
	},

	snow () {
		return (
			<div class="icon flurries">
				<div class="cloud"></div>
			  	<div class="snow">
				    <div class="flake"></div>
				    <div class="flake"></div>
			  	</div>
			</div>
		)
	},

	sunny () {
		return (
			<div class="icon sunny">
				<div class="sun">
					<div class="rays"></div>
			  	</div>
			</div>
		)
	},

	rain () {
		return (
			<div class="icon rainy">
				<div class="cloud"></div>
				<div class="rain"></div>
			</div>
		)
	}

}

export default icons
