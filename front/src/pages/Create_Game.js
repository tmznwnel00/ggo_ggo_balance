import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function CreatePage({ user }) {
    const navigate = useNavigate();
    const [cookies] = useCookies(['access-token']);
    const accessToken = cookies['access-token'];
    const [inputValues, setInputValues] = useState({
        title: '',
        left_choice: '',
        right_choice: '',
        parent_id: null
    })
    const [leftFile, setLeftFile] = useState(null);
    const [rightFile, setRightFile] = useState(null);
    

    const handlefileChange = (e) => {
        if (e.target.id === 'leftfile') {
            setLeftFile(e.target.files[0]);
        } else {
            setRightFile(e.target.files[0]);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputValues({
            ...inputValues,
            [name]: value,
        });
    };

    function sendData() {
        const formData = new FormData();
        formData.append('leftimage', leftFile);
        formData.append('rightimage', rightFile);
        formData.append('json', JSON.stringify(inputValues));

        if (accessToken) {
        axios.post('/api/create_game', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${accessToken}`
            },
        })
            .then((response) => {
                console.log(response['data']['id']);
                navigate(`/games?id=${response['data']['id']}`);
            });
        } else {
            console.log('have to login');
            return null;
        }
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
                <input type="file" accept="image/*" id="leftfile" onChange={handlefileChange} />
            </div>
            <div>
                choice2:
                <input
                    name="right_choice"
                    value={inputValues.name}
                    onChange={handleInputChange}
                />
                <input type="file" accept="image/*" id="rightfile" onChange={handlefileChange} />
            </div>
            <div>
                <button onClick={sendData}>submit</button>
            </div>
        </div>
    )
}

export default CreatePage;
