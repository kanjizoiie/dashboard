import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { NavBar } from './Widgets/NavBar';
import { ServerView } from './ServerView';
import { NewsView } from './NewsView';
import { NotFound } from './NotFound';
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
                    this.views.push({ view:<ServerView id = { value.id } ></ServerView>, dur: 10000 });
                })
            }
            else {
                response.data[0].forEach((value) => {
                    console.log(value.id)
                    this.views.push({
                        view: <ServerView id = { value.id } ></ServerView>, dur: 10000, title: ''
                    });
                })
            }
        })
        .then((arr) => {
            let newstitle = ''
            axios.get('http://' + host.ip + ':' + host.port + '/api/data/news/channel')
            .then((response) => {
                console.log(response)
                newstitle = response.data.title;
            }).then(() => {
                this.views.push({
                    view: <NewsView></NewsView>, dur: 20000, title: newstitle
                });
            })
        })
        .then((arr) => {
                this.views.push({
                    view: <StatusView></StatusView>, dur: 20000,  title: 'Slack'
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
                current: this.views[this.count].view,
                title: this.views[this.count].title
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
                    <NavBar title = { this.state.title } />
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
                                <Route exact path='/server' component = {(props) => { return <ServerView id = {3} ></ServerView> }} />
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