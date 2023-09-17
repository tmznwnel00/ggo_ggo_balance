import React from 'react';
import { Link } from 'react-router-dom';
import '../design/Home.css';
import { useCookies } from 'react-cookie';

function HomePage({ user, setUser }) {
    const [cookies, removeCookie] = useCookies(['access-token']);
    const accessToken = cookies['access-token'];

    function logoutUser() {
        setUser(null);
        removeCookie('access-token');
    }

    return (
        <div>
            <h2>Home Page</h2>
            {accessToken}
            <div>
                {accessToken !== 'undefined' ? (
                    <button className='link-button' onClick={logoutUser}>Logout</button>    
                ) : (
                    <Link className='link-button' to="/login">Login</Link>
                )}
            </div>
            <div>
                <Link to="/create_game">Create Game</Link>
            </div>
            <div>
                <Link to="/gamelist">Show Game List</Link>
            </div>
        </div>
    );
}

export default HomePage;
