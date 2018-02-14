import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import emoji from 'node-emoji';
import './StatusView.css'
var host = require('./host.json')

export class StatusView extends Component {
    constructor(props) {
        super(props);
        this.state = { status: [] }
    }
        
    componentDidMount() {
        this.getData();
    }

    componentWillUnmount () {
        clearTimeout(this.timeOut);
    }

    getData() {
        axios.get('http://' + host.ip + ':' + host.port + '/api/data/status')
        .then((response) => {
            this.setState(response.data);
        }).catch((reason) => {
            console.log(reason);
        });
        this.timeOut = setTimeout(() => this.getData(), 10000);
    }

    getDot(presence) {
        if (presence == 'active')
            return (<div className = 'circle green'></div>);
        else
            return (<div className = 'circle gray'></div>);
    }

    render() {
        if (this.state.status !== undefined) {
            return (
                <Container fluid>
                        {
                            this.state.status.map((comp, i) => {
                                return (
                                    <div className = 'status' key = { i }>
                                        { this.getDot(comp.presence) }<h2> { emoji.emojify(comp.real_name + ': ' + comp.emoji + ' ' + comp.text)  } </h2>
                                    </div>
                                )
                            })
                        }
                </Container>
            );
        }
    }

}

export default StatusView;