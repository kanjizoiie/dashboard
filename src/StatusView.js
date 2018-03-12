import React, { Component } from 'react';
import { Container, Card, CardTitle, CardBody, Row, Col } from 'reactstrap';
import axios from 'axios';
import emoji from 'node-emoji';
import './StatusView.css'
import slackLogo from './Slack_Monochrome_White.svg';

var host = require('./json/host.json')

export class StatusView extends Component {
    constructor(props) {
        super(props);
        this.state = { status: {
            active: [],
            away: []
        }}
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
            console.log(response.data)
            this.setState(response.data);
        }).catch((reason) => {
            console.log(reason);
        });
        this.timeOut = setTimeout(() => this.getData(), 45000);
    }

    render() {
        console.log(this.state)
        if (this.state != undefined) {
            return (
                <section>
                    <img id = 'slacklogo' src= { slackLogo } alt = 'SLACK' />
                    <Row>
                        <Col>                        
                            <Card>
                                <CardBody>                                
                                    <CardTitle>Active:</CardTitle>
                                    {
                                        this.state.status.active.map((comp, i) => {
                                            return (
                                                <div className = 'status' key = { i }>
                                                { emoji.emojify(comp[0].user.profile.real_name + ': ' + comp[0].user.profile.status_emoji + ' ' + comp[0].user.profile.status_text)  }
                                                </div>
                                            )
                                        })
                                    }
                                </CardBody>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <CardBody>                                
                                    <CardTitle>Away:</CardTitle>
                                    {
                                        this.state.status.away.map((comp, i) => {
                                            return (
                                                <div className = 'status' key = { i }>
                                                    { emoji.emojify(comp[0].user.profile.real_name + ': ' + comp[0].user.profile.status_emoji + ' ' + comp[0].user.profile.status_text)  }
                                                </div>
                                            )
                                        })
                                    }
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </section>
            );
        }
    }

}

export default StatusView;