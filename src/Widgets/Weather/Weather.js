import React, { Component } from 'react';
import axios from 'axios';
import { Spinner } from '../Spinner/Spinner';
import './Weather.css';
let options = require('../../json/options.json');
var host = require('../../json/host.json')

export class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.getWeather();
        this.interval = setInterval(() => this.getWeather(), options.weather.interval); 
    }

    getWeather() {(
        axios.get('http://' + host.ip + ':' + host.port + '/api/data/weather').then((response) => {
            this.setState({
                data: response.data
            });
        })).catch((reason) => {
            console.log(reason);    
        });
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        if (this.state.data !== undefined && this.state.data.main !== undefined) {
            return(
                <div>
                    <rsgreen>{this.state.data.name}: { this.state.data.main.temp } ° C</rsgreen>
                </div>
            )
        } else {
            return (
                <Spinner />
            )
        }
    }
}

export default Weather;