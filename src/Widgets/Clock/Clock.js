import React, { Component } from 'react';
import './Clock.css'
import moment from 'moment';


let options = require('../../json/options.json');

export class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new moment()
        };
    }

    componentDidMount() {
        this.timerInterval = setInterval(() => this.getTime(), options.clock.interval);
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
                <p className='rs-green'>{ this.state.date.format(options.clock.format) }</p>
            </div>
        )   
    }
}

export default Clock;