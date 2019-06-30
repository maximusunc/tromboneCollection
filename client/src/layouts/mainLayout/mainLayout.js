import React, { Component } from 'react';
import Header from '../../components/header/header';
import BackToTop from '../../components/backToTop/backToTop';
import Footer from '../../components/footer/footer';
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