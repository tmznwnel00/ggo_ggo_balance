import React from 'react';
import { Link } from 'react-router-dom';

function HomePage({ id }) {


    return (
        <div>
            <h2>Home Page</h2>
            {id}
            <div>
                <Link to="/login">Login</Link>
            </div>
            <div>
                <Link to="/create_game">Create Game</Link>
            </div>
        </div>
    );
}

export default HomePage;
