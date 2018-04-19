import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';
import {Spinner} from './Widgets/Spinner/Spinner';
import './NewsView.css';
import { Article } from './Widgets/Article/Article'
var options = require('./json/options.json')

export class NewsView extends Component {
    constructor(props) {
        super(props);
        this.state = { news: [] }
    }
        
    componentDidMount() {
        this.getData();
    }
    componentWillUnmount () {
        clearTimeout(this.timeOut);
    }

    getData() {
        axios.get('http://' + options.host.ip + ':' + options.host.port + '/api/data/news/').then((response) => {
            this.setState(response.data);
        }).catch((reason) => {
            console.log(reason);
        });
        this.timeOut = setTimeout(() => this.getData(), 5000);
    }

    render() {
        if (this.state.news != undefined) {
            return (
                <section className='flex-container'>
                    {
                        this.state.news.map((comp, i) => {
                            return (
                                <Article
                                className = 'flex-item'
                                key = { i }
                                title = { comp.title } 
                                description = { comp.description }
                                pubDate = { comp.pubDate } 
                                link = { comp.link } />
                            )
                        })
                    }
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

export default NewsView;