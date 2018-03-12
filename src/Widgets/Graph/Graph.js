import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './Graph.css';
import createPlotlyComponent from 'react-plotly.js/factory';
import Plotly from 'plotly.js/dist/plotly-cartesian';
const Plot = createPlotlyComponent(Plotly);

export class Graph extends Component {
    shouldComponentUpdate (nextProps, nextState) {
        return false;
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.update != undefined) {
            if(nextProps.update.data != undefined && nextProps.update.layout != undefined) {
                Plotly.update(ReactDOM.findDOMNode(this), nextProps.update.data, nextProps.update.layout);
            } else if(nextProps.update != undefined) {
                Plotly.update(ReactDOM.findDOMNode(this), nextProps.update.data);
            }
        }
        if(nextProps.extend !== undefined) {
            Plotly.extendTraces(ReactDOM.findDOMNode(this), nextProps.extend, [0, 1]);
        }
    }

    render () {
        return(            
            <Plot data = { this.props.data } layout = { this.props.layout } />
        )
    }
}

export default Graph;