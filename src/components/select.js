import React from 'react'


export default class Select extends React.Component {
	constructor (props) {
		super(props)

		this._ancestor = React.createRef()
		this.selectOption = this.selectOption.bind(this)
	}

	selectOption ({target}) {
		// unmark previously selected option
		const previous = target.parentNode.querySelector('.selected')
		if (!(previous && previous.innerText === target.innerText)) {
			if (previous) {
				previous.classList.remove('selected')
			}
			// mark newly selected option
			target.classList.add('selected')
			// change selection value
			const selection = this._ancestor.current.querySelector('.selection')
			if (selection) {
				selection.firstElementChild.innerText = target.innerText
			}
			// execute callback function
			this.props.callback(target.innerText)
		}
		if (this.props.collapsible) {
			this._ancestor.current.classList.add('collapsed')
		}
	}

	toggleCollapse ({target}) {
		if (target.classList.contains('selection')) {
			target.parentNode.classList.toggle('collapsed')
		}
	}

	render () {
		const {options, collapsible, children, cls} = this.props
		return (
			<div
				className={"select " + (collapsible ? 'collapsed ' : '')  + (cls || '')}
				ref={this._ancestor}
				onClick={collapsible ? this.toggleCollapse : () => {}}
			>
				{children}
				<div className="options">
					{
						options.map((option, i) =>
							<div
								className="option"
								onClick={this.selectOption}
								key={i}
							>
								{option}
							</div>
						)
					}
				</div>
			</div>
		)
	}
}
