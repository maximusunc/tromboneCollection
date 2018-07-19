import React, { Component } from 'react';
import Header from './../header';
import Navbar from './../navbar';
import Footer from './../footer';
import "./mainLayout.css";

class MainLayout extends Component {
    render() {
        return (
            <div className="mainLayout">
                <Header />
                <Navbar />
                <div className="content">
                    {this.props.children}
                </div>
                <Footer />
            </div>
        );
    }
};

export default MainLayout;