import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './DashGraph.css';
import { select } from 'd3';

export class DashAxis extends Component {
    componentDidMount() {
        this.renderAxis();
    }
    componentDidUpdate() {
        this.renderAxis();
    }

    renderAxis() {
        let node = ReactDOM.findDOMNode(this);
        select(node).call(this.props.axis);
    }

    render () {
        let trans = 'translate(' + (this.props.offsetX ? this.props.offsetX : 0)
                                 + ',' + (this.props.offsetY ? this.props.offsetY : 0) +')';
        return(
            <g className="axis" transform = { trans } >
            </g>
        );
    }
}

export default DashAxis;