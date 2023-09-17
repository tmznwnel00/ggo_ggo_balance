import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage, GamePage, LoginPage, CreatePage, GameList } from './pages';
import { useCookies } from 'react-cookie';

function App() {
  const [user, setUser] = useState(null);
  return (
    <div>
      {/* <h1>My App</h1> */}
      <Router>
				<Routes>
					<Route path="/" element={<HomePage user={user} setUser={setUser} />}></Route>
					<Route path="/login" element={<LoginPage setUser={setUser} />}></Route>
          <Route path="/create_game" element={<CreatePage user={user} />}></Route>
          <Route path="/games" element={<GamePage />}></Route>
          <Route path="/gamelist" element={<GameList />}></Route>
					{/* <Route path="*" element={<NotFound />}></Route> */}
				</Routes>
			</Router>
    </div>
  );
}

export default App;