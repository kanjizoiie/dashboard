import React, { Component } from 'react';
import { DashTempDisplay } from './DashTempDisplay';

export class DashTemp extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }
    
    render() {
        if (this.state != null) {
            return(
                <DashTempDisplay { ...this.state } />
            )
        } else {
            return (
                <div>LOADING WEATHER</div>
            )
        }
    }
}

export default DashTemp;