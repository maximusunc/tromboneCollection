import React, { useRef, useEffect } from "react";
import IconButton from '@material-ui/core/IconButton';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

import "./backToTop.css";

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
            <IconButton onClick={scrollToTop}>
                <ArrowUpwardIcon />
            </IconButton>
        </div>
    );
}

export default BackToTop;