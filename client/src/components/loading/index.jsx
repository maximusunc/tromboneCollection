import React from 'react';

import './loading.css';

const Loading = (props) => {
  const { message, positionStatic } = props;

  return (
    <div className={positionStatic ? 'loader-static' : ''}>
      {message && (
        <h3 className="loadingMessage">{message}</h3>
      )}
      <div className="bubbleContainer">
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
        <div className="bubble" />
      </div>
    </div>
  );
};

export default Loading;
