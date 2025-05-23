import { jsx as _jsx } from "react/jsx-runtime";
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Routes } from 'react-router-dom';
//import { Router } from 'express';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(_jsx(Routes, {}));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
