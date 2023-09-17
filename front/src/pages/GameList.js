import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

function GameList() {
    const [games, setGames] = useState([]);
    const [cookies] = useCookies(['access-token']);
    const accessToken = cookies['access-token'];
    const headers = new Headers(
        {
            "Authorization": `Bearer ${accessToken}`
        }
    );
    const requestOptions = {
        method: "GET",
        headers: headers
    };

    useEffect(() => {
        fetch(`/api/gamelist?limit=10`, requestOptions)
            .then(response => response.json())
            .then(data => {
                setGames(data);
            }).catch(
                (err) => console.log(err)
            )
        // async function fetchData() {
        //     try {
        //         const response = await axios.get('/api/gamelist?limit=10');
        //         setGames(response.data);
        //     } catch (error) {
        //         console.error("error");
        //     }
        // }
        // fetchData();
    }, []);

    return (
        <div>
            <ul>
                {games.map((game, idx) => (
                    <div>
                        <a key={game.id} href={`/games?id=${game.id}`}>
                            {game.title}
                        </a>
                    </div>
                ))
                }
            </ul>
        </div>
    )
}

export default GameList;