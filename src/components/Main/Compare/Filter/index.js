import React, { Component } from 'react';
import Name from './name.js'
import Date from './date.js'
import Geo from './Geo.js'
import Search from '../../Search'

class Filter extends Component {
    constructor(props) {
        super(props)
        this.state = { carNameArray: [], nameDisplay: [], date: "today 1-m", geo: "", keywordList: [] }
    }

    SetNameList = (name) => {
        let lastNameList = this.state.nameDisplay;
        if (name === "allbrand") {
            if (lastNameList.includes("All"))
                this.setState({ nameDisplay: [] })
            else
                this.setState({ nameDisplay: ["All"] })
        }
        else {
            if (lastNameList.includes(name)) {
                for (let i = 0; i < lastNameList.length; i++) {
                    if (lastNameList[i] === name)
                        lastNameList.splice(i, 1);
                }
                this.setState({ nameDisplay: lastNameList })
            }
            else {
                if (name.indexOf(' ') === -1) {
                    for (let i = 0; i < lastNameList.length; i++) {
                        if (lastNameList[i].indexOf(name) !== -1) {
                            lastNameList.splice(i, 1);
                            i--;
                        }
                    }
                }
                lastNameList.push(name)
                this.setState({ nameDisplay: lastNameList })
            }
        }
    }

    SetDate = (value) => {
        console.log(value)
        this.setState({ date: value })
    }

    SetGeo = (value) => {
        if (value === "Global")
            this.setState({ geo: "" })
        else
            this.setState({ geo: value })
    }

    Search() {
        fetch("http://127.0.0.1:5000/get_car_data")
            .then(res => res.json())
            .then(
                (carNames) => {
                    let list = []
                    console.log(this.state.nameDisplay)
                    if (this.state.nameDisplay[0] === "All") {

                        this.setState({ keywordList: carNames })
                    }
                    else {
                        this.state.nameDisplay.forEach(name => {
                            if (name.indexOf(' ') === -1) {
                                carNames.forEach(element => {
                                    if (element.indexOf(name) !== -1)
                                        list.push(element)
                                })
                            } else
                                list.push(name)
                        })
                        this.setState({ keywordList: list })
                    }

                },
                (error) => {
                    console.log(error)
                }
            )
    }

    render() {
        return (
            <div>
                <Date date={this.state.date} SetDate={this.SetDate} />
                <Geo geo={this.state.geo} SetDate={this.SetGeo} />
                <Name nameDisplay={this.state.nameDisplay} SetNameList={this.SetNameList} />
                <button onClick={this.Search.bind(this)}>Search</button>
                <Search keywordList={this.state.keywordList} timeFrame={this.state.date} geo={this.state.geo} />
            </div>
        );
    }
}

export default Filter;