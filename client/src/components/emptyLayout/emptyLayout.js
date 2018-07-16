import React, { Component } from 'react';
import "./emptyLayout.css";

class EmptyLayout extends Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
};

export default EmptyLayout;