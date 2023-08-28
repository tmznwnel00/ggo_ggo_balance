import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LoginPage({setIdd}) {
    const [data, setData] = useState([{}]);
    const [id_text, setId] = useState('id');
    const [ps_text, setPassword] = useState('password');
    useEffect(() => {
        fetch('/users')
            .then(response => response.json())
            .then(data => {
                setData(data);
            }).catch(
                (err) => console.log(err)
            )
    }, []);

    function sendData() {
        axios.post('/users', {
            id: id_text,
            password: ps_text
        })
        .then(response => console.log(response));
    }

    return (
        <div className='App'>
            <hi>Hello</hi>
            <div>
                <input value={id_text} onChange={(e) => {
                    setId(e.target.value);
                    setIdd(e.target.value);
                }} />
            </div>
            <div>
                <input value={ps_text} onChange={(e) => {
                    setPassword(e.target.value)
                }} />
            </div>
            <div>
                <button onClick={sendData}>login</button>
            </div>
        </div>
    )
}

export default LoginPage;
