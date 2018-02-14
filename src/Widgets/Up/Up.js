import React, { Component } from 'react';
import up from './up.svg';
import down from './down.svg';
import semi from './semi.svg';
import './Up.css';

export class Up extends Component {
    render() {
        if (this.props.isUp == 2) {
            return(
                <img className = 'up' src = { up } alt = 'ITS UP'/>
            );
        }
        else if (this.props.isUp == 1) {
            return (
                <img className = 'semi' src = { semi } alt = 'SOMETHINGS UP'/>
            );
        }
        else if (this.props.isUp == 0) {
            return (
                <img className = 'down' src = { down } alt = 'ITS DOWN'/>
            );
        }
        else {
            return null;
        }
    }
}

export default Up;