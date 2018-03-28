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
        if (nextProps.update != undefined) {
            Plotly.update(ReactDOM.findDOMNode(this), nextProps.update.data, {
                annotations: []
            });
        }
        else {
            //Input no data label if there is no data.
            Plotly.update(ReactDOM.findDOMNode(this), {
                x:[[]],
                y:[[]],
            }, {
                annotations: [{
                  xref: 'paper',
                  yref: 'paper',
                  x: 0.5,
                  y: 0.5,
                  text: 'NO DATA',
                  font: {
                      family: 'Open Sans',
                      size: 48
                  },
                  showarrow: false
                }]
            });
        }
    }

    render () {
        return (            
            <Plot config = { { displayModeBar: false }} data = { this.props.data } layout = { this.props.layout } />
        )
    }
}

export default Graph;