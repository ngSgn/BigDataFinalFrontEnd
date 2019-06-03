import React, { Component } from 'react';
import CompareTable from '../CompareTable'
import '../main.scss';

export default class extends Component {
	constructor(props) {
		super(props);
		this.state = {
			carOneMonthData: [], carTopFive: [],
			brandOneMonthData: [], brandTopFive: [],
		};

	}
	GetTopFiveChartData(result) {
		let tempData = "date";
		let name = [];
		let mean = [];
		for (let i = 0; i < 5; i++) {
			tempData += '	' + result[1][i].name;
			name.push(result[1][i].name);
			mean.push(result[1][i].mean);
		}
		tempData += "\n";
		for (let i = 0; i < result[0].length; i++) {
			tempData += result[0][i]
			for (let j = 0; j < 5; j++) {
				tempData += '	' + result[1][j].data[i];
			}
			tempData += "\n";
		}
		return { name: name, mean: mean, chartData: tempData };
	}


	GetCarOneMonthData() {
		fetch("http://127.0.0.1:5000/get_one_month_data")
			.then(res => res.json())
			.then(
				(result) => {
					let tempChartData = this.GetTopFiveChartData(result)
					this.setState({ carOneMonthData: result, carTopFive: tempChartData })
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
					let tempChartData = this.GetTopFiveChartData(result)
					this.setState({ brandOneMonthData: result, brandTopFive: tempChartData })
				},
				(error) => {
					console.log(error)
				}
			)
	}
	componentDidMount() {
		this.GetBrandOneMonthData()
		this.GetCarOneMonthData()
	}
	render() {
		return (
			<div className={'container'}>
				<CompareTable id="chart_1" title="Top 5 Electric Car in One Month" chartData={this.state.carTopFive} />
				<CompareTable id="chart_2" title="Top 5 Brand in One Month" chartData={this.state.brandTopFive} />
			</div>
		);
	}
}
