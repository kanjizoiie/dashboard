import React, { Component } from 'react';
import { Navbar, NavbarBrand, NavItem, Nav } from 'reactstrap';
import { Weather } from './Weather/Weather';
import { DateC } from './Date/Date';
import { Clock } from './Clock/Clock';
import './NavBar.css';

let options = require('../options.json');

export class NavBar extends Component {
    render() {
        return (
            <Navbar color='rsbg' dark expand='sm'>
                <NavbarBrand href='/'><img src= { options.logo } alt = 'logo' height = '32' /></NavbarBrand>
                <Nav navbar className='ml-auto'>
                    <NavItem className='navbar-text mr-5'>
                        <Weather />
                    </NavItem>
                    <NavItem className='navbar-text mr-5'>
                        <DateC />
                    </NavItem>
                    <NavItem className='navbar-text mr-5'>
                        <Clock />
                    </NavItem>
                </Nav>
            </Navbar>
        );
    }
}

export default NavBar;