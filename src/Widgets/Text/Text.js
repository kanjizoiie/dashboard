import React, { ReactDOM, Component } from "react";
import './Text.css'

export class Text extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        if(this.props.value != undefined) {
            return (
                <div>
                    <h3>{ this.props.value }</h3>
                </div>
            )
        }
        else {
            return null;
        }

    }
}