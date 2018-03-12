import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { NavBar } from './Widgets/NavBar';
import { ServerView } from './ServerView';
import { NewsView } from './NewsView';
import { NotFound } from './NotFound';
import { setTimeout } from 'timers';
import { StatusView } from './StatusView';
import axios from 'axios';

import './App.css';

var host = require('./json/host.json')

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.update = true;
        this.count = 0;
    }

    componentDidMount() {
        this.views = [];
        axios.get('http://' + host.ip + ':' + host.port + '/api/data/server')
        .then((response) => {
            if (response.data[1].length != 0) {
                response.data[1].forEach((value) => {
                    this.views.push(<ServerView id = { value.id } ></ServerView>);
                })
                return null;
            }
            else {
                response.data[0].forEach((value) => {
                    this.views.push({
                        view: <ServerView id = { value } ></ServerView>, dur: 5000
                    });
                })
            }
        })
        .then((arr) => {
                this.views.push({
                    view: <NewsView></NewsView>, dur: 20000
                });
        })
        .then((arr) => {
                this.views.push({
                    view: <StatusView></StatusView>, dur: 20000
                });
        }).then(() => {
            this.spinningSystem();  
        })
    }

    componentWillUnmount () {
        clearTimeout(this.timeOut);
    }

    spinningSystem() {
        if (this.update) {
            //Update the state.
            this.setState({
                current: this.views[this.count].view
            })
            this.timeOut = setTimeout(() => this.spinningSystem(), this.views[this.count].dur);
            //Increase the current position.
            this.count += 1;
            //Check the current position, if on the last one set it to zero.
            if (this.count >= this.views.length) {
                this.count = 0
            }
        }
    }
    render() {
        if (this.update) {
            return (
                <div className='app-wrapper'>
                    <NavBar/>
                    <div className = 'content'>
                        { this.state.current }
                    </div>
                    <div className='footer'></div>
                </div>
            )
        }
        else {
            return (
                <div className='app_wrapper'>
                    <NavBar/>
                    <Router>
                        <div className = 'content'>
                            <Switch>
                                <Route exact path='/news' component = { NewsView } />
                                <Route exact path='/status' component = { StatusView } />
                                <Route component = { NotFound } />
                            </Switch>
                        </div>
                    </Router>

                </div>
            )
        }
    }
}

export default App;