import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle} from 'reactstrap';
import './Article.css';

export class Article extends Component {
    render() {
        return (
            <Card className = { this.props.className }>
                <CardImg />
                <CardBody>
                    <CardTitle> { this.props.title } </CardTitle>
                    <CardText> { this.props.description } </CardText>
                    <hr />
                    <CardText> Published: { this.props.pubDate } <a target = '_blank' className = 'float-right' href = { this.props.link }> Read More</a></CardText>
                </CardBody>
            </Card>
        );
    }

}

export default Article;