import React, { Component } from 'react';
import CompareTable from '../CompareTable';

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = { title: '', carTopFive: "", rate: "" };
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

    SetCallBack(finish) {
        if (finish[0] && finish[1]) { console.log("set"); return true; }
        return false;
    }

    GetTrendsData(carNames, timeFrame) {
        console.log("run " + carNames)
        let finish = [false, false];
        let title;
        let carTopFive;
        let rate;
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
                    carTopFive = this.GetTopFiveChartData(result)
                    if (carNames.length > 1)
                        title = this.props.keywordList[0].substr(0, this.props.keywordList[0].indexOf(' ')) + " Data"
                    else
                        title = carNames[0]

                    finish[0] = true
                    if (this.SetCallBack(finish))
                        this.setState({ title: title, carTopFive: carTopFive, rate: rate })
                },
                (error) => {
                    console.log(error)
                }
            )
        fetch("http://127.0.0.1:5000/get_inc_trends", {
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
                    rate = result
                    finish[1] = true
                    console.log(rate)
                    if (this.SetCallBack(finish))
                        this.setState({ title: title, carTopFive: carTopFive, rate: rate })
                },
                (error) => {
                    console.log(error)
                }
            )

    }
    GetResult(props) {
        this.GetTrendsData(props.keywordList, props.timeFrame)
    }

    componentDidMount() {
        if (this.props.keywordList.length > 0) {

            this.GetResult(this.props)
        }

    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.keywordList !== this.props.keywordList)
            this.GetResult(nextProps)
    }
    render() {
        console.log(this.state.carTopFive)
        return (
            <div>
                <CompareTable id="chart_1" title={this.state.title} chartData={this.state.carTopFive} />
            </div>
        );
    }
}

export default Search;