import { jsx as _jsx } from "react/jsx-runtime";
import App from './App';
import { Routes, Route } from "react-router-dom";
const RoutApps = () => {
    return (_jsx(Routes, { children: _jsx(Route, { path: "/", element: _jsx(App, {}) }) }));
};
export default RoutApps;
