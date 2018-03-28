import React, { Component } from 'react';
import { Container, Card, CardTitle, CardBody, Row, Col } from 'reactstrap';
import {Spinner} from './Widgets/Spinner/Spinner';
import axios from 'axios';
import emojione from 'emojione';
import './StatusView.css'

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
            this.setState(response.data);
        }).catch((reason) => {
            console.log(reason);
        });
        this.timeOut = setTimeout(() => this.getData(), 15000);
    }

    createMarkup(comp) { 
        return {__html: emojione.shortnameToImage(comp[0].user.profile.real_name + ': ' + comp[0].user.profile.status_emoji + ' ' + comp[0].user.profile.status_text)  }; 
    };

    render() {
        if (this.state != undefined) {
            return (
                <section>
                    <Row>
                        <Col>                        
                            <Card>
                                <CardBody>                                
                                    <CardTitle>Active:</CardTitle>
                                    <ul className = 'status'>
                                    {
                                        this.state.status.active.map((comp, i) => {
                                            
                                            return (
                                                    <li key = { i }>
                                                        <div dangerouslySetInnerHTML = { this.createMarkup(comp)} />
                                                    </li>
                                            )
                                        })
                                    }
                                    </ul>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col>
                            <Card>
                                <CardBody>                                
                                    <CardTitle>Away:</CardTitle>
                                    <ul className = 'status'>
                                    {
                                        this.state.status.away.map((comp, i) => {
                                            return (
                                                <li key = { i }>
                                                    <div dangerouslySetInnerHTML = { this.createMarkup(comp)} />
                                                </li>
                                            )
                                        })
                                    }
                                    </ul>
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

export default StatusView;