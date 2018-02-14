import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { NavBar } from './Widgets/NavBar';
import { ServerView } from './ServerView';
import { NewsView } from './NewsView';
import { NotFound } from './NotFound';
import { setTimeout } from 'timers';
import { StatusView } from './StatusView';
import axios from 'axios';

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.update = true;
        this.count = 0;
    }

    componentDidMount() {
        this.views = [];
        axios.get('http://localhost:1337/api/data/server')
        .then((response) => {
            response.data[0].forEach((value) => {
                this.views.push(<ServerView id = { value } ></ServerView>);
            })
        })
        .then((arr) => {
            this.views.push(<NewsView></NewsView>);
        })
        .then((arr) => {
            this.views.push(<StatusView></StatusView>);
        }).then(() => {
            this.spinningSystem();  
        })
    }

    componentWillUnmount () {
        clearTimeout(this.timeOut);
    }

    spinningSystem() {
        if (this.update) {
            console.log(this.count);
            //Update the state.
            this.setState({
                current: this.views[this.count]
            })
            //Increase the current position.
            this.count += 1;
            //Check the current position, if on the last one set it to zero.
            if (this.count >= this.views.length) {
                this.count = 0
            }
            this.timeOut = setTimeout(() => this.spinningSystem(), 15000);
        }
    }

    render() {
        if (this.update) {
            return (
                <div className="app_wrapper">
                    <NavBar/>
                    { this.state.current }
                </div>
            )
        }
        else {
            return (
                <div className="app_wrapper">
                    <NavBar/>
                    <StatusView />
                </div>
            )
        }
    }
}

export default App;