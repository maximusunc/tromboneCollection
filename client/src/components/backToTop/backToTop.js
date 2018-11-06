import React, { Component } from "react";
import "./backToTop.css";
import arrow from "../../images/arrow-up.png";

class BackToTop extends Component {
    state = {
        intervalId: 0,
    };

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    };

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    };

    handleScroll = () => {
        if (window.pageYOffset > 300) {
            document.getElementById('backToTop').style.opacity = 0.8;
        } else {
            document.getElementById('backToTop').style.opacity = 0;
        }
    };

    scrollStep = () => {
        if (window.pageYOffset === 0) {
            clearInterval(this.state.intervalId);
        }
        window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
    };

    scrollToTop = () => {
        let intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs);
        this.setState({intervalId: intervalId});
    };

    render() {
        return (
            <div id="backToTop">
                <button id="toTop" onClick={() => {this.scrollToTop();}}>
                    <img id="arrow" src={arrow} alt="arrow-up"></img>
                </button>
            </div>
        )
    }

};

export default BackToTop;