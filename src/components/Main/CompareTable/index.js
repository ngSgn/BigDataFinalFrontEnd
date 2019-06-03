import React, { Component } from 'react';
import Chart from '../Chart'

import { Link } from 'react-router-dom';

class CompareTable extends Component {
    constructor(props) {
        super(props);
        this.state = { data: "" }
    }

    createTable = () => {
        if (this.props.chartData.length === 0)
            return ""

        let table = [];
        let index = [];
        let name = [];
        let mean = [];
        index.push(<td key={0}>-</td>)
        name.push(<th key={0}>Name</th>)
        mean.push(<th key={0}>Mean</th>)
        for (let i = 0; i < 5; i++) {
            if (this.props.chartData.name[i] === '-') break;
            index.push(<td key={i + 1}>{i + 1}</td>)
            let tempLink = "/detail?search=" + this.props.chartData.name[i];
            if (this.props.chartData.name[i].indexOf(' ') !== -1)
                tempLink += "&brand=0"
            else
                tempLink += "&brand=1"
            name.push(<td key={i + 1}><Link to={tempLink}>{this.props.chartData.name[i]}</Link></td>)
            mean.push(<td key={i + 1}>{parseInt(this.props.chartData.mean[i])}</td>)
        }

        table.push(<table key={0}>
            <tbody>
                <tr>{index}</tr>
                <tr>{name}</tr>
                <tr>{mean}</tr>
            </tbody>
        </table>);
        return table
    }

    render() {

        return (
            <div className="compare_talbe">
                <h2>{this.props.title}</h2>
                <Chart id={this.props.id} chartData={this.props.chartData.chartData} />
                {this.createTable()}
            </div >
        );
    }
}

export default CompareTable;