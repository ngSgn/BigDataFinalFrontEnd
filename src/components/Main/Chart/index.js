import React, { Component } from 'react';
import * as d3 from "d3";
import styles from "../main.module.scss"

class Chart extends Component {

    DrawLineChart(myData) {
        var margin = {
            top: 20,
            right: 80,
            bottom: 30,
            left: 50
        },
            width = 1100 - margin.left - margin.right,
            height = 300 - margin.top - margin.bottom;


        var parseDate = d3.timeParse("%d/%m/%Y, %H:%M:%S");

        var x = d3.scaleTime()
            .range([0, width]);

        var y = d3.scaleLinear()
            .range([height, 0]);

        var color = d3.scaleOrdinal(d3.schemeCategory10);

        var xAxis = d3.axisBottom(x);

        var yAxis = d3.axisLeft(y);


        var line = d3.line()
            .curve(d3.curveBasis)
            .x(function (d) {
                return x(d.date);
            })
            .y(function (d) {
                return y(d.temperature);
            });
        document.getElementsByClassName(this.props.id)[0].innerHTML = '';
        var svg = d3.select("." + styles.chart + '.' + this.props.id).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var data = d3.tsvParse(myData);

        color.domain(d3.keys(data[0]).filter(function (key) {
            return key !== "date";
        }));

        data.forEach(function (d) {
            d.date = parseDate(d.date);
        });

        var cities = color.domain().map(function (name) {
            return {
                name: name,
                values: data.map(function (d) {
                    return {
                        date: d.date,
                        temperature: +d[name]
                    };
                })
            };
        });

        x.domain(d3.extent(data, function (d) {
            return d.date;
        }));

        y.domain([
            d3.min(cities, function (c) {
                return d3.min(c.values, function (v) {
                    return v.temperature;
                });
            }),
            d3.max(cities, function (c) {
                return d3.max(c.values, function (v) {
                    return v.temperature;
                });
            })
        ]);

        var legend = svg.selectAll('g')
            .data(cities)
            .enter()
            .append('g')
            .attr('class', 'legend');

        legend.append('rect')
            .attr('x', width - 100)
            .attr('y', function (d, i) {
                return i * 20;
            })
            .attr('width', 10)
            .attr('height', 10)
            .style('fill', function (d) {
                return color(d.name);
            });

        legend.append('text')
            .attr('x', width - 100 + 12)
            .attr('y', function (d, i) {
                return (i * 20) + 9;
            })
            .text(function (d) {
                return d.name;
            });

        svg.append("g")
            .attr("class", styles.x + " " + styles.axis)
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", styles.y + " " + styles.axis)
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Temperature (ºF)");

        var city = svg.selectAll(".city")
            .data(cities)
            .enter().append("g")
            .attr("class", "city");

        city.append("path")
            .attr("class", styles.line)
            .attr("d", function (d) {
                return line(d.values);
            })
            .style("stroke", function (d) {
                return color(d.name);
            });

        city.append("text")
            .datum(function (d) {
                return {
                    name: d.name,
                    value: d.values[d.values.length - 1]
                };
            })
            .attr("transform", function (d) {
                return "translate(" + x(d.value.date) + "," + y(d.value.temperature) + ")";
            })
            .attr("x", 3)
            .attr("dy", ".35em")
            .text(function (d) {
                return;
            });
    }

    componentDidMount() {
        if (this.props.chartData !== undefined) {
            this.DrawLineChart(this.props.chartData)
            //console.log(this.props.chartData)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.chartData !== undefined) {
            this.DrawLineChart(nextProps.chartData)
            //console.log(nextProps)
        }

    }

    render() {

        return (
            <div>
                <div className={`${styles.chart} ${this.props.id}`}></div>
            </div>
        );
    }
}

export default Chart;