import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle} from 'reactstrap';
import './Article.css';

export class Article extends Component {
    render() {
        return (
            <Card className = { this.props.className } >
                <CardBody>
                    <CardText className = 'greytext'> { this.props.pubDate }</CardText>
                    <CardTitle> { this.props.title } </CardTitle>
                    <CardText> { this.props.description } </CardText>

                </CardBody>
            </Card>
        );
    }

}

export default Article;