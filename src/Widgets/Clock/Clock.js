import React, { Component } from 'react';
import './Clock.css'
import moment from 'moment';


let options = require('../../options.json');

export class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new moment()
        };
    }

    componentDidMount() {
        this.timerInterval = setInterval(() => this.getTime(), options.clock.speed);
    }
    
    componentWillUnmount() {
        clearInterval(this.timerInterval);
    }

    getTime() {
        this.setState({
            date: new moment()
        });
    }

    render() {
        return(
            <div className = 'clock'>
                { this.state.date.format(options.clock.format) }
            </div>
        )   
    }
}

export default Clock;