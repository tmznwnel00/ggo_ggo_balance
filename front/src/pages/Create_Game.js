import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreatePage() {
    const navigate = useNavigate();
    const [inputValues, setInputValues] = useState({
        title: '',
        left_choice: '',
        right_choice: '',
        parent_id: null
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputValues({
            ...inputValues,
            [name]: value,
        });
    };

    function sendData() {
        axios.post('/create_game', inputValues)
            .then((response) => {
                console.log(response['data']['id']);
                navigate(`/game?id=${response['data']['id']}`);
            });

    }

    return (
        <div className='App'>
            <h1>Make your own balance game!!</h1>
            <div>
                title:
                <input
                    name="title"
                    value={inputValues.name}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                choice1:
                <input
                    name="left_choice"
                    value={inputValues.name}
                    onChange={handleInputChange}
                />
                <input type="file" id="fileupload" />
            </div>
            <div>
                choice2:
                <input
                    name="right_choice"
                    value={inputValues.name}
                    onChange={handleInputChange}
                />
                <input type="file" id="fileupload" />
            </div>
            <div>
                <button onClick={sendData}>submit</button>
            </div>
        </div>
    )
}

export default CreatePage;
