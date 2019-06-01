import React, { Component } from 'react';
import CompareTable from '../CompareTable'
import '../main.scss';

export default class extends Component {
	constructor(props) {
		super(props);
		this.state = { carOneMonthData: [], carTopFive: [], brandOneMonthData: [], brandTopFive: [], };
	}
	GetTopFiveData(result) {
		let tempData = "date";
		for (let i = 0; i < 5; i++) {
			tempData += '	' + result[1][i].name;
		}
		tempData += "\n";
		for (let i = 0; i < result[0].length; i++) {
			tempData += result[0][i]
			for (let j = 0; j < 5; j++) {
				tempData += '	' + result[1][j].data[i];
			}
			tempData += "\n";
		}
		return tempData;
	}
	GetTrendsData(carNames, timeFrame) {
		fetch("http://127.0.0.1:5000/get_trends_data", {
			method: "POST",
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ carNames: carNames, timeFrame: timeFrame, })
		})
			.then(res => res.json())
			.then(
				(result) => {
					console.log(result)
				},
				(error) => {
					console.log(error)
				}
			)
	}
	GetCarName() {
		fetch("http://127.0.0.1:5000/get_car_data")
			.then(res => res.json())
			.then(
				(result) => {
					console.log(result)

				},
				(error) => {
					console.log(error)
				}
			)
	}
	GetCarOneMonthData() {
		fetch("http://127.0.0.1:5000/get_one_month_data")
			.then(res => res.json())
			.then(
				(result) => {
					let tempData = this.GetTopFiveData(result)
					this.setState({ carOneMonthData: result, carTopFive: tempData })
				},
				(error) => {
					console.log(error)
				}
			)
	}
	GetBrandOneMonthData() {
		fetch("http://127.0.0.1:5000/get_one_month_brand_data")
			.then(res => res.json())
			.then(
				(result) => {
					console.log()
					let tempData = this.GetTopFiveData(result)
					this.setState({ brandOneMonthData: result, brandTopFive: tempData })
				},
				(error) => {
					console.log(error)
				}
			)
	}
	componentDidMount() {
		//this.GetCarOneMonthData()
		this.GetBrandOneMonthData()
	}
	render() {
		console.log(this.state.brandTopFive)
		//<CompareTable title="Top 5 Electric Car in One Month" chartData={this.state.carTopFive} />
		return (
			<div className={'container'}>

				<CompareTable title="Top 5 Brand in One Month" chartData={this.state.brandTopFive} />
			</div>
		);
	}
}
