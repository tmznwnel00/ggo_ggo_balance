import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';

function App() {
  return (
    <div>
      <h1>My App</h1>
      <Router>
				<Routes>
					<Route path="/" element={<HomePage />}></Route>
					<Route path="/login" element={<LoginPage />}></Route>
					{/* <Route path="*" element={<NotFound />}></Route> */}
				</Routes>
			</Router>
    </div>
  );
}

export default App;