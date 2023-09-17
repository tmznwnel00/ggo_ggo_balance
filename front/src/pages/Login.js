import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../design/Login.css';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function LoginPage({ setUser }) {
    const [data, setData] = useState([{}]);
    const [id_text, setId] = useState('id');
    const [ps_text, setPassword] = useState('password');
    const [cookies, setCookie, removeCookie] = useCookies(['access-token']);
    const navigate = useNavigate();
    useEffect(() => {
        fetch('/api/users')
            .then(response => response.json())
            .then(data => {
                setData(data);
            }).catch(
                (err) => console.log(err)
            )
    }, []);

    function sendData() {
        if (id_text === '' || ps_text === '') {
            console.log('id or password necessary');
        } else {
            try {
                axios.post('/api/login', {
                    id: id_text,
                    password: ps_text
                })
                    .then((response) => {
                        console.log(response['data'])
                        const accessToken  = response['data']['access_token'];
                        setCookie('access-token', accessToken);
                        // localStorage.setItem("accessToken", accessToken);
                        // axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                        setUser(response['data']['user_id']);
                        navigate(`/`);
                    });
            } catch (error) {
                console.log(error);
            }
        }

    }

    return (
        <div class="form signup">
            {/* <div class="form-header">
                <h2 class="form signup">Welcome to ggoggobalance!!!</h2>
            </div> */}
            <div class="form-header">
                {/* <div class="show-signup">Sign Up</div> */}
                <div class="show-signin">Sign In</div>
                {/* <div class="show-reset">Reset</div> */}
            </div>
            {/* <div class="arrow"></div> */}
            <div class="form-elements">
                <div class="form-element">
                    <input type="id" placeholder="Username" onChange={(e) => {
                        setId(e.target.value);
                    }}></input>
                </div>
                <div class="form-element">
                    <input type="password" placeholder="Password" onChange={(e) => {
                        setPassword(e.target.value)
                    }}></input>
                </div>
                {/* <div class="form-element">
                    <input type="password" placeholder="Confirm password"></input>
                </div> */}
                <div class="form-element">
                    <button id="submit-btn" onClick={sendData}>Sign In</button>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;
