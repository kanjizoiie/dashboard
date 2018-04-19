import React, { Component } from 'react';
import axios from 'axios';
import './Up.css';

let options = require('../../json/options.json');

export class Up extends Component {
    serverStatus() {
        if (this.props.isUp == 2) {
            axios.get('http://' + options.host.ip + ':' + options.host.port + '/api/lights/green');
            return(
                <h3 className = 'up-green'>Yes</h3>
            );
        }
        else if (this.props.isUp == 1) {
            axios.get('http://' + options.host.ip + ':' + options.host.port + '/api/lights/yellow');
            return (
                <h3 className = 'up-yellow'>Maybe</h3>
            );
        }
        else if (this.props.isUp == 0) {
            axios.get('http://' + options.host.ip + ':' + options.host.port + '/api/lights/red');
            return (
                <h3 className = 'up-red'>NO NO NO! Houston we got a problem!!</h3>
            );
        }
    }
    render() {
        return (
            <div>
                By my calculations: { this.serverStatus() }
            </div>
        )
    }
}

export default Up;