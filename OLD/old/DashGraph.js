import React, { Component } from 'react';
import './DashGraph.css';
import { scaleLinear, line, max, axisBottom, axisLeft, min } from 'd3';
import DashAxis from './DashAxis';

export class DashGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
        }
        this.margin = {
            left: 70,
            right: 100,
            top: 50,
            bottom: 50
        }
        this.width = this.props.width - this.margin.left - this.margin.right;
        this.height = this.props.height - this.margin.top - this.margin.bottom;
    }

    render () {
        this.x = scaleLinear()
                .range([0, this.width])
                .domain([min(this.state.data, (data) => { return data.x; }), max(this.state.data, (data) => { return data.x; })]);
                
        this.y = scaleLinear()
                .range([this.height, 0])
                .domain([min(this.state.data, (data) => { return data.y; }), max(this.state.data, (data) => { return data.y; })]);

        this.line = line()
                    .x((data) => { return this.x(data.x) })
                    .y((data) => { return this.y(data.y) });

        //Create axises
        this.xAxis = axisBottom(this.x);
        this.yAxis = axisLeft(this.y);

        //Create margin transfrom
        let trans = 'translate(' + this.margin.left + ',' + this.margin.top +')';

        //Create a label for the graph. It moves with the last point in the dataset.
        let labelTrans = 'translate(' + (this.width + 5) + ',' + (this.y(this.state.data[this.state.data.length - 1].y)) + ')';

        return(
            <svg id = { this.props.chartId } width = { this.props.width } height = { this.props.height }>
                <g transform = { trans }>
                    <text>Graph Name</text>
                    <path className = 'line' d = { this.line(this.state.data) }></path>
                    <DashAxis className = 'axis' axis = { this.xAxis } offsetY = { this.height }/>
                    <DashAxis className = 'axis' axis = { this.yAxis }/>
                    <text className = 'text' transform = { labelTrans } dy='0.35em' textAnchor='start'>{ (this.state.data[this.state.data.length - 1].y).toPrecision(5) }</text>
                </g>
            </svg>
        );
    }
}

export default DashGraph;