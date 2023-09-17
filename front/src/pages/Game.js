import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import '../design/Game.css'
import leftDefault from '../assets/left_default.avif';
import rightDefault from '../assets/right_default.avif';

function GamePage() {
    const [searchParams] = useSearchParams();
    const game_id = searchParams.get('id');
    const [game, setGame] = useState({});
    const [leftImage, setLeftImage] = useState(null);
    const [rightImage, setRightImage] = useState(null);

    const handleClick = (event) => {
        if (`${event.target.name}` === "right_poll") {
            const data = {
                'user_id': "qwe",
                'game_id': game_id,
                'choice': "right"
            }
            axios.post('/api/create_poll', data)
                .then((response) => {
                    console.log(response['data']['id']);
                });
        } else {
            const data = {
                'user_id': "qwe",
                'game_id': game_id,
                'choice': "left"
            }
            axios.post('/api/create_poll', data)
                .then((response) => {
                    console.log(response['data']['id']);
                });
        }
    }


    useEffect(() => {
        fetch(`/api/games?id=${game_id}`)
            .then(response => response.json())
            .then(data => {
                setGame(data['json_data']);
                if (data['file_data'][0] !== null) {
                    setLeftImage('images/' + data['file_data'][0]);
                };
                if (data['file_data'][1] !== null) {
                    setRightImage('images/' + data['file_data'][1]);
                };
            }).catch(
                (err) => console.log(err)
            )
    }, []);

    return (
        <div className='App'>
            <div className='header'>You made new game!!</div>
            <div>
                {game['title']}
            </div>
            <div>
                {game['left_choice']} / {game['right_choice']}
            </div>
            <div className='game_body'>
                <button name="left_poll" onClick={handleClick}>Left</button>
                {leftImage !== null 
                    ?(<img className="left_game" src={leftImage} alt="Loading..."></img>)
                    :(<img className="left_game" src={leftDefault} alt="Loading..."></img>)
                }
                <button name="right_poll" onClick={handleClick}>Right</button>
                {rightImage !== null 
                    ?(<img className="right_game" src={rightImage} alt="Loading..."></img>)
                    :(<img className="right_game" src={rightDefault} alt="Loading..."></img>)
                }
            </div>
        </div>
    )
}

export default GamePage;
