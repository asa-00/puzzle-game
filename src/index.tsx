import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
//import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const previewMode = (window as any).FRACTAZEN_PREVIEW;
const previewLevel = (window as any).previewLevel || 1;
const previewStyle = (window as any).previewStyle || "zen";
const debugHints = (window as any).debugHints || false;

root.render(
  <React.StrictMode>
    <App
      previewMode={previewMode}
      previewLevel={previewLevel}
      previewStyle={previewStyle}
      debugHints={debugHints}
    />
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
