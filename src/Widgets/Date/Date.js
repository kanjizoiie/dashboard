import React, { Component } from "react";
import './Date.css';
import moment from 'moment';


let options = require('../../options.json');

export class DateC extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new moment()
        };
    }

    componentDidMount() {
        this.timerInterval = setInterval(
            () => this.tick(),
            options.date.speed
        );
    }
    componentWillUnmount() {
        clearInterval(this.timerInterval);
    }

    tick() {
        this.setState({
            date: new moment()
        });
    }

    render() {
        return(
            <div className = 'date'>
                { this.state.date.format(options.date.format) }    
            </div>
        )
    }

}

export default DateC;