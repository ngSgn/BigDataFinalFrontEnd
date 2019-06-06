import React, { Component } from 'react';
import Search from '../Search'

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = { keywordList: "", timeFrame: "today 1-m" }
    }
    GetBrandCars(search) {
        fetch("http://127.0.0.1:5000/get_car_data")
            .then(res => res.json())
            .then(
                (result) => {
                    let keywordList = [];
                    let brandName = search.get("search");
                    result.forEach(element => {
                        if (element.indexOf(brandName) !== -1)
                            keywordList.push(element)
                    });

                    this.setState({ keywordList: keywordList });
                    //console.log(this.state.keywordList)
                },
                (error) => {
                    console.log(error)
                }
            )
    }
    GetPorpsData(data) {
        let search = new URLSearchParams(data);
        if (search.get("brand") === "0") {
            let keywordList = [];
            keywordList = [search.get("search")]
            this.setState({ keywordList: keywordList });
        }
        else {
            this.GetBrandCars(search);
        }
    }

    componentDidMount() {
        this.GetPorpsData(this.props.location.search)
    }
    componentWillReceiveProps(nextProps) {
        this.GetPorpsData(nextProps.location.search)
    }
    render() {
        return (
            <div className={'container'}>
                <Search keywordList={this.state.keywordList} timeFrame={this.state.timeFrame} geo={""} />
            </div>
        );
    }
}

export default Detail;