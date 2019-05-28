import React, { Component } from 'react';
import style from './header.module.scss';
import { Link } from 'react-router-dom';

export default class extends Component {
	render() {
		return (
			<Link
				to="/"
				className={`${style.link_text} ${style.title} ${
					this.props.pathname === '/' ? style.active : ''
				}`}
				onClick={() => this.props.linkClicked()}
			>
				Electric Car Trends
			</Link>
		);
	}
}
