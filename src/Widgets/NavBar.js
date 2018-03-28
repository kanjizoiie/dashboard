import React, { Component } from 'react';
import { Navbar, NavbarBrand, NavItem, Nav } from 'reactstrap';
import { Weather } from './Weather/Weather';
import { DateC } from './Date/Date';
import { Clock } from './Clock/Clock';
import './NavBar.css';

let options = require('../json/options.json');

export class NavBar extends Component {
    render() {
        return (
            <div>
                <Navbar dark expand='sm'>
                    <NavbarBrand className='ml-5 p-0 mx-auto' href='/'><img src= { options.logo } alt = 'logo' height = '32' /></NavbarBrand>
                    <NavItem className='navbar-text mr-5'>
                            { this.props.title }
                    </NavItem>
                    <Nav navbar className='ml-auto p-0'>
                        <NavItem className='navbar-text mr-5'>
                            <Weather />
                        </NavItem>
                        <NavItem className='navbar-text mr-5 d-inline-block'>
                            <DateC />
                        </NavItem>
                        <NavItem className='navbar-text mr-5'>
                            <Clock />
                        </NavItem>
                    </Nav>
                </Navbar>
                <span className='slant'></span>
            </div>
        );
    }
}

export default NavBar;