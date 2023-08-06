import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';

function BasicRoute() {
    return (
        <Router>
            <Routes>
                <Route path="/" component={HomePage} />
                <Route path="/login" component={LoginPage} />
            </Routes>
        </Router>
    );
}

export default BasicRoute;
