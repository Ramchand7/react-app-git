import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Person from './components/Person';
import App from './App';
import { Pages } from "./components/Pages";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  
    {/* <Person /> */}
    {/* <App></App> */}
    <Pages />
  </React.StrictMode>
);

reportWebVitals();
