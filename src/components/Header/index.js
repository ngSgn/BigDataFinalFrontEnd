import React, { Component } from 'react';
import style from './header.module.scss';
import NavTitle from './NavTitle.js';
import NavLinks from './NavLinks.js';

export default class extends Component {
	constructor(props) {
		super(props);
		this.state = { active: false };
	}

	ToggleActive() {
		this.setState({ active: !this.state.active });
	}
	LinkClicked = () => {
		if (this.state.active) this.setState({ active: false });
	};
	render() {
		return (
			<header>
				<div
					className={`${'container'} ${style.navbar} ${
						this.state.active ? style.active : ''
						}`}
				>
					<div
						className={style.bars}
						onClick={this.ToggleActive.bind(this)}
					>
						<div className={style.bar1} />
						<div className={style.bar2} />
						<div className={style.bar3} />
					</div>
					<NavTitle
						pathname={this.props.location.pathname}
						linkClicked={this.LinkClicked}
					/>
					<NavLinks
						pathname={this.props.location.pathname}
						linkClicked={this.LinkClicked}
					/>
				</div>
			</header>
		);
	}
}
