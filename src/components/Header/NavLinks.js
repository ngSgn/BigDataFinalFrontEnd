import React, { Component } from 'react';
import style from './header.module.scss';
import { Link } from 'react-router-dom';

export default class extends Component {
	render() {
		return (
			<ul className={style.navLinks}>
				<li>
					<Link
						to="/compare"
						className={`${style.link_text} ${style.link}  ${
							this.props.pathname === '/compare'
								? style.active
								: ''
						}`}
						onClick={() => this.props.linkClicked()}
					>
						Compare
					</Link>
				</li>
				<li>
					<Link
						to="/about"
						className={`${style.link_text} ${style.link}  ${
							this.props.pathname === '/about' ? style.active : ''
						}`}
						onClick={() => this.props.linkClicked()}
					>
						About
					</Link>
				</li>
			</ul>
		);
	}
}
