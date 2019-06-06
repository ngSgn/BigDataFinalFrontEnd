import React, { Component } from 'react';

class Geo extends Component {

    GeoChange(event) {
        this.props.SetDate(event.target.value)
    }

    render() {

        return (
            <div className="filterBox">
                <h2>Location</h2>
                <select id="geo" onChange={this.GeoChange.bind(this)} value={this.props.geo}>
                    <option value="Global">Global</option>
                    <option value="US">US</option>
                    <option value="UK">UK</option>
                    <option value="HK">HK</option>
                    <option value="TW">TW</option>
                    <option value="FR">FR</option>
                </select>
            </div>);
    }
}

export default Geo;    