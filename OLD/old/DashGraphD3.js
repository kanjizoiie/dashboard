import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import './DashGraph.css';
import { scaleLinear, line, max, axisBottom, axisLeft, min, select, path, easeLinear, tickIncrement, active} from 'd3';
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

    componentDidMount() {
        this.svg = select(ReactDOM.findDOMNode(this));
        this.g = this.svg.append('g').attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");   
        
        this.x = scaleLinear()
            .range([0, this.width])
            .domain([
                min(this.state.data, (data) => { return data.x; }),
                max(this.state.data, (data) => { return data.x; })
            ]);
        this.y = scaleLinear()
            .range([this.height, 0])
            .domain([
                min(this.state.data, (data) => { return data.y; }), 
                max(this.state.data, (data) => { return data.y; })
            ]);

        this.line = line()
            .x((data) => { return this.x(data.x) })
            .y((data) => { return this.y(data.y) });

        //Create axises
        this.xAxis = axisBottom(this.x);
        this.yAxis = axisLeft(this.y);

        this.g.append("defs").append("clipPath")
            .attr("id", "clip")
          .append("rect")
            .attr("width", this.width)
            .attr("height", this.height);
        this.g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + this.y(0) + ")")
            .call(axisBottom(this.x));
        this.g.append("g")
            .attr("class", "axis axis--y")
            .call(axisLeft(this.y));
        this.path = this.g.append("g")
            .attr("clip-path", "url(#clip)")
          .append("path")
            .datum(this.state.data)
            .attr("class", "line");
    }

    componentWillUpdate() {
        console.log(this.height)
        this.path.attr('d', this.line(this.state.data));
    }

    render () {
        return(
            <svg id = { this.props.chartId } width = { this.props.width } height = { this.props.height }>
            </svg>
        );
    }
}

export default DashGraph;