import React, { useState, useEffect } from 'react';

function LoginPage() {
    const [data, setData] = useState([{}]);

    useEffect(() => {
        fetch('/users')
            .then(response => response.json())
            .then(data => {
                setData(data);
            }).catch(
                (err) => console.log(err)
            )
    }, []);

    return (
        <div className='App'>
            <hi>Hello</hi>
            <div>
                {(typeof data.users === 'undefined') ? (
                    <p>loding...</p>
                ) : (
                    data.users.map((u) => <p>{u.name}</p>)
                )}
            </div>
        </div>
    )
}

export default LoginPage;
