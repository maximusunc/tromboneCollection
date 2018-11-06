import React, { Component } from 'react';
import Header from './../header';
import BackToTop from './../backToTop';
import Footer from './../footer';
import "./mainLayout.css";

class MainLayout extends Component {
    render() {
        return (
            <div className="mainLayout">
                <Header />
                <div className="content">
                    {this.props.children}
                </div>
                <BackToTop scrollStepInPx="100" delayInMs="10"/>
                <Footer />
            </div>
        );
    }
};

export default MainLayout;