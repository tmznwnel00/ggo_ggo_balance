import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage, GamePage, LoginPage, CreatePage } from './pages';

function App() {
  const [idd, setIdd] = useState(null);
  return (
    <div>
      {/* <h1>My App</h1> */}
      <Router>
				<Routes>
					<Route path="/" element={<HomePage id={idd} />}></Route>
					<Route path="/login" element={<LoginPage setIdd={setIdd} />}></Route>
          <Route path="/create_game" element={<CreatePage />}></Route>
          <Route path="/game" element={<GamePage />}></Route>
					{/* <Route path="*" element={<NotFound />}></Route> */}
				</Routes>
			</Router>
    </div>
  );
}

export default App;