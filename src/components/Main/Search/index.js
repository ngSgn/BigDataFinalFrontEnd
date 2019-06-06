import React, { Component } from 'react';
import CompareTable from '../CompareTable';
import PreTable from '../PreTable';
import Waiting from './Waiting.js'

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = { title: '', preTitle: '', carTopFive: "", carRateTopFive: "", pre: "", preWaiting: false, chartWaiting: false };
    }
    GetTopFiveChartData(result) {
        let tempData = "date";
        let name = [];
        let mean = [];
        for (let i = 0; i < 5; i++) {
            if (result[1].length <= i) {
                name.push("-");
                mean.push(0);
            }
            else {
                tempData += '	' + result[1][i].name;
                name.push(result[1][i].name);
                mean.push(result[1][i].mean);
            }

        }
        tempData += "\n";
        for (let i = 0; i < result[0].length; i++) {
            tempData += result[0][i]
            for (let j = 0; j < 5; j++) {
                if (result[1].length > j)
                    tempData += '	' + result[1][j].data[i];
            }
            tempData += "\n";
        }
        return { name: name, mean: mean, chartData: tempData };
    }

    GetTopFiveRateData(result) {
        let tempData = "date";
        let name = [];
        let rate = [];
        for (let i = 0; i < 5; i++) {
            if (result[1].length <= i) {
                name.push("-");
                rate.push(0);
            }
            else {
                tempData += '	' + result[1][i].name;
                name.push(result[1][i].name);
                rate.push(result[1][i].rate);
            }

        }
        tempData += "\n";
        for (let i = 0; i < result[0].length; i++) {
            tempData += result[0][i]
            for (let j = 0; j < 5; j++) {
                if (result[1].length > j) {
                    let tempInt = parseInt(result[1][j].predictions[i]);
                    if (tempInt < 0) tempInt = 0
                    tempData += '	' + tempInt;
                }


            }
            tempData += "\n";
        }
        return { name: name, rate: rate, chartData: tempData };
    }
    GetPreTitle(timeFrame) {
        if (timeFrame === "now 1-d") return "Predictions of next 12 hours";
        if (timeFrame === "now 7-d") return "Predictions of next 3 days";
        if (timeFrame === "today 1-m") return "Predictions of next 10 days";
        if (timeFrame === "today 3-m") return "Predictions of next 1 month";
        if (timeFrame === "today 12-m") return "Predictions of next 3 month";
        if (timeFrame === "today 5-y") return "Predictions of next 1 year";
    }
    GetPredData(carNames, timeFrame, geo) {
        let rate;
        console.log("geting pre" + carNames)
        fetch("http://127.0.0.1:5000/get_inc_trends", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ carNames: carNames, timeFrame: timeFrame, geo: geo })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    rate = result
                    console.log(rate)
                    let tempData = this.GetTopFiveRateData(result)

                    this.setState({ preTitle: this.GetPreTitle(timeFrame), carRateTopFive: tempData, preWaiting: false })
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    GetTrendsData(carNames, timeFrame, geo) {
        console.log("run " + carNames)

        let title;
        let carTopFive;

        fetch("http://127.0.0.1:5000/get_trends_data", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ carNames: carNames, timeFrame: timeFrame, geo: geo })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    carTopFive = this.GetTopFiveChartData(result)
                    console.log(result)
                    if (carNames.length > 1)
                        title = "Search Result"
                    else
                        title = carNames[0]


                    let firstFiveName = [];
                    for (let i = 0; i < 5; i++) {
                        if (result[1].length <= i) break;
                        firstFiveName.push(result[1][i].name)
                    }
                    this.GetPredData(firstFiveName, timeFrame, geo)
                    this.setState({ title: title, carTopFive: carTopFive, chartWaiting: false })
                    console.log("set")
                },
                (error) => {
                    console.log(error)
                }
            )


    }
    GetResult(props) {
        this.GetTrendsData(props.keywordList, props.timeFrame, props.geo)
    }

    componentDidMount() {
        if (this.props.keywordList.length > 0) {
            this.setState({ preWaiting: true, chartWaiting: true })
            this.GetResult(this.props)
        }

    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.keywordList !== this.props.keywordList) {
            this.setState({ preWaiting: true, chartWaiting: true })
            this.GetResult(nextProps)
        }

    }
    render() {
        console.log(this.state.carTopFive)
        console.log(this.state.carRateTopFive)
        return (
            <div>
                {this.state.chartWaiting ? <Waiting /> : <CompareTable id="chart_1" title={this.state.title} chartData={this.state.carTopFive} />}
                {this.state.preWaiting ? <Waiting /> : <PreTable id="chart_2" title={this.state.preTitle} chartData={this.state.carRateTopFive} />}
            </div>
        );
    }
}

export default Search;