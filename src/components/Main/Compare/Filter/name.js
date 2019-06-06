import React, { Component } from 'react';
import './filter.scss'


class name extends Component {
    constructor(props) {
        super(props)
        this.state = { brand: [], carNames: [], selectedBrand: "" }
        this.GetNameData()
    }
    GetNameData() {
        fetch("http://127.0.0.1:5000/get_brand_data")
            .then(res => res.json())
            .then(
                (brand) => {
                    fetch("http://127.0.0.1:5000/get_car_data")
                        .then(res => res.json())
                        .then(
                            (carNames) => {
                                this.setState({ brand: brand, carNames: carNames })
                            },
                            (error) => {
                                console.log(error)
                            }
                        )
                },
                (error) => {
                    console.log(error)
                }
            )
    }
    SelectNameList(name) {
        this.props.SetNameList(name)
    }
    SetNameListFilter(name) {
        if (this.state.selectedBrand !== name)
            this.setState({ selectedBrand: name })
    }
    
    IsClicked(name){
        return this.props.nameDisplay.includes(name)
    }

    GetNameTable() {
        let list = []
        let title
        if (this.state.selectedBrand === "") {
            title = "Brand List"
            list.push(<p className={`${ this.props.nameDisplay.includes("All")? 'clicked': ''}`} key={"all"} onClick={() => this.SelectNameList("allbrand")}>All</p>)
            this.state.brand.forEach(brandName => {
                list.push(<p className={`${ this.props.nameDisplay.includes("All")? 'disable': ''}`} key={brandName} onClick={() => this.SetNameListFilter(brandName)}> {brandName}</p >)
            });
        } else {
            title = "<-" + this.state.selectedBrand;
            list.push(<p className={`${ this.props.nameDisplay.includes(this.state.selectedBrand)? 'clicked': ''}`} key={"all"} onClick={() => this.SelectNameList(this.state.selectedBrand)}>All</p>)
            this.state.carNames.forEach(carName => {
                if (carName.indexOf(this.state.selectedBrand) !== -1)
                    list.push(
                    <p 
                        className={`${ this.props.nameDisplay.includes(carName)? 'clicked': ''} 
                        ${ this.props.nameDisplay.includes(this.state.selectedBrand)? 'disable': ''}`} 
                        key={carName} 
                        onClick={() => this.SelectNameList(carName)}> 
                        {carName}
                    </p >)
            });
        }
        return (<div className="filter_name_list" >
            <h2 onClick={() => this.SetNameListFilter("")}>{title}</h2>
            <div className="namesList">{list}</div>
        </div>);
    }
    GetSelected(){
        let list = []
        this.props.nameDisplay.forEach(element => {
            list.push(<p key={element} onClick={() => this.SelectNameList(element)}><span>X</span> {element}</p>)
        });
        return (<div className="selectedName"><h3>Selected:</h3> {list}</div>)
    }
    render(){
        console.log(this.props.nameDisplay)
        return (
            <div>
            { this.GetNameTable() }
            { this.GetSelected()}
            </div>
        );
    }
}

export default name;