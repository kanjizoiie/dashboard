import React, { Component } from 'react';
import './App.css';

import { NavBar } from './Widgets/DashNavbar';
import { Graph } from './Widgets/Graph/DashGraphPlotly';
import { DashUp } from './Widgets/Up/DashUp';

import { Card, Container, Row, Col } from 'reactstrap';
import axios from 'axios';

const TIME_TO_CHECK = 2000;
let x = 0;

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [{
                type: 'scatter',
                line: {
                    color: '#84F124'
                },
                x: [0],
                y: [0]
            }]
        }
        this.responseCPU = 0;
        this.response = 0;
        this.timerInterval = setInterval(
            () => this.update(),
            TIME_TO_CHECK
        );
        this.uptime = [{
            up: true
        }];
    }

    update() {
        x += 1;
        if (this.state.data[0].x.length >= 50) {
            this.state.data[0].x.splice(0, 1);
            this.state.data[0].y.splice(0, 1); 
        } 
        axios.get('http://localhost:1337/api/data/cpu')
             .then((response) => {
            this.response = response.data.value * 100;
        });

        axios.get('http://localhost:1337/api/data/uptime')
             .then((response) => {
            this.uptime = response.data;
        });

        this.state.data[0].x.push(x);
        this.state.data[0].y.push(this.response);
        this.setState({
            data: this.state.data,
        })
    }
    
    render() {
        let graphCPU_layout = { 
            fit:true,
            title: 'TEST',
            xaxis: {
                autorange: false,
                range: [0, 10]
            },
            yaxis: {
                autorange: false,
                range: [-10, 100]
            },         
        }
        return (
            <div>
                <NavBar />
                <Container fluid className='pt-2'>
                    <DashUp isup = { this.uptime[0].up } />
                    <hr/>
                    <h1>{ (this.uptime[0].uptime * 100).toFixed(2) } % </h1>
                    <Row>
                        <Col>
                            <Card body outline>
                                <Row>
                                    <Col>
                                        <Graph 
                                        data = { this.state.data } 
                                        layout = { graphCPU_layout }
                                        update = {{
                                            data: {
                                                x: [this.state.data[0].x],
                                                y: [this.state.data[0].y]
                                            },
                                            layout: {
                                                xaxis: {
                                                    range: [Math.min.apply(null, this.state.data[0].x), Math.max.apply(null, this.state.data[0].x) + 1] 
                                                },
                                                annotations: [{
                                                    x: this.state.data[0].x[this.state.data[0].x.length - 1],
                                                    y: this.state.data[0].y[this.state.data[0].y.length - 1] + 10,
                                                    xref: 'x',
                                                    yref: 'y',
                                                    font: {
                                                        size: 14
                                                    },
                                                    textposition: 'bottom',
                                                    text: this.state.data[0].y[this.state.data[0].y.length - 1].toFixed(2) + ' %',
                                                    align: 'top',
                                                    showarrow: false,
                                                }]
                                            }
                                        }}/>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Card body outline>
                                <Graph 
                                data = {[{
                                    type: 'scatter',
                                    line: {
                                        color: '#00FF00'
                                    },
                                    name: 'http 200',
                                    x: [0],
                                    y: [0]
                                }, {
                                    type: 'scatter',
                                    line: {
                                        color: '#FFFF00'
                                    },
                                    name: 'http 300',
                                    x: [0],
                                    y: [0]
                                }, {
                                    type: 'scatter',
                                    line: {
                                        color: '#FF0000'
                                    },
                                    name: 'http 400',
                                    x: [0],
                                    y: [0]
                                }]} 
                                layout = { graphCPU_layout }
                                update = {{
                                    data: {
                                        x: [this.state.data[0].x, this.state.data[0].x, this.state.data[0].x],
                                        y: [this.state.data[0].y, this.state.data[0].y.map(y => y * 2), this.state.data[0].y.map(y => y * 3)]
                                    },
                                    layout: {
                                        xaxis: {
                                            range: [Math.min.apply(null, this.state.data[0].x), Math.max.apply(null, this.state.data[0].x) + 1] 
                                        },
                                        annotations: [{
                                            x: this.state.data[0].x[this.state.data[0].x.length - 1],
                                            y: this.state.data[0].y[this.state.data[0].y.length - 1] + 10,
                                            xref: 'x',
                                            yref: 'y',
                                            font: {
                                                size: 14
                                            },
                                            textposition: 'bottom',
                                            text: this.state.data[0].y[this.state.data[0].y.length - 1].toFixed(2) + ' %',
                                            align: 'top',
                                            showarrow: false,
                                        }]
                                    }
                                }}/>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default App;
