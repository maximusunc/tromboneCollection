import React, { useRef, useEffect } from "react";
import "./backToTop.css";
import arrow from "../../images/arrow-up.png";

function BackToTop(props) {
    const intervalId = useRef('');

    function handleScroll() {
        if (window.pageYOffset > 300) {
            document.getElementById('backToTop').style.opacity = 0.8;
        } else {
            document.getElementById('backToTop').style.opacity = 0;
        }
    };

    function scrollStep() {
        if (window.pageYOffset === 0) {
            clearInterval(intervalId.current);
        }
        window.scroll(0, window.pageYOffset - props.scrollStepInPx);
    };

    function scrollToTop() {
        intervalId.current = setInterval(scrollStep, props.delayInMs);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return (() => {
            window.removeEventListener('scroll', handleScroll);
        });
    }, []);

    return (
        <div id="backToTop">
            <button id="toTop" onClick={() => scrollToTop()}>
                <img id="arrow" src={arrow} alt="arrow-up"></img>
            </button>
        </div>
    );
}

export default BackToTop;