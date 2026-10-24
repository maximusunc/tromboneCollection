import React from 'react';

import './loading.css';

// placeholder rows shaped like the record table while the catalogue loads
const Loading = ({ message = 'Loading records…', rows = 6 }) => (
  <div className="loading" role="status">
    <p className="loadingMessage">{message}</p>
    <div className="loadingRows" aria-hidden="true">
      {Array.from({ length: rows }, (_, i) => (
        <div className="loadingRow" key={i}>
          <span style={{ width: '9%' }} />
          <span style={{ width: `${28 + (i * 7) % 18}%` }} />
          <span style={{ width: '10%' }} />
          <span style={{ width: `${12 + (i * 5) % 10}%` }} />
        </div>
      ))}
    </div>
  </div>
);

// shown when the catalogue file can't be fetched
export const LoadError = ({ message }) => (
  <div className="loadError" role="alert">
    <p>{message} Check your connection and try again.</p>
    <button type="button" className="btn btn-secondary" onClick={() => window.location.reload()}>Try again</button>
  </div>
);

export default Loading;
