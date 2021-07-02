import React, { Component } from 'react'

export class Header extends Component {
    render() {
        return (
            <div className="ui horizontal divider">
                <div className="list-group-item list-group-item-success">
                    <h1 className="ui teal tag label" > <i className="handshake outline icon"></i>
                        {this.props.title}</h1>
                </div>
            </div>
        )
    }
}

export default Header
