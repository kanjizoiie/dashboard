import React, { Component } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';
import './NewsView.css';
import { Article } from './Widgets/Article/Article'
var host = require('./json/host.json')

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
        axios.get('http://' + host.ip + ':' + host.port + '/api/data/news/').then((response) => {
            this.setState(response.data);
        }).catch((reason) => {
            console.log(reason);
        });
        this.timeOut = setTimeout(() => this.getData(), 2000);
    }

    render() {
        if (this.state.news !== undefined) {
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
    }

}

export default NewsView;