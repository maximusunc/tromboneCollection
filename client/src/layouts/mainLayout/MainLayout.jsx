import React from 'react';
import Header from './header/Header';
import BackToTop from './backToTop/BackToTop';
import Footer from './footer/Footer';
import "./mainLayout.css";

export default function MainLayout(props) {
    return (
        <div className="mainLayout">
            <a href="#main" className="skipLink">Skip to content</a>
            <Header />
            <main id="main" className="content">
                {props.children}
            </main>
            <BackToTop />
            <Footer />
        </div>
    );
}
