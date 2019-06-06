import React, { Component } from 'react';

class Date extends Component {

    DateChange(event) {
        this.props.SetDate(event.target.value)
    }

    render() {
        return (
            <div className="filterBox">
                <h2>Time Frame</h2>
                <select id="date" onChange={this.DateChange.bind(this)} value={this.props.date}>
                    <option value="now 1-d">Past 1 day</option>
                    <option value="now 7-d">Past 7 day</option>
                    <option value="today 1-m">Past 1 month</option>
                    <option value="today 3-m">Past 3 month</option>
                    <option value="today 12-m">Past 1 year</option>
                    <option value="today 5-y">Past 5 years</option>
                </select>
            </div>);
    }
}

export default Date;    