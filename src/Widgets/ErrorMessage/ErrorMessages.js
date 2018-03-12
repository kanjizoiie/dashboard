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
                            <ListGroupItem color = { comp.severity }>
                                <text className = 'font-weight-bold'>{comp.code}</text>: { comp.message } - <text className = 'font-weight-bold'>{ comp.insertionDate }</text>
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