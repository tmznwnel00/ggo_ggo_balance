import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

function GamePage() {
    const [searchParams] = useSearchParams();
    const game_id = searchParams.get('id');
    const [game, setGame] = useState({});

    useEffect(() => {
        fetch(`/games?id=${game_id}`)
            .then(response => response.json())
            .then(data => {
                setGame(data);
            }).catch(
                (err) => console.log(err)
            )
      }, []);

    return (
        <div className='App'>
            <h1>You made new game!!</h1>
            <div>
                {game['title']}
            </div>
            <div>
                {game['left_choice']} / {game['right_choice']}
            </div>
        </div>
    )
}

export default GamePage;
