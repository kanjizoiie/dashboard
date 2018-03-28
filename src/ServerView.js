import React, { Component } from 'react';
import { Row, Col, Card, CardBody, CardTitle} from 'reactstrap';
import { Up } from './Widgets/Up/Up';
import { Text } from './Widgets/Text/Text';
import { Graph } from './Widgets/Graph/Graph';
import { ErrorMessages } from './Widgets/ErrorMessage/ErrorMessages';
import { Spinner } from './Widgets/Spinner/Spinner';
import { Gauge } from './Widgets/Gauge/Gauge';

import axios from 'axios';
import './ServerView.css';
var graphs = require('./json/graphs.json');
var host = require('./json/host.json');

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
        this.timeOut = setTimeout(() => this.getData(), 4000);
    }

    render() {
        if (this.state != undefined) {
            return (
                <section className = 'server-container'>
                    <Row>
                        <Col>
                            <Card>
                                <CardBody>
                                    <CardTitle>
                                        Hostname
                                    </CardTitle>
                                    <h3>
                                        {this.state.info ? <Text value = { (this.state.info.hostname.hostname) } /> : null }
                                    </h3>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <CardBody>
                                    <CardTitle>
                                        Is this server active?
                                    </CardTitle>
                                    {this.state.info ? <Up isUp = { this.state.info.up } /> : null }
                                </CardBody>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <CardBody>
                                    <CardTitle>
                                        New users today
                                    </CardTitle>
                                    { this.state.info.users ? <Text value = { (this.state.info.users) } /> : null }
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col>                        
                            <Card>
                                <CardBody>
                                    <CardTitle>
                                        Usage
                                    </CardTitle>
                                    <Graph
                                        update = {
                                        this.state.graph ? {
                                            data: {
                                                y: [ this.state.graph.server.cpu, this.state.graph.server.mem],
                                                x: [ this.state.graph.server.time,  this.state.graph.server.time]
                                            }
                                        } : undefined }
                                        data = { graphs.server.data }
                                        layout = { graphs.server.layout }
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <CardBody>
                                    <CardTitle>
                                        Traffic
                                    </CardTitle>
                                    <Graph
                                        update = {
                                        this.state.graph ? {
                                            data: {
                                                y: [ this.state.graph.traffic.in, this.state.graph.traffic.out],
                                                x: [ this.state.graph.traffic.time,  this.state.graph.traffic.time ]
                                            }
                                        } : undefined}
                                        data = { graphs.traffic.data }
                                        layout = { graphs.traffic.layout }
                                    />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Card>
                                <CardBody>
                                    <CardTitle>
                                        Uptime this month
                                    </CardTitle>
                                    { this.state.info.uptime ? <Gauge percent = {(this.state.info.uptime)} size = {{ sm: 'auto' }}/> : null }
                                </CardBody>
                            </Card>    
                        </Col>
                        <Col>
                            <Card>
                                <CardBody>
                                    <CardTitle>
                                        Alerts
                                    </CardTitle>
                                    <ErrorMessages messages = { this.state.info.alerts } />
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </section>
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