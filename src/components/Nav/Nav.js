import React, { Component } from 'react';
import './Nav.css';


class Nav extends Component {

    render() {
        return(
            <option value={this.props.label}>{this.props.children}</option>
        )}
}

export default Nav;
