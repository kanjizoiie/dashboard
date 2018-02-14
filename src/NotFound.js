import React, { Component } from 'react';
import './NotFound.css';

export class NotFound extends Component {
    render() {
        return (
            <div className = 'flexcenter mt-5'>
                <h1 className='greytext'>There is nothing here :(</h1>
            </div>
        );
    }

}

export default NotFound;