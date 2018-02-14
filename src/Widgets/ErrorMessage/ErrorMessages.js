import React, { ReactDOM, Component } from "react";
import { ListGroup, ListGroupItem } from 'reactstrap';
import './ErrorMessages.css';

export class ErrorMessages extends Component {
    constructor(props) {
        super(props);
    }

    render () {
        if(this.props.messages !== null) {
            return (
                <ListGroup>
                    {
                        this.props.messages.map((comp, i) => {
                            return (
                            <ListGroupItem color = { comp.alert.severity }>
                                <codeString className = 'font-weight-bold'>{comp.alert.code}</codeString>: { comp.alert.message }
                            </ListGroupItem>
                            )
                        })
                    }
                </ListGroup>
            )
        }
        else {
            return (
                <div></div>
            )
        }
    }
}

export default ErrorMessages;