import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';
import './Gauge.css';

export class Gauge extends Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate (nextProps, nextState) {
        return false;
    }

    componentWillReceiveProps(nextProps) {
        this.foreground.transition()
            .duration(750)
            .attrTween('d', this.arcTween(nextProps.percent * this.tau));
        this.text.text(
            (nextProps.percent * 100).toFixed(1) + ' %'
        );
    }

    percentToDegree(perc) {
        return perc * 360;
    };

    percentToRad(perc) {
        return this.degreeToRad(this.percentToDegree(perc));
    };

    degreeToRad(deg) {
        return deg * Math.PI / 180;
    };

    componentDidMount() {
        this.tau = 2 * Math.PI;
        this.arc = d3.arc()
            .innerRadius(60)
            .outerRadius(80)
            .startAngle(0);

        let svg = d3.select('svg'),
            width = +svg.attr('width'),
            height = +svg.attr('height'),
            g = svg.append('g').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

        this.text = g.append('text')
            .attr('class', 'gauge-text')
            .attr('dy', '0.35em')
            .style('text-anchor', 'middle');

        this.background = g.append('path').attr('class', 'background-arc')
            .datum({
                endAngle: this.tau
            })
            .attr('d', this.arc);

        this.foreground = g.append('path').attr('class', 'foreground-arc')
            .datum({
                endAngle: 0 * this.tau
            })
            .attr('d', this.arc);
    }

    arcTween(newAngle, delay) {
        return (d) => { 
            var interpolate = d3.interpolate(d.endAngle, newAngle);
            return (t) => {
                d.endAngle = interpolate(t);
                return this.arc(d);
            }
        };
    }

    render() {
        return ( 
            <svg height='200' width='200'> </svg>
        );
    }
}
export default Gauge;