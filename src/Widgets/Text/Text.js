import React, { ReactDOM, Component } from "react";
import './Text.css'

export class Text extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        if(this.props.value !== undefined) {
            return (
                <div className = 'textWrapper'>
                    <h3 className = 'textTitle'> { this.props.title } </h3>
                    <h3 className = 'textValue'> { this.props.value } </h3> 
                </div>
            )
        }
        else {
            return null;
        }

    }
}