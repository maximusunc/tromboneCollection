import React, { Component } from 'react';
import Header from './header/Header';
import BackToTop from './backToTop/BackToTop';
import Footer from './footer/Footer';
import "./mainLayout.css";

export default function MainLayout(props) {
    return (
        <div className="mainLayout">
            <Header />
            <div className="content">
                {props.children}
            </div>
            <BackToTop scrollStepInPx="100" delayInMs="10"/>
            <Footer />
        </div>
    );
}
