import React, { Component } from 'react';
import { Container, Row, Col, Card } from 'reactstrap';
import { Up } from './Widgets/Up/Up';
import { Text } from './Widgets/Text/Text';
import { Graph } from './Widgets/Graph/Graph';
import { ErrorMessages } from './Widgets/ErrorMessage/ErrorMessages';
import { Spinner } from './Widgets/Spinner/Spinner';
import axios from 'axios';
import './ServerView.css';
var graphs = require('./graphs.json');
var host = require('./host.json')

export class ServerView extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getData();
    }
    
    componentWillUnmount () {
        clearTimeout(this.timeOut);
    }

    getData() {
        Promise.all([
            axios.get('http://' + host.ip + ':' + host.port + '/api/data/server/' + this.props.id).then((response) => {
                return response.data;
            }).catch((reason) => {
                console.log(reason);
            }),
            axios.get('http://' + host.ip + ':' + host.port + '/api/data/server/' + this.props.id + '/graph').then((response) => {
                return response.data;
            }).catch((reason) => {
                console.log(reason);
            })
        ]).then((values) => {
            this.setState({
                info: values[0],
                graph: values[1]
            });
        });
        this.timeOut = setTimeout(() => this.getData(), 2000);
    }

    render() {
        if (this.state != undefined) {
            return (
                <Container>
                    <Row className = 'mt-2'>
                        <Col md = '12'>
                            <h3>
                                { this.state.info.hostname }
                            </h3>
                        </Col>
                    </Row>
                    <Row className = 'mt-2'>
                        <Col className = 'flexcenter' md = '3'>
                            <Up isUp = { this.state.info.up } />
                        </Col>
                        <Col className = 'flexcenter' md = '3'>
                            <Text title = 'Uptime this month' value = { (this.state.info.uptime * 100).toFixed(1) + '%' } />
                        </Col>
                        <Col className = 'flexcenter' md = '3'>
                            <Text title = 'Users Today' value = { (this.state.info.users) } />
                        </Col>
                        <Col className = 'flexcenter' md = '3'>
                            <ErrorMessages messages = { this.state.info.alerts } />
                        </Col>
                    </Row>
                    <Row className = 'mt-5'>
                        <Col md = '6'>
                            <Graph 
                                update = {{
                                    data: {
                                    y: [ this.state.graph.server.cpu, this.state.graph.server.mem],
                                    x: [ this.state.graph.server.time,  this.state.graph.server.time]
                                }}}
                                data = { graphs.server.data }
                                layout = { graphs.server.layout }
                            />
                        </Col>
                        <Col md = '6'>
                            <Graph
                                update = {{
                                    data: {
                                    y: [ this.state.graph.traffic.in, this.state.graph.traffic.out],
                                    x: [ this.state.graph.traffic.time,  this.state.graph.traffic.time ]
                                }}}
                                data = { graphs.traffic.data }
                                layout = { graphs.traffic.layout }
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md = '12'>
                            <Graph
                                data = { graphs.http.data }
                                layout = { graphs.http.layout }
                            />
                        </Col>
                    </Row>
                </Container>
            );
        }
        else {
            return (
                <div className = 'flexcenter mt-5'>
                    <Spinner/>
                </div>
            );
        }

    }

}

export default ServerView;